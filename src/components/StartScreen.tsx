interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4">
      <div className="text-center max-w-sm w-full space-y-10">
        {/* Arcade tagline */}
        <p className="text-xs font-bold text-neon-cyan tracking-widest">
          WELCOME TO THE ARCADE
        </p>

        {/* Hero title */}
        <h1 className="text-5xl font-bold title-glow tracking-widest leading-tight">
          SOC OPS
        </h1>

        {/* Play button */}
        <button
          onClick={onStart}
          className="btn-arcade w-full font-bold py-4 px-8 text-xl uppercase"
        >
          ▶ START ◀
        </button>

        {/* Rules section */}
        <div className="text-left border border-white/10 p-4 space-y-1">
          <p className="text-xs font-bold text-neon-cyan mb-2">HOW TO PLAY</p>
          <p className="text-sm text-white/75">▸ FIND people who match</p>
          <p className="text-sm text-white/75">▸ TAP squares when matched</p>
          <p className="text-sm text-white/75">▸ GET 5 IN A ROW TO WIN!</p>
        </div>
      </div>
    </div>
  );
}
