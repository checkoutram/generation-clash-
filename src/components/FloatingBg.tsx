const RETRO = ['📼', '📻', '📺', '💿', '☎️', '📟']
const MODERN = ['📱', '💻', '🎮', '📲', '🤖', '✨']
const ALL = [...RETRO, ...MODERN]

/** Ambient floating generation icons + gradient blobs background. */
export default function FloatingBg({ density = 10 }: { density?: number }) {
  const icons = Array.from({ length: density }, (_, i) => {
    const left = (i * 97 + 13) % 100
    const top = (i * 61 + 7) % 100
    const size = 22 + ((i * 37) % 22)
    const delay = (i * 0.7) % 4
    const rot = ((i * 53) % 40) - 20
    const opacity = 0.25 + ((i * 29) % 40) / 100
    return { icon: ALL[i % ALL.length], left, top, size, delay, rot, opacity }
  })
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="blob absolute -left-24 top-10 h-72 w-72 rounded-full" style={{ background: '#6a2be9', opacity: 0.5 }} />
      <div className="blob absolute -right-24 top-1/3 h-80 w-80 rounded-full" style={{ background: '#f0a2fd', opacity: 0.28, animationDelay: '-4s' }} />
      <div className="blob absolute -bottom-24 left-1/4 h-72 w-72 rounded-full" style={{ background: '#76f4fc', opacity: 0.2, animationDelay: '-8s' }} />
      {icons.map((ic, i) => (
        <span
          key={i}
          className="float-y absolute select-none"
          style={{
            left: `${ic.left}%`, top: `${ic.top}%`,
            fontSize: ic.size, opacity: ic.opacity,
            animationDelay: `${ic.delay}s`,
            ['--r' as string]: `${ic.rot}deg`,
          }}
        >
          {ic.icon}
        </span>
      ))}
    </div>
  )
}

/** Scrolling marquee strip of icons + words. */
export function Marquee() {
  const items = ['CASSETTE 📼', 'LANDLINE ☎️', 'CRT TV 📺', 'ORKUT 💻', 'REELS 📲', 'GAMING 🎮', 'AI 🤖', 'RADIO 📻', 'CD 💿', 'WHATSAPP 💬']
  const row = items.concat(items)
  return (
    <div className="relative w-full overflow-hidden border-y-4 border-black bg-[var(--lime)] py-2.5 -rotate-1">
      <div className="marquee-track flex w-max gap-6 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-display text-sm font-800 tracking-widest text-black" style={{ fontWeight: 800 }}>
            {t} <span className="mx-1 text-[var(--purple)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
