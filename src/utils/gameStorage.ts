import type { BingoSquareData, BingoLine, GameState, ScavengerHuntItem } from '../types';

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 1;

export interface StoredGameData {
  version: number;
  gameState: GameState;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  huntList: ScavengerHuntItem[];
}

const VALID_GAME_STATES = ['start', 'playing', 'bingo', 'card-deck', 'scavenger-hunt', 'hunt-complete'] as const;
const VALID_LINE_TYPES = ['row', 'column', 'diagonal'] as const;

function isValidGameState(state: unknown): state is GameState {
  return typeof state === 'string' && VALID_GAME_STATES.includes(state as any);
}

function isValidSquare(sq: unknown): sq is BingoSquareData {
  if (!sq || typeof sq !== 'object') return false;
  const square = sq as Record<string, unknown>;
  return (
    typeof square.id === 'number' &&
    typeof square.text === 'string' &&
    typeof square.isMarked === 'boolean' &&
    typeof square.isFreeSpace === 'boolean'
  );
}

function isValidLineType(type: unknown): type is BingoLine['type'] {
  return typeof type === 'string' && VALID_LINE_TYPES.includes(type as any);
}

function isValidBingoLine(line: unknown): boolean {
  if (line === null || typeof line !== 'object') return line === null;
  const l = line as Record<string, unknown>;
  return (
    isValidLineType(l.type) &&
    typeof l.index === 'number' &&
    Array.isArray(l.squares)
  );
}

function isValidHuntItem(item: unknown): item is ScavengerHuntItem {
  if (!item || typeof item !== 'object') return false;
  const it = item as Record<string, unknown>;
  return (
    typeof it.id === 'number' &&
    typeof it.text === 'string' &&
    typeof it.isCompleted === 'boolean'
  );
}

export function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;

  if (obj.version !== STORAGE_VERSION) {
    return false;
  }

  if (!isValidGameState(obj.gameState)) {
    return false;
  }

  if (!Array.isArray(obj.board) || (obj.board.length !== 0 && obj.board.length !== 25)) {
    return false;
  }

  if (!obj.board.every(isValidSquare)) {
    return false;
  }

  if (!isValidBingoLine(obj.winningLine)) {
    return false;
  }

  if (!Array.isArray(obj.huntList) || !obj.huntList.every(isValidHuntItem)) {
    return false;
  }

  return true;
}

export function loadGameState(): Pick<StoredGameData, 'gameState' | 'board' | 'winningLine' | 'huntList'> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);

    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        board: parsed.board,
        winningLine: parsed.winningLine,
        huntList: parsed.huntList,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

export function saveGameState(
  gameState: GameState,
  board: BingoSquareData[],
  winningLine: BingoLine | null,
  huntList: ScavengerHuntItem[]
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      board,
      winningLine,
      huntList,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}
