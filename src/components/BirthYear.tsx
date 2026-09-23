import { useRef, useState } from 'react'
import FloatingBg from './FloatingBg'

const MIN_YEAR = 1930
const MAX_YEAR = new Date().getFullYear()

export default function BirthYear({ onSubmit }: { onSubmit: (year: number) => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = () => {
    const year = parseInt(value, 10)
    if (!value || isNaN(year) || year < MIN_YEAR || year > MAX_YEAR) {
      setError(`Enter a year between ${MIN_YEAR} and ${MAX_YEAR} 🙂`)
      setShaking(true)
      setTimeout(() => setShaking(false), 450)
      inputRef.current?.focus()
      return
    }
    onSubmit(year)
  }

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center px-6">
      <FloatingBg density={7} />
      <div className="pop-in relative z-10 w-full max-w-sm text-center">
        <div className="vhs mb-4 w-full rounded-md px-3 py-1.5 text-center text-[10px] font-bold">
          <span className="rec-dot text-[#ff4444]">● REC</span> TELL THE TAPE YOUR BIRTH YEAR
        </div>
        <h2 className="font-display text-2xl leading-tight" style={{ textShadow: '3px 3px 0 #000' }}>
          WHEN WERE YOU <span className="sunset-text">BORN?</span>
        </h2>

        <div className={`mt-8 ${shaking ? 'shake' : ''}`}>
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="YYYY"
            value={value}
            autoFocus
            onChange={e => { setValue(e.target.value.slice(0, 4)); setError('') }}
            onKeyDown={e => e.key === 'Enter' && submit()}
            className="bevel w-full rounded-xl bg-[var(--cream)] px-6 py-4 text-center font-display text-3xl tracking-[0.3em] text-[var(--ink)] placeholder:text-black/25 focus:outline-none"
          />
        </div>
        {error && <p className="mt-3 text-sm font-semibold text-[var(--peach)]">{error}</p>}

        <button
          onClick={submit}
          className="bevel mt-6 w-full rounded-xl bg-[var(--lime)] px-6 py-4 font-display text-base tracking-wide text-black"
        >
          LET'S GO →
        </button>

        <p className="mt-4 text-xs font-medium text-white/65">
          Your birth year determines your <span className="text-[var(--cyan)]">official generation</span>.
          <br />We won't reveal it until the end. 🤫
        </p>
      </div>
    </div>
  )
}
