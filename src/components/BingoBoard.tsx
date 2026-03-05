import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div 
      className="grid grid-cols-5 gap-2 w-full max-w-md mx-auto aspect-square p-4"
      style={{
        background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.6), rgba(45, 27, 78, 0.6))',
        border: '4px solid #00f5ff',
        boxShadow: '0 0 30px rgba(0, 245, 255, 0.5), inset 0 0 20px rgba(255, 0, 110, 0.1)'
      }}
    >
      {board.map((square) => (
        <BingoSquare
          key={square.id}
          square={square}
          isWinning={winningSquareIds.has(square.id)}
          onClick={() => onSquareClick(square.id)}
        />
      ))}
    </div>
  );
}
