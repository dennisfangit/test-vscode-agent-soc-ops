import { questions } from '../data/questions';

interface CardDeckProps {
  currentCardIndex: number;
  onDrawCard: () => void;
  onReset: () => void;
}

export function CardDeck({ currentCardIndex, onDrawCard, onReset }: CardDeckProps) {
  const currentQuestion = questions[currentCardIndex];
  const cardsDrawn = currentCardIndex + 1;
  const totalCards = questions.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-6 bg-bg-dark">
      <div className="w-full max-w-md">
        {/* ── Header ── */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold neon-glow-text mb-2">
            CARD DECK
          </h1>
          <p className="text-xs font-bold text-neon-cyan neon-glow uppercase tracking-wider">
            SHUFFLE MODE
          </p>
        </div>

        {/* ── Card Container ── */}
        <div className="mb-8">
          <div className="aspect-square bg-linear-to-br from-neon-magenta/10 to-neon-cyan/10 border-6 border-neon-cyan rounded-lg p-6 flex flex-col items-center justify-center min-h-64 cursor-pointer hover:border-neon-magenta transition-colors duration-200"
            onClick={onDrawCard}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onDrawCard();
              }
            }}
            aria-label={`Current card: ${currentQuestion}`}
          >
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
                {currentQuestion}
              </p>
              <p className="text-xs font-bold text-neon-cyan uppercase tracking-wider">
                TAP TO SHUFFLE
              </p>
            </div>
          </div>
        </div>

        {/* ── Progress ── */}
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-neon-yellow uppercase tracking-wider mb-2">
            CARDS DRAWN
          </p>
          <p className="text-3xl font-bold text-neon-magenta">
            {cardsDrawn} / {totalCards}
          </p>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={onDrawCard}
            className="flex-1 bg-transparent text-neon-cyan font-bold py-4 px-6 border-4 border-neon-cyan rounded hover:bg-neon-cyan hover:text-bg-dark transition-colors duration-200 uppercase text-lg tracking-wider"
            aria-label="Fail - skip this card"
          >
            ← NOPE
          </button>
          <button
            onClick={onDrawCard}
            className="flex-1 bg-neon-yellow text-bg-dark font-bold py-4 px-6 border-4 border-neon-yellow rounded hover:bg-neon-magenta hover:border-neon-magenta transition-colors duration-200 uppercase text-lg tracking-wider"
            aria-label="Success - found a match"
          >
            YES! →
          </button>
        </div>

        {/* ── Bottom Actions ── */}
        <button
          onClick={onReset}
          className="w-full bg-transparent text-neon-cyan font-bold py-2 px-4 border-2 border-neon-cyan rounded hover:bg-neon-cyan hover:text-bg-dark transition-colors duration-200 uppercase text-xs tracking-wider"
          aria-label="Return to start screen"
        >
          QUIT GAME
        </button>
      </div>
    </div>
  );
}
