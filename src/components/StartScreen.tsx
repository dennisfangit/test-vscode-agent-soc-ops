interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-dark relative overflow-x-hidden">
      {/* CRT scanline overlay */}
      <div className="arcade-scanlines" aria-hidden="true" />

      {/* Ambient background radial glows */}
      <div className="absolute inset-0 arcade-ambient-bg pointer-events-none" aria-hidden="true" />

      {/* Main panel */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <div className="arcade-cabinet-border bg-bg-dark relative p-6 sm:p-10">

          {/* Corner bracket decorations */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-neon-yellow" aria-hidden="true" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-neon-yellow" aria-hidden="true" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-neon-yellow" aria-hidden="true" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-neon-yellow" aria-hidden="true" />

          {/* ── Hero Section ── */}
          <div className="hero-gradient relative text-center pt-2 pb-8">
            <p className="text-neon-cyan text-xs font-bold tracking-widest opacity-50 mb-5">
              ◀◀ INSERT COIN TO PLAY ▶▶
            </p>

            <h1 className="text-5xl sm:text-6xl font-bold text-neon-cyan neon-glow-title-lg tracking-widest leading-tight mb-5">
              SOC OPS
            </h1>

            <p className="text-xs sm:text-sm font-bold text-neon-magenta neon-glow-text tracking-widest mb-6">
              WELCOME TO THE NEON ARCADE
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 justify-center" aria-hidden="true">
              <div className="h-px flex-1 bg-neon-cyan opacity-30" />
              <span className="text-neon-cyan text-xs opacity-60">✦</span>
              <div className="h-px flex-1 bg-neon-cyan opacity-30" />
            </div>
          </div>

          {/* ── Flavor / Atmosphere Text ── */}
          <div className="text-center py-5 px-2">
            <p className="text-xs text-neon-cyan leading-loose opacity-70">
              Step into the arcade where professionals find connections
              and forge alliances. Hunt your colleagues, mark your board,
              and claim your victory in the neon-lit arena of
              social networking.
            </p>
          </div>

          {/* ── Rules Section ── */}
          <div className="border-2 border-neon-cyan relative p-5 mb-8">
            {/* Floating label on border */}
            <div className="absolute -top-3 left-4 bg-bg-dark px-2">
              <h2 className="text-xs font-bold text-neon-magenta neon-glow-text tracking-widest">
                ▶ HOW TO PLAY
              </h2>
            </div>

            <ul className="space-y-3 text-xs text-white mt-2">
              <li className="flex gap-3 items-start leading-relaxed">
                <span className="text-neon-cyan shrink-0">◆</span>
                <span>Find a colleague who matches each square description</span>
              </li>
              <li className="flex gap-3 items-start leading-relaxed">
                <span className="text-neon-cyan shrink-0">◆</span>
                <span>Tap the square to mark it when you find a match</span>
              </li>
              <li className="flex gap-3 items-start leading-relaxed">
                <span className="text-neon-cyan shrink-0">◆</span>
                <span>Get 5 in a row — horizontal, vertical, or diagonal</span>
              </li>
              <li className="flex gap-3 items-start leading-relaxed">
                <span className="text-neon-yellow shrink-0">★</span>
                <span>The FREE space in the center is already marked for you</span>
              </li>
              <li className="flex gap-3 items-start leading-relaxed">
                <span className="text-neon-yellow shrink-0">★</span>
                <span>Win patterns: any row, any column, or either diagonal</span>
              </li>
            </ul>
          </div>

          {/* ── Play Button ── */}
          <button
            onClick={onStart}
            className="w-full font-bold py-5 px-8 text-lg sm:text-xl uppercase bg-neon-magenta text-bg-dark border-4 border-neon-yellow neon-glow-button active:scale-95 tracking-widest cursor-pointer"
            aria-label="Start the bingo game"
          >
            ▶ PLAY NOW ◀
          </button>

          {/* Footer tag */}
          <p className="text-center text-xs text-neon-cyan opacity-25 mt-5 tracking-widest">
            ★ ARCADE BINGO v1.0 ★
          </p>

        </div>
      </div>
    </div>
  );
}
