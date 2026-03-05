import { useState } from 'react';

interface StartScreenProps {
  onStartBingo: () => void;
  onStartScavengerHunt: () => void;
  onStartCardDeck: () => void;
}

export function StartScreen({ onStartBingo, onStartScavengerHunt, onStartCardDeck }: StartScreenProps) {
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [flavorVisible, setFlavorVisible] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-6 bg-bg-dark">
      <div className="w-full max-w-xl">

        {/* ── Hero ── */}
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold neon-glow-text mb-3">
            SOC OPS
          </h1>
          <p className="text-sm font-bold text-neon-cyan neon-glow">
            ARCADE BINGO
          </p>
        </div>

        <div className="section-divider mb-5" />

        {/* ── Flavor Text ── hidden on mobile unless toggled; always on md+ ── */}
        <div className="mb-5">
          <button
            className="md:hidden w-full text-left text-xs text-neon-cyan font-bold py-2 uppercase tracking-wider min-h-[44px]"
            onClick={() => setFlavorVisible(!flavorVisible)}
            aria-expanded={flavorVisible}
          >
            {flavorVisible ? '▲ HIDE INFO' : '▼ SHOW INFO'}
          </button>
          <div
            className={`${flavorVisible ? 'block' : 'hidden'} md:block transition-all duration-300`}
          >
            <p className="text-xs text-neon-cyan font-bold leading-6 py-2">
              Join players discovering shared passions—bikes to work, speaks 3+
              languages, caught a wild Pokémon. Find your people, mark your
              squares, claim the grid.
            </p>
          </div>
        </div>

        <div className="section-divider mb-5" />

        {/* ── Accordion Rules ── collapsed on mobile, expanded on md+ ── */}
        <div className="neon-border-box mb-6">
          <button
            onClick={() => setRulesExpanded(!rulesExpanded)}
            className="w-full flex items-center justify-between px-6 py-4 font-bold text-neon-yellow uppercase text-sm min-h-[44px]"
            aria-expanded={rulesExpanded}
          >
            <span>&gt; HOW TO PLAY</span>
            <span
              className={`md:hidden text-neon-cyan transition-transform duration-300 ${rulesExpanded ? 'rotate-180' : 'rotate-0'}`}
              aria-hidden="true"
            >
              ↓
            </span>
          </button>
          <div
            className={`${rulesExpanded ? 'block' : 'hidden'} md:block transition-all duration-300 overflow-hidden`}
          >
            <ul className="px-6 pb-5 space-y-3">
              <li className="text-text-primary rule-text-glow text-xs font-bold">
                ▸ FIND people who match
              </li>
              <li className="text-text-primary rule-text-glow text-xs font-bold">
                ▸ TAP squares when matched
              </li>
              <li className="text-text-primary rule-text-glow text-xs font-bold">
                ▸ GET 5 IN A ROW TO WIN!
              </li>
            </ul>
          </div>
        </div>

        {/* ── Play Buttons ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={onStartBingo}
            className="font-bold py-4 px-6 text-lg md:text-xl active:scale-95 transition-all duration-150 uppercase border-4 text-bg-dark bg-neon-magenta border-neon-yellow neon-play-button min-h-[44px]"
            aria-label="Start Bingo game"
          >
            ▶ BINGO ◀
          </button>
          <button
            onClick={onStartScavengerHunt}
            className="font-bold py-4 px-6 text-lg md:text-xl active:scale-95 transition-all duration-150 uppercase border-4 text-neon-yellow bg-transparent border-neon-yellow hover:bg-neon-yellow hover:text-bg-dark min-h-[44px]"
            aria-label="Start Scavenger Hunt"
          >
            ▶ HUNT ◀
          </button>
          <button
            onClick={onStartCardDeck}
            className="font-bold py-4 px-6 text-lg md:text-xl active:scale-95 transition-all duration-150 uppercase border-4 text-neon-cyan bg-transparent border-neon-cyan hover:bg-neon-cyan hover:text-bg-dark min-h-[44px]"
            aria-label="Start Card Deck Shuffle"
          >
            ▶ CARDS ◀
          </button>
        </div>

      </div>
    </div>
  );
}
