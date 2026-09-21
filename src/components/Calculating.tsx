import { useEffect, useState } from 'react'
import FloatingBg from './FloatingBg'

const PHASES = [
  'Rewinding your cassettes… 📼',
  'Checking your WhatsApp vibes… 💬',
  'Consulting the landline spirits… ☎️',
  'Calibrating nostalgia levels… 📺',
]

export default function Calculating({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    PHASES.forEach((_, i) => timers.push(setTimeout(() => setPhase(i), i * 650)))
    timers.push(setTimeout(onDone, PHASES.length * 650 + 300))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center px-6 text-center">
      <FloatingBg density={6} />
      <div className="relative z-10">
        <div className="spin-dice mb-6 inline-block text-6xl">🧬</div>
        <h2 className="font-display text-2xl font-extrabold" style={{ textShadow: '3px 3px 0 #000' }}>
          Calculating your<br />Generation Vibe…
        </h2>
        <p key={phase} className="pop-in mt-4 text-sm font-semibold text-[var(--cyan)]">
          {PHASES[phase]}
        </p>
      </div>
    </div>
  )
}
