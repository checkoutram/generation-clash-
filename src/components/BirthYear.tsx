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
        <div className="mb-4 text-5xl">🎂</div>
        <h2 className="font-display text-3xl font-extrabold leading-tight" style={{ textShadow: '3px 3px 0 #000' }}>
          First…<br />when were you born?
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
            className="w-full rounded-2xl border-4 border-black bg-white px-6 py-5 text-center font-display text-4xl font-extrabold tracking-[0.3em] text-[var(--ink)] placeholder:text-black/25 hard focus:outline-none"
          />
        </div>
        {error && <p className="mt-3 text-sm font-semibold text-[var(--peach)]">{error}</p>}

        <button
          onClick={submit}
          className="push-btn mt-7 w-full rounded-2xl border-4 border-black bg-[var(--yellow)] px-6 py-4 font-display text-xl font-extrabold tracking-wide text-black"
        >
          LET'S GO →
        </button>

        <p className="mt-5 text-sm font-medium text-white/65">
          Your birth year determines your <span className="text-[var(--cyan)]">official generation</span>.
          <br />We won't reveal it until the end. 🤫
        </p>
      </div>
    </div>
  )
}
