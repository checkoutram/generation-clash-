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
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between font-display text-sm font-extrabold">
        <span>{gen.emoji} {gen.name}</span>
        <span style={{ color: GEN_COLORS[gen.id] }}>{count}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full border-2 border-black bg-black/40">
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

  const shareNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Generation Clash India', text: shareText }) } catch { /* cancelled */ }
    } else {
      window.location.href = waHref
    }
  }
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
    return (
      <div className="relative flex min-h-full flex-col items-center px-5 pb-10 pt-8">
        <div className="relative z-10 w-full max-w-md">
          <button onClick={() => setStep('result')} className="mb-4 font-display text-sm font-bold text-white/60">
            ← Back to result
          </button>

          <h2 className="pop-in text-center font-display text-2xl font-extrabold" style={{ textShadow: '3px 3px 0 #000' }}>
            SHARE YOUR RESULT 📣
          </h2>

          {/* ===== SHARE CARD (screenshot-friendly) ===== */}
          <div className="pop-in mt-5" style={{ animationDelay: '.1s' }}>
            <p className="mb-3 text-center font-display text-xs font-extrabold tracking-[0.25em] text-white/60">
              📸 SCREENSHOT YOUR CARD & SHARE
            </p>
            <div
              className="relative overflow-hidden rounded-3xl border-4 border-black p-6 text-center hard"
              style={{ background: 'linear-gradient(160deg, #2a1560 0%, #1b0e44 55%, #3d1a86 100%)' }}
            >
              <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full" style={{ background: '#6a2be9', filter: 'blur(50px)', opacity: .7 }} />
              <div className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rounded-full" style={{ background: '#f0a2fd', filter: 'blur(50px)', opacity: .4 }} />
              <div className="relative">
                <p className="font-display text-xs font-extrabold tracking-[0.3em] text-[var(--lime)]">GENERATION CLASH 🇮🇳</p>
                <div className="mt-3 text-5xl">{vibe.emoji}</div>
                <p className="mt-2 font-display text-sm font-bold text-white/75">Born: {birthYear} • Officially {official.name}</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-white">
                  Vibe: <span style={{ color: GEN_COLORS[vibe.id] }}>{vibe.name}</span>
                </p>
                <p className="mt-1 font-display text-4xl font-extrabold" style={{ color: GEN_COLORS[vibe.id], textShadow: '2px 2px 0 #000' }}>
                  {vibePct}% {vibe.name.toUpperCase()}
                </p>
                <p className="mt-3 text-sm font-semibold text-white/85">“{message}”</p>
                <div className="mx-auto mt-4 w-fit rounded-full border-2 border-black bg-[var(--yellow)] px-4 py-1.5 font-display text-xs font-extrabold text-black">
                  CAN YOU BEAT MY GENERATION SCORE? 👊
                </div>
              </div>
            </div>
          </div>

          {/* ===== SHARE / VIRAL LOOP ===== */}
          <div className="pop-in mt-7" style={{ animationDelay: '.2s' }}>
            <h3 className="mb-3 text-center font-display text-lg font-extrabold" style={{ textShadow: '2px 2px 0 #000' }}>
              Challenge your friends ⚡
            </h3>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_share', {
                generation: official.name, vibe: vibe.name, score: vibePct, share_location: 'share_screen',
              })}
              className="push-btn flex w-full items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#25D366] px-6 py-4 font-display text-lg font-extrabold text-black"
            >
              <WhatsAppIcon /> SHARE ON WHATSAPP
            </a>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button onClick={copyLink} className="push-btn rounded-2xl border-4 border-black bg-[var(--cyan)] px-4 py-3.5 font-display text-sm font-extrabold text-black">
                {copied ? '✅ COPIED!' : '🔗 COPY LINK'}
              </button>
              <button onClick={shareNative} className="push-btn rounded-2xl border-4 border-black bg-[var(--pink)] px-4 py-3.5 font-display text-sm font-extrabold text-black">
                📤 SHARE
              </button>
            </div>
            <p className="mt-3 text-center text-xs font-medium text-white/55">
              Send it to friends, parents, siblings, colleagues & WhatsApp groups —<br />everyone gets a different set of 10 questions 🎲
            </p>

            <button
              onClick={onPlayAgain}
              className="push-btn mt-5 w-full rounded-2xl border-4 border-black bg-white px-6 py-4 font-display text-lg font-extrabold text-black"
            >
              🔁 PLAY AGAIN
            </button>
            <p className="mt-4 pb-2 text-center text-xs font-medium text-white/45">
              🔒 No login. No personal information required.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-full flex-col items-center px-5 pb-10 pt-8">
      <Confetti fire={revealed} />
      <div className="relative z-10 w-full max-w-md">

        <p className="pop-in text-center font-display text-xs font-extrabold tracking-[0.3em] text-white/60">
          YOUR GENERATION RESULT
        </p>
        <p className="pop-in mt-1 text-center font-display text-lg font-bold text-white/85" style={{ animationDelay: '.1s' }}>
          Born in <span className="text-[var(--yellow)]">{birthYear}</span>
        </p>

        <div className="pop-in mt-5 text-center" style={{ animationDelay: '.2s' }}>
          <span className="inline-block rotate-[-1deg] rounded-full border-2 border-black bg-white px-4 py-1.5 font-display text-sm font-extrabold text-black hard-sm">
            🧬 Officially: {official.name.toUpperCase()}
          </span>
        </div>

        <p className="pop-in mt-6 text-center font-display text-sm font-bold tracking-widest text-white/60" style={{ animationDelay: '.3s' }}>
          BUT…
        </p>

        {revealed && (
          <div className="reveal-drama mt-3 text-center">
            <div className="text-6xl">{vibe.emoji}</div>
            <h1 className="gradient-text mt-2 font-display text-[clamp(2.2rem,10vw,3.5rem)] font-extrabold leading-none" style={{ filter: 'drop-shadow(4px 4px 0 #000)' }}>
              {vibe.name.toUpperCase()}
            </h1>
            <p className="mt-1 font-display text-sm font-extrabold tracking-widest text-white/70">
              IS YOUR GENERATION VIBE
            </p>
            <p className="mt-3 font-display text-5xl font-extrabold" style={{ color: GEN_COLORS[vibe.id], textShadow: '3px 3px 0 #000' }}>
              {vibeCount}%
            </p>
          </div>
        )}

        {/* generation mix */}
        <div className="pop-in mt-8 rounded-3xl border-4 border-black bg-[#241259] p-5 hard" style={{ animationDelay: '.15s' }}>
          <h3 className="mb-4 font-display text-base font-extrabold tracking-wide">Your Generation Mix 🧪</h3>
          {breakdown.map((b, i) => {
            const gen = GENERATIONS.find(g => g.id === b.gen)!
            return <GenBar key={b.gen} gen={gen} pct={b.pct} start={revealed} delay={300 + i * 180} />
          })}
        </div>

        {/* funny message */}
        <p className="pop-in mt-5 rotate-[-0.5deg] rounded-2xl border-2 border-black bg-[var(--peach)] px-4 py-3 text-center font-semibold text-black hard-sm" style={{ animationDelay: '.25s' }}>
          {message} 😂
        </p>

        {/* CTA to share screen */}
        <button
          onClick={() => { setStep('share'); window.scrollTo(0, 0) }}
          className="push-btn pop-in mt-7 w-full rounded-2xl border-4 border-black bg-[#25D366] px-6 py-4 font-display text-lg font-extrabold text-black"
          style={{ animationDelay: '.35s' }}
        >
          SHARE MY RESULT →
        </button>
        <button
          onClick={onPlayAgain}
          className="mt-4 w-full text-center font-display text-sm font-bold text-white/60 underline underline-offset-4"
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
