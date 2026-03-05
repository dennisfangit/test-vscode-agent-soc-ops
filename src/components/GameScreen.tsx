import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-bg-dark relative overflow-hidden">
      {/* Header with thick border */}
      <header 
        className="flex items-center justify-between p-4 z-10 relative border-b-4"
        style={{
          borderColor: '#00ffff',
          boxShadow: '0 4px 10px rgba(0, 255, 255, 0.3)'
        }}
      >
        <button
          onClick={onReset}
          className="font-bold text-lg px-4 py-2 uppercase transition-all border-4"
          style={{
            color: '#ffffff',
            backgroundColor: 'transparent',
            borderColor: '#ff00ff',
            textShadow: '0 0 5px #ff00ff',
            boxShadow: '0 0 10px rgba(255, 0, 255, 0.5)',
            cursor: 'pointer',
            fontFamily: "'Press Start 2P', monospace"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 0, 255, 0.5)';
          }}
        >
          ◀ BACK
        </button>
        <h1 
          className="font-bold text-3xl"
          style={{
            color: '#00ffff',
            textShadow: '0 0 15px #00ffff',
            fontFamily: "'Press Start 2P', monospace"
          }}
        >
          SOC OPS
        </h1>
        <div className="w-24"></div>
      </header>

      {/* Instructions */}
      <p 
        className="text-center py-3 px-4 text-lg font-bold z-10 relative"
        style={{
          color: '#00ffff',
          textShadow: '0 0 10px #00ffff',
          fontFamily: "'Press Start 2P', monospace"
        }}
      >
        TAP SQUARES TO MATCH!
      </p>

      {/* Bingo banner */}
      {hasBingo && (
        <div 
          className="bg-magenta border-4 text-center py-3 px-4 z-10 relative font-bold text-xl"
          style={{
            backgroundColor: '#ff00ff',
            borderColor: '#000000',
            color: '#00ffff',
            textShadow: '0 0 10px #00ffff',
            boxShadow: '0 0 20px rgba(255, 0, 255, 0.8)',
            fontFamily: "'Press Start 2P', monospace"
          }}
        >
          🎉 BINGO! YOU GOT A LINE! 🎉
        </div>
      )}

      {/* Board container */}
      <div className="flex-1 flex items-center justify-center p-6 z-10 relative">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
