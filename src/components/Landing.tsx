import FloatingBg, { Marquee } from './FloatingBg'

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex min-h-full flex-col">
      <FloatingBg />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-14 text-center">
        <div className="pop-in mb-5 -rotate-2 rounded-full border-2 border-black bg-[var(--pink)] px-4 py-1.5 hard-sm">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-black">INDIA EDITION 🇮🇳</span>
        </div>

        <h1 className="font-display text-[clamp(3rem,14vw,6.5rem)] font-extrabold leading-[0.9] tracking-tight">
          <span className="block text-white" style={{ textShadow: '5px 5px 0 #000' }}>GENERATION</span>
          <span className="gradient-text block" style={{ filter: 'drop-shadow(5px 5px 0 #000)' }}>CLASH</span>
        </h1>

        <p className="pop-in mt-5 max-w-sm text-lg font-semibold text-white/90" style={{ animationDelay: '.15s' }}>
          Your birth year says one thing.<br />Your answers say another.
        </p>

        {/* retro → modern visual strip */}
        <div className="pop-in mt-7 flex items-center gap-3 text-3xl" style={{ animationDelay: '.25s' }}>
          <span className="float-y inline-block" style={{ ['--r' as string]: '-8deg' }}>📼</span>
          <span className="float-y inline-block" style={{ ['--r' as string]: '6deg', animationDelay: '.5s' }}>☎️</span>
          <span className="float-y inline-block" style={{ ['--r' as string]: '-5deg', animationDelay: '1s' }}>📺</span>
          <span className="mx-1 font-display text-[var(--yellow)]">⇢</span>
          <span className="float-y inline-block" style={{ ['--r' as string]: '7deg', animationDelay: '1.5s' }}>📱</span>
          <span className="float-y inline-block" style={{ ['--r' as string]: '-6deg', animationDelay: '2s' }}>🎮</span>
          <span className="float-y inline-block" style={{ ['--r' as string]: '8deg', animationDelay: '2.5s' }}>🤖</span>
        </div>

        <button
          onClick={onStart}
          className="push-btn pop-in mt-9 w-full max-w-xs rounded-2xl border-4 border-black bg-[var(--lime)] px-6 py-4 font-display text-lg font-extrabold tracking-wide text-black"
          style={{ animationDelay: '.35s' }}
        >
          START THE 10-QUESTION CHALLENGE →
        </button>

        <p className="mt-4 text-xs font-medium text-white/60">
          Takes less than 2 minutes • Free • No login required
        </p>
        <p className="mt-1 text-xs font-medium text-white/60">
          🔒 Your quiz answers stay on this device.
        </p>
      </div>
      <div className="relative z-10 mt-10">
        <Marquee />
      </div>
    </div>
  )
}
