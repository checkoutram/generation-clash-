import { useEffect, useState } from 'react'
import { type ScoreBreakdown, type Generation, type Question } from '../config'
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

interface Props {
  birthYear: number
  official: Generation
  vibe: Generation
  breakdown: ScoreBreakdown[]
  message: string
  questions: Question[]
  picks: number[]
  onPlayAgain: () => void

}

export default function Result({ birthYear, official, vibe, breakdown, message, questions, picks, onPlayAgain }: Props) {
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

  const shareText = `😂 I just took the 90s Kids vs 2K Kids Clash quiz!\n\nI'm a ${official.name} by birth but my Generation Vibe is ${vibe.name} (${vibePct}% ${vibe.name})!\n\n${message}\n\nWhat's YOUR Generation Vibe?\n👉 Take the 10-question challenge: ${url}`
  const waHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const trackShare = (platform: string) =>
    trackEvent(platform === 'whatsapp' ? 'whatsapp_share' : 'social_share', {
      platform, generation: official.name, vibe: vibe.name, score: vibePct, share_location: 'result_page',
    })
  const shareNativeAll = async (platform: string) => {
    trackShare(platform)
    if (navigator.share) {
      try { await navigator.share({ title: '90s Kids vs 2K Kids Clash', text: shareText }) } catch { /* cancelled */ }
    } else {
      await copyLink()
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

  return (
    <div className="relative flex min-h-full flex-col items-center px-5 pb-6 pt-3">
      <Confetti fire={revealed} />
      <div className="relative z-10 w-full max-w-md">

        <p className="pop-in vhs mx-auto w-fit rounded-md px-3 py-1 text-center text-[10px] font-bold">
          ● YOUR GENERATION RESULT
        </p>
        <p className="pop-in text-center font-display text-sm font-bold text-white/85" style={{ animationDelay: '.05s' }}>
          Born in <span className="text-[var(--yellow)]">{birthYear}</span> • 🧬 {official.name}
        </p>

        {revealed && (
          <div className="reveal-drama pop-in mt-2 rounded-xl border-4 border-black bg-[#241259] p-2 text-center hard-sm" style={{ animationDelay: '.1s' }}>
            <div className="text-2xl">{vibe.emoji}</div>
            <p className="font-display text-[clamp(.95rem,5.2vw,1.3rem)] leading-snug" style={{ textShadow: '3px 3px 0 #000' }}>
              <span style={{ color: GEN_COLORS[vibe.id], textShadow: '2px 2px 0 #000' }}>{vibe.name.toUpperCase()}</span> <span style={{ color: '#fff', textShadow: '2px 2px 0 #000' }}>IS YOUR VIBE</span> — <span style={{ color: '#ffe23e', textShadow: '2px 2px 0 #000' }}>{vibeCount}%</span>
            </p>
            <p className="mt-0.5 text-[9px] font-bold tracking-wide text-white/60">
              {breakdown.map(b => `${b.gen === 'genz' ? '2K' : b.gen === 'genalpha' ? 'Gen A' : b.gen === 'genbeta' ? 'Gen B' : '90s'} ${b.pct}%`).join(' • ')}
            </p>
          </div>
        )}

        <p className="pop-in chrome mt-2 rounded-xl px-3 py-1.5 text-center text-xs font-bold" style={{ animationDelay: '.2s' }}>
          “{message}” 😂
        </p>

        {/* Q&A recap */}
        <div className="pop-in mt-3 rounded-2xl border-4 border-black bg-black/25 p-2.5" style={{ animationDelay: '.3s' }}>
          <p className="mb-1 text-center font-display text-[9px] tracking-[0.25em] text-[var(--lime)]">
            ☆ MY QUESTIONS & ANSWERS ☆
          </p>
          {questions.map((q, i) => (
            <div key={q.id} className="flex items-start gap-1.5 border-b border-white/10 py-1 last:border-0">
              <span className="shrink-0 text-sm leading-tight">{q.emoji}</span>
              <div className="min-w-0">
                <p className="truncate text-[9px] font-bold tracking-wide text-white/40">{q.category}</p>
                <p className="truncate text-[11px] font-semibold leading-tight text-white/90">
                  <span className="text-[var(--lime)]">✓</span> {q.answers[picks[i]]?.text ?? ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* share */}
        <div className="pop-in mt-3 flex flex-col gap-2" style={{ animationDelay: '.4s' }}>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShare('whatsapp')}
            className="bevel flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-2.5 font-display text-sm text-black"
          >
            <WhatsAppIcon /> SHARE ON WHATSAPP
          </a>
          <div className="grid grid-cols-3 gap-2">
            <a href={fbHref} target="_blank" rel="noopener noreferrer" onClick={() => trackShare('facebook')}
              className="bevel flex items-center justify-center rounded-lg bg-[#1877F2] px-2 py-2 font-display text-[10px] text-white">
              FACEBOOK
            </a>
            <a href={liHref} target="_blank" rel="noopener noreferrer" onClick={() => trackShare('linkedin')}
              className="bevel flex items-center justify-center rounded-lg bg-[#0A66C2] px-2 py-2 font-display text-[10px] text-white">
              LINKEDIN
            </a>
            <button onClick={() => shareNativeAll('more')}
              className="bevel flex items-center justify-center rounded-lg bg-[var(--pink)] px-2 py-2 font-display text-[10px] text-black">
              MORE
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={copyLink}
              className="bevel rounded-lg bg-[var(--cyan)] px-2 py-2 font-display text-[10px] text-black">
              {copied ? '✅ COPIED!' : '🔗 COPY LINK'}
            </button>
            <button onClick={onPlayAgain}
              className="bevel rounded-lg bg-[var(--cream)] px-2 py-2 font-display text-[10px] text-black">
              🔁 PLAY AGAIN
            </button>
          </div>
          <p className="text-center text-[10px] font-medium text-white/45">
            🔒 No login • No personal info • {url}
          </p>
        </div>
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

