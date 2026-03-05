import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const getSquareStyle = () => {
    // FREE SPACE - bright cyan with magenta border
    if (square.isFreeSpace) {
      return {
        background: '#00ffff',
        color: '#ff00ff',
        border: '4px solid #ff00ff',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)',
      };
    }

    // Winning line - bright magenta with yellow border
    if (square.isMarked && isWinning) {
      return {
        background: '#ff00ff',
        color: '#ffffff',
        border: '4px solid #ffff00',
        boxShadow: '0 0 30px rgba(255, 0, 255, 1)',
        animation: 'arcade-pulse 0.8s ease-in-out infinite',
      };
    }

    // Marked - bright yellow with magenta border
    if (square.isMarked) {
      return {
        background: '#ffff00',
        color: '#1a1a2e',
        border: '4px solid #ff00ff',
        boxShadow: '0 0 15px rgba(255, 255, 0, 0.8)',
      };
    }

    // Unmarked - dark bg with cyan border
    return {
      background: '#1a1a2e',
      color: '#ffffff',
      border: '4px solid #00ffff',
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
    };
  };

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className="relative flex items-center justify-center p-2 text-center transition-all duration-100 select-none text-xs leading-tight font-bold overflow-hidden active:scale-95"
      style={getSquareStyle()}
      onMouseEnter={(e) => {
        if (!square.isFreeSpace && !square.isMarked) {
          e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 255, 1)';
          e.currentTarget.style.borderColor = '#ffff00';
        }
      }}
      onMouseLeave={(e) => {
        if (!square.isFreeSpace && !square.isMarked) {
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
          e.currentTarget.style.borderColor = '#00ffff';
        }
      }}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="break-words text-center">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span 
          className="absolute top-1 right-1 text-lg font-bold"
          style={{
            color: '#ff00ff',
            textShadow: '0 0 5px #ff00ff'
          }}
        >
          ✓
        </span>
      )}
    </button>
  );
}
