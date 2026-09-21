import { useEffect, useRef } from 'react'

const COLORS = ['#c6f15c', '#f0a2fd', '#ffd542', '#76f4fc', '#feb591', '#ffffff']

/** Lightweight canvas confetti burst. Respects prefers-reduced-motion. */
export default function Confetti({ fire }: { fire: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!fire) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface P { x: number; y: number; vx: number; vy: number; w: number; h: number; c: string; rot: number; vr: number; life: number }
    const parts: P[] = []
    const cx = canvas.width / 2
    for (let burst = 0; burst < 3; burst++) {
      const bx = cx + (burst - 1) * canvas.width * 0.28
      for (let i = 0; i < 60; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6
        const speed = 7 + Math.random() * 9
        parts.push({
          x: bx, y: canvas.height * 0.75,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          w: 5 + Math.random() * 6, h: 7 + Math.random() * 8,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
          life: 120 + Math.random() * 60,
        })
      }
    }

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      for (const p of parts) {
        if (p.life <= 0) continue
        alive = true
        p.life--
        p.vy += 0.22
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.min(1, p.life / 40)
        ctx.fillStyle = p.c
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      if (alive) raf = requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [fire])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-50" aria-hidden />
}
