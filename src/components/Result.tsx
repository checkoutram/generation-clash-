import { useEffect, useState } from 'react'
import { GENERATIONS, type ScoreBreakdown, type Generation } from '../config'
import { trackEvent, shareUrl } from '../analytics'
import Confetti from './Confetti'

export const GEN_COLORS: Record<string, string> = {
  millennial: '#f0a2fd',
  genz: '#c6f15c',
  genalpha: '#76f4fc',
  genbeta: '#ffd542',
}

function useCounter(target: number, start: boolean, duration = 1100) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(target); return }
    let raf = 0
    const t0 = performance.now()
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration])
  return val
}

function GenBar({ gen, pct, start, delay }: { gen: Generation; pct: number; start: boolean; delay: number }) {
  const [go, setGo] = useState(false)
  const count = useCounter(pct, go)
  useEffect(() => {
    if (!start) return
    const t = setTimeout(() => setGo(true), delay)
    return () => clearTimeout(t)
  }, [start, delay])
  return (
    <div className="mb-1.5">
      <div className="mb-0.5 flex items-center justify-between font-display text-xs font-extrabold">
        <span>{gen.emoji} {gen.name}</span>
        <span style={{ color: GEN_COLORS[gen.id] }}>{count}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border-2 border-black bg-black/40">
        <div
          className="h-full rounded-full"
          style={{
            width: `${go ? pct : 0}%`,
            background: GEN_COLORS[gen.id],
            transition: 'width 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  )
}

interface Props {
  birthYear: number
  official: Generation
  vibe: Generation
  breakdown: ScoreBreakdown[]
  message: string
  onPlayAgain: () => void

}

export default function Result({ birthYear, official, vibe, breakdown, message, onPlayAgain }: Props) {
  const [step, setStep] = useState<'result' | 'share'>('result')
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const vibePct = breakdown.find(b => b.gen === vibe.id)?.pct ?? 0
  const vibeCount = useCounter(vibePct, revealed, 1400)
  const url = shareUrl()

  useEffect(() => {
    trackEvent('result_view', { generation: official.name, vibe: vibe.name })
    const t = setTimeout(() => setRevealed(true), 500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shareText = `😂 I just took the Generation Clash India quiz!\n\nI'm a ${official.name} by birth but my Generation Vibe is ${vibe.name} (${vibePct}% ${vibe.name})!\n\n${message}\n\nWhat's YOUR Generation Vibe?\n👉 Take the 10-question challenge: ${url}`
  const waHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  const copyLink = async () => {
    trackEvent('copy_link', { generation: official.name, vibe: vibe.name })
    try { await navigator.clipboard.writeText(url) } catch {
      const ta = document.createElement('textarea'); ta.value = url; document.body.appendChild(ta); ta.select()
      document.execCommand('copy'); document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  if (step === 'share') {
    const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`
    const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    const trackShare = (platform: string) =>
      trackEvent(platform === 'whatsapp' ? 'whatsapp_share' : 'social_share', {
        platform, generation: official.name, vibe: vibe.name, score: vibePct, share_location: 'share_screen',
      })

    const shareNativeAll = async (platform: string) => {
      trackShare(platform)
      if (navigator.share) {
        try { await navigator.share({ title: 'Generation Clash India', text: shareText }) } catch { /* cancelled */ }
      } else {
        await copyLink()
        alert('Link copied! Paste it in the app to share 😊')
      }
    }

    return (
      <div className="relative flex min-h-full flex-col items-center px-5 pb-4 pt-3">
        <div className="relative z-10 w-full max-w-md">
          <button onClick={() => setStep('result')} className="font-display text-[11px] font-bold text-white/60">
            ← Back to result
          </button>

          <div className="pop-in text-center">
            <h2 className="font-display text-xl font-extrabold" style={{ textShadow: '3px 3px 0 #000' }}>
              {vibe.emoji} SHARE YOUR RESULT
            </h2>
            <p className="mt-1 font-display text-sm font-bold text-white/75">
              {vibePct}% <span style={{ color: GEN_COLORS[vibe.id] }}>{vibe.name}</span> • Officially {official.name}
            </p>
          </div>

          {/* message preview */}
          <div className="pop-in mt-2 rounded-2xl border-2 border-white/15 bg-black/30 p-2.5 text-left" style={{ animationDelay: '.1s' }}>
            <p className="mb-0.5 font-display text-[9px] font-extrabold tracking-[0.25em] text-white/50">YOUR SHARE MESSAGE</p>
            <p className="whitespace-pre-line text-[11px] font-medium leading-snug text-white/85">{shareText}</p>
          </div>

          <h3 className="pop-in mb-1.5 mt-2 text-center font-display text-sm font-extrabold" style={{ textShadow: '2px 2px 0 #000', animationDelay: '.15s' }}>
            Challenge your friends ⚡
          </h3>

          <div className="pop-in flex flex-col gap-2" style={{ animationDelay: '.2s' }}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackShare('whatsapp')}
              className="push-btn flex w-full items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#25D366] px-6 py-3 font-display text-base font-extrabold text-black"
            >
              <WhatsAppIcon /> WHATSAPP
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={fbHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShare('facebook')}
                className="push-btn flex items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#1877F2] px-4 py-2.5 font-display text-xs font-extrabold text-white"
              >
                <FacebookIcon /> FACEBOOK
              </a>
              <a
                href={liHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShare('linkedin')}
                className="push-btn flex items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#0A66C2] px-4 py-2.5 font-display text-xs font-extrabold text-white"
              >
                <LinkedInIcon /> LINKEDIN
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => shareNativeAll('instagram')}
                className="push-btn flex items-center justify-center gap-2 rounded-2xl border-4 border-black px-4 py-2.5 font-display text-xs font-extrabold text-white"
                style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
              >
                <InstagramIcon /> INSTAGRAM
              </button>
              <button
                onClick={() => shareNativeAll('more')}
                className="push-btn flex items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[var(--pink)] px-4 py-2.5 font-display text-xs font-extrabold text-black"
              >
                📤 MORE APPS
              </button>
            </div>
            <button
              onClick={copyLink}
              className="push-btn flex w-full items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[var(--cyan)] px-6 py-2.5 font-display text-sm font-extrabold text-black"
            >
              {copied ? '✅ LINK COPIED!' : '🔗 COPY LINK'}
            </button>
          </div>

          <p className="mt-1.5 text-center text-[11px] font-medium text-white/55">
            Every share includes the play link — friends tap and play instantly 🎲
          </p>

          <button
            onClick={onPlayAgain}
            className="push-btn mt-1.5 w-full rounded-2xl border-4 border-black bg-white px-6 py-2.5 font-display text-base font-extrabold text-black"
          >
            🔁 PLAY AGAIN
          </button>
          <p className="mt-2 text-center text-[11px] font-medium text-white/45">
            🔒 No login. No personal information required.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-full flex-col items-center px-5 pb-4 pt-3">
      <Confetti fire={revealed} />
      <div className="relative z-10 w-full max-w-md">

        <p className="pop-in text-center font-display text-[10px] font-extrabold tracking-[0.3em] text-white/60">
          YOUR GENERATION RESULT
        </p>
        <p className="pop-in text-center font-display text-sm font-bold text-white/85" style={{ animationDelay: '.1s' }}>
          Born in <span className="text-[var(--yellow)]">{birthYear}</span>
        </p>

        <div className="pop-in mt-2 text-center" style={{ animationDelay: '.2s' }}>
          <span className="inline-block rotate-[-1deg] rounded-full border-2 border-black bg-white px-4 py-1.5 font-display text-sm font-extrabold text-black hard-sm">
            🧬 Officially: {official.name.toUpperCase()}
          </span>
        </div>

        {revealed && (
          <div className="reveal-drama mt-1 text-center">
            <div className="text-4xl">{vibe.emoji}</div>
            <h1 className="gradient-text font-display text-[clamp(1.7rem,8vw,2.4rem)] font-extrabold leading-none" style={{ filter: 'drop-shadow(4px 4px 0 #000)' }}>
              {vibe.name.toUpperCase()}
            </h1>
            <p className="mt-0.5 font-display text-[11px] font-extrabold tracking-widest text-white/70">
              IS YOUR GENERATION VIBE
            </p>
            <p className="font-display text-3xl font-extrabold" style={{ color: GEN_COLORS[vibe.id], textShadow: '3px 3px 0 #000' }}>
              {vibeCount}%
            </p>
          </div>
        )}

        {/* generation mix */}
        <div className="pop-in mt-3 rounded-2xl border-4 border-black bg-[#241259] p-3 hard" style={{ animationDelay: '.15s' }}>
          <h3 className="mb-2 font-display text-xs font-extrabold tracking-wide">Your Generation Mix 🧪</h3>
          {breakdown.map((b, i) => {
            const gen = GENERATIONS.find(g => g.id === b.gen)!
            return <GenBar key={b.gen} gen={gen} pct={b.pct} start={revealed} delay={300 + i * 180} />
          })}
        </div>

        {/* funny message */}
        <p className="pop-in mt-3 rotate-[-0.5deg] rounded-2xl border-2 border-black bg-[var(--peach)] px-3 py-2 text-center text-xs font-semibold text-black hard-sm" style={{ animationDelay: '.25s' }}>
          {message} 😂
        </p>

        {/* CTA to share screen */}
        <button
          onClick={() => { setStep('share'); window.scrollTo(0, 0) }}
          className="push-btn pop-in mt-3 w-full rounded-2xl border-4 border-black bg-[#25D366] px-6 py-3 font-display text-base font-extrabold text-black"
          style={{ animationDelay: '.35s' }}
        >
          SHARE MY RESULT →
        </button>
        <button
          onClick={onPlayAgain}
          className="mt-2 w-full text-center font-display text-xs font-bold text-white/60 underline underline-offset-4"
        >
          or play again 🔁
        </button>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.8 3 .7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  )
}
