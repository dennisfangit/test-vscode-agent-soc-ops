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
    <div className="flex flex-col min-h-full bg-gradient-to-b from-arcade-bg to-arcade-dark relative overflow-hidden">
      {/* Arcade scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 0, 110, 0.03) 0px, rgba(255, 0, 110, 0.03) 1px, transparent 1px, transparent 2px)'
        }} />
      </div>

      {/* Header with arcade styling */}
      <header 
        className="flex items-center justify-between p-4 z-10 relative border-b-4"
        style={{
          borderColor: '#00f5ff',
          background: 'linear-gradient(90deg, rgba(255, 0, 110, 0.1), rgba(0, 245, 255, 0.1))',
          boxShadow: '0 4px 10px rgba(0, 245, 255, 0.2)'
        }}
      >
        <button
          onClick={onReset}
          className="font-bold text-lg px-4 py-2 uppercase transition-all"
          style={{
            color: '#fffd38',
            background: 'rgba(255, 0, 110, 0.2)',
            border: '2px solid #ff006e',
            textShadow: '0 0 5px #fffd38',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 0, 110, 0.4)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 0, 110, 0.2)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ◀ BACK
        </button>
        <h1 
          className="font-bold text-3xl"
          style={{
            color: '#00f5ff',
            textShadow: '0 0 15px #00f5ff, 0 0 30px #00f5ff',
            animation: 'arcade-neon-glow 2s ease-in-out infinite',
            fontFamily: "'Press Start 2P', cursive"
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
          color: '#00f5ff',
          textShadow: '0 0 10px #00f5ff'
        }}
      >
        TAP SQUARES TO MATCH!
      </p>

      {/* Bingo indicator with arcade animation */}
      {hasBingo && (
        <div 
          className="text-center py-3 px-4 font-bold text-2xl z-10 relative uppercase"
          style={{
            background: 'linear-gradient(90deg, #ff006e, #00f5ff, #fffd38)',
            color: '#0a0e27',
            border: '3px solid #fffd38',
            animation: 'arcade-pulse 0.5s ease-in-out infinite',
            textShadow: '0 0 10px #fffd38',
            boxShadow: '0 0 20px rgba(255, 253, 56, 0.8)'
          }}
        >
          ★ BINGO! YOU GOT A LINE! ★
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4 z-10 relative">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
