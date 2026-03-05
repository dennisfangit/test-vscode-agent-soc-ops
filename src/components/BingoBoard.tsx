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
      className="grid grid-cols-5 gap-3 w-full max-w-md mx-auto aspect-square p-4"
      style={{
        backgroundColor: '#1a1a2e',
        border: '6px solid #00ffff',
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
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
