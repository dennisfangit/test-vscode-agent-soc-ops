import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const getSquareStyle = () => {
    if (square.isFreeSpace) {
      return {
        background: 'linear-gradient(135deg, #b537f2, #ff006e)',
        color: '#fffd38',
        border: '3px solid #fffd38',
        textShadow: '0 0 10px #fffd38',
        boxShadow: '0 0 20px rgba(181, 55, 242, 0.8)',
      };
    }

    if (square.isMarked && isWinning) {
      return {
        background: 'linear-gradient(135deg, #fffd38, #00f5ff)',
        color: '#0a0e27',
        border: '3px solid #00f5ff',
        textShadow: '0 0 8px #00f5ff',
        boxShadow: '0 0 30px rgba(0, 245, 255, 1), inset 0 0 15px rgba(255, 253, 56, 0.5)',
        animation: 'arcade-pulse 0.8s ease-in-out infinite',
      };
    }

    if (square.isMarked) {
      return {
        background: 'linear-gradient(135deg, #00f5ff, #00d4ff)',
        color: '#0a0e27',
        border: '3px solid #00f5ff',
        textShadow: '0 0 5px #00f5ff',
        boxShadow: '0 0 20px rgba(0, 245, 255, 0.8)',
      };
    }

    return {
      background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(45, 27, 78, 0.8))',
      color: '#00f5ff',
      border: '3px solid #ff006e',
      textShadow: '0 0 5px #ff006e',
      boxShadow: '0 0 10px rgba(255, 0, 110, 0.5)',
    };
  };

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className="relative flex items-center justify-center p-2 text-center transition-all duration-100 select-none min-h-[80px] text-xs leading-tight font-bold overflow-hidden active:scale-95"
      style={getSquareStyle()}
      onMouseEnter={(e) => {
        if (!square.isFreeSpace && !square.isMarked) {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 110, 1)';
          e.currentTarget.style.border = '3px solid #fffd38';
        }
      }}
      onMouseLeave={(e) => {
        if (!square.isFreeSpace && !square.isMarked) {
          e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 0, 110, 0.5)';
          e.currentTarget.style.border = '3px solid #ff006e';
        }
      }}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="break-words">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span 
          className="absolute top-1 right-1 text-lg font-bold"
          style={{
            color: '#fffd38',
            textShadow: '0 0 10px #fffd38'
          }}
        >
          ✓
        </span>
      )}
    </button>
  );
}
