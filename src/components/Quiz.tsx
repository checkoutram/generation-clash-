import { useState } from 'react'
import type { Question } from '../config'
import { QUESTIONS_PER_GAME } from '../config'
import { trackEvent } from '../analytics'
import FloatingBg from './FloatingBg'

const OPTION_COLORS = ['bg-white', 'bg-white', 'bg-white', 'bg-white']
const LETTERS = ['A', 'B', 'C', 'D']
const LETTER_BG = ['bg-[var(--pink)]', 'bg-[var(--cyan)]', 'bg-[var(--yellow)]', 'bg-[var(--peach)]']

export default function Quiz({
  questions,
  onDone,
}: {
  questions: Question[]
  onDone: (picks: number[]) => void
}) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [leaving, setLeaving] = useState(false)
  const [picks, setPicks] = useState<number[]>([])

  const q = questions[index]
  const total = QUESTIONS_PER_GAME
  const pct = Math.round((index / total) * 100)
  const filled = '█'.repeat(Math.round((index / total) * 10))
  const empty = '░'.repeat(10 - Math.round((index / total) * 10))

  const advance = (pick: number) => {
    trackEvent('question_answered', {
      question_number: index + 1,
      question_id: q.id,
      answer_id: `${q.id}_${LETTERS[pick]}`,
    })
    const newPicks = [...picks, pick]
    setLeaving(true)
    setTimeout(() => {
      if (index + 1 >= total) {
        onDone(newPicks)
      } else {
        setPicks(newPicks)
        setIndex(index + 1)
        setSelected(null)
        setLeaving(false)
      }
    }, 260)
  }

  return (
    <div className="relative flex min-h-full flex-col px-5 pb-8 pt-6">
      <FloatingBg density={5} />
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col">
        {/* progress */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-sm font-extrabold tracking-widest text-[var(--lime)]">
              QUESTION {index + 1} OF {total}
            </span>
            <span className="font-display text-xs font-bold text-white/60">{pct}%</span>
          </div>
          <div className="h-3.5 w-full overflow-hidden rounded-full border-2 border-black bg-black/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-[var(--pink)] to-[var(--yellow)] transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-white/40">{filled}{empty}</div>
        </div>

        {/* question card */}
        <div
          key={q.id}
          className={`transition-all duration-250 ${leaving ? 'translate-x-[-24px] opacity-0' : 'translate-x-0 opacity-100'}`}
          style={{ transitionDuration: '250ms' }}
        >
          <div className="pop-in mb-4 rotate-[-1deg] rounded-2xl border-4 border-black p-4 hard" style={{ background: 'linear-gradient(160deg, #2a1560, #3d1a86)' }}>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">{q.emoji}</span>
              <span className="font-display text-[10px] tracking-[0.2em] text-[var(--lime)]">{q.category}</span>
            </div>
            <h2 className="font-display text-lg leading-snug text-white">
              {q.question}
            </h2>
          </div>

          {/* answers */}
          <div className="flex flex-col gap-3">
            {q.answers.map((a, i) => {
              const isSel = selected === i
              return (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => { setSelected(i); advance(i) }}
                  className={`pop-in group flex w-full items-center gap-3 rounded-2xl border-4 border-black px-3.5 py-3 text-left ${OPTION_COLORS[i]} ${
                    isSel
                      ? 'border-[3px] border-black bg-[var(--lime)] scale-[1.02] shadow-none'
                      : 'bevel'
                  }`}
                  style={{ animationDelay: `${0.08 * i}s` }}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black font-display text-xs text-black ${isSel ? 'bg-black text-[var(--lime)]' : LETTER_BG[i]}`}>
                    {LETTERS[i]}
                  </span>
                  <span className="font-semibold leading-snug text-[var(--ink)]">{a.text}</span>
                  {isSel && <span className="ml-auto text-xl">✅</span>}
                </button>
              )
            })}
          </div>
        </div>

        <p className="mt-auto pt-6 text-center text-xs font-medium text-white/45">
          No right or wrong answers — just your vibe ✌️
        </p>
      </div>
    </div>
  )
}
