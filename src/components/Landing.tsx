import FloatingBg, { Marquee } from './FloatingBg'

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex min-h-full flex-col">
      <FloatingBg />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-6 text-center">
        {/* VHS top bar */}
        <div className="pop-in vhs mb-4 flex w-full max-w-sm items-center justify-between rounded-md px-3 py-1.5 text-[10px] font-bold">
          <span className="rec-dot text-[#ff4444]">● REC</span>
          <span>SP 0:00:10</span>
          <span>90s MODE ▶</span>
        </div>

        <div className="pop-in mb-3 -rotate-2 rounded-md border-2 border-black bg-[var(--pink)] px-3 py-1 hard-sm">
          <span className="font-display text-[10px] tracking-widest text-black" style={{ fontSize: 11 }}>★ INDIA EDITION 🇮🇳 ★</span>
        </div>

        <div className="checker-sm w-full max-w-sm rounded-lg border-4 border-black p-2 hard" style={{ padding: 8 }}>
          <div className="rounded-md border-2 border-black bg-[var(--ground)] px-3 py-5">
            <h1 className="font-display leading-[1.02] tracking-normal">
              <span className="sunset-text block text-[clamp(2.6rem,13vw,4.5rem)]">GENERATION</span>
              <span className="sunset-text block text-[clamp(2.6rem,13vw,4.5rem)]">CLASH</span>
            </h1>
            <div className="mt-3 flex items-center justify-center gap-1">
              <span className="zigzag w-10" />
              <p className="px-1 text-xs font-bold text-[var(--lime)]">★ BORN IN ONE GENERATION ★</p>
              <span className="zigzag w-10" />
            </div>
            <p className="mt-1 text-xs font-bold text-[var(--cyan)]">LIVING LIKE ANOTHER…</p>
          </div>
        </div>

        {/* cassette tape */}
        <div className="pop-in mt-5 w-full max-w-sm" style={{ animationDelay: '.15s' }}>
          <div className="relative rounded-xl border-4 border-black bg-[#3b2a63] p-3 hard">
            <div className="checker-sm h-2 rounded-full border-2 border-black" />
            <div className="mx-auto mt-2 w-4/5 rounded-md border-2 border-black bg-[var(--cream)] px-2 py-1.5">
              <p className="font-display text-[9px] font-bold text-black" style={{ fontSize: 9 }}>♪ A SIDE — RETRO MIX 90s INDIA ♪</p>
              <div className="mx-auto mt-1 flex w-2/3 items-center justify-between rounded-full border-2 border-black bg-[#2b2b2b] px-3 py-0.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#eee]" />
                <span className="text-[8px] font-bold text-[#ffe23e]">TAPE</span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#eee]" />
              </div>
            </div>
            <div className="checker-sm mt-2 h-2 rounded-full border-2 border-black" />
          </div>
        </div>

        <button
          onClick={onStart}
          className="bevel pop-in mt-6 w-full max-w-sm rounded-xl bg-[var(--lime)] px-6 py-4 font-display text-base font-bold tracking-wide text-black"
          style={{ animationDelay: '.25s' }}
        >
          ▶ START THE 10-QUESTION CHALLENGE
        </button>

        <p className="mt-3 text-[11px] font-bold text-white/60">
          ⏱ Takes 2 min • Free • No login
        </p>
      </div>
      <div className="relative z-10 mt-6">
        <Marquee />
      </div>
    </div>
  )
}
