import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, ScavengerHuntItem } from '../types';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';
import { questions } from '../data/questions';
import { loadGameState, saveGameState } from '../utils/gameStorage';
import { useHuntState } from './useHuntState';

export interface BingoGameState {
  gameState: GameState;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
  currentCardIndex: number;
  huntList: ScavengerHuntItem[];
  huntProgress: number;
  showHuntCompleteModal: boolean;
}

export interface BingoGameActions {
  startGame: () => void;
  handleSquareClick: (squareId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
  startCardDeck: () => void;
  drawCard: () => void;
  startScavengerHunt: () => void;
  toggleHuntItem: (itemId: number) => void;
  dismissHuntCompleteModal: () => void;
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const {
    huntList,
    huntProgress,
    showHuntCompleteModal,
    startScavengerHunt,
    toggleHuntItem,
    dismissHuntCompleteModal,
    initializeHunt,
    resetHunt,
  } = useHuntState(() => {
    setGameState('hunt-complete');
  });

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, board, winningLine, huntList);
  }, [gameState, board, winningLine, huntList]);

  // Initialize hunt from loaded state
  useEffect(() => {
    if (loadedState?.huntList && loadedState.huntList.length > 0) {
      initializeHunt(loadedState.huntList);
    }
  }, []);

  const startGame = useCallback(() => {
    setBoard(generateBoard());
    setWinningLine(null);
    setGameState('playing');
  }, []);

  const handleSquareClick = useCallback(
    (squareId: number) => {
      setBoard((currentBoard) => {
        const newBoard = toggleSquare(currentBoard, squareId);
        const bingo = checkBingo(newBoard);

        if (bingo && !winningLine) {
          queueMicrotask(() => {
            setWinningLine(bingo);
            setGameState('bingo');
            setShowBingoModal(true);
          });
        }

        return newBoard;
      });
    },
    [winningLine]
  );

  const resetGame = useCallback(() => {
    setGameState('start');
    setBoard([]);
    setWinningLine(null);
    setShowBingoModal(false);
    resetHunt();
  }, [resetHunt]);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  const startCardDeck = useCallback(() => {
    setCurrentCardIndex(0);
    setGameState('card-deck');
  }, []);

  const drawCard = useCallback(() => {
    setCurrentCardIndex((prev) => (prev + 1) % questions.length);
  }, []);

  const handleStartScavengerHunt = useCallback(() => {
    startScavengerHunt();
    setGameState('scavenger-hunt');
  }, [startScavengerHunt]);

  const handleDismissHuntComplete = useCallback(() => {
    dismissHuntCompleteModal();
    setGameState('start');
  }, [dismissHuntCompleteModal]);

  return {
    gameState,
    board,
    winningLine,
    winningSquareIds,
    showBingoModal,
    currentCardIndex,
    huntList,
    huntProgress,
    showHuntCompleteModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
    startScavengerHunt: handleStartScavengerHunt,
    toggleHuntItem,
    dismissHuntCompleteModal: handleDismissHuntComplete,
    startCardDeck,
    drawCard,
  };
}
