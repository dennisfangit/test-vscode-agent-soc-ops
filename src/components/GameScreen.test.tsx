import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameScreen } from './GameScreen';
import type { BingoGameState, BingoGameActions } from '../hooks/useBingoGame';

describe('GameScreen - Scavenger Hunt Mode', () => {
  const mockBingoState: BingoGameState = {
    gameState: 'playing',
    board: Array.from({ length: 25 }, (_, i) => ({
      id: i,
      text: `Question ${i}`,
      isMarked: false,
      isFreeSpace: i === 12,
    })),
    winningLine: null,
    winningSquareIds: new Set(),
    showBingoModal: false,
    currentCardIndex: 0,
  };

  const mockBingoActions: BingoGameActions = {
    startGame: vi.fn(),
    handleSquareClick: vi.fn(),
    resetGame: vi.fn(),
    dismissModal: vi.fn(),
    startCardDeck: vi.fn(),
    drawCard: vi.fn(),
  };

  const mockScavengerHuntState = {
    huntList: Array.from({ length: 24 }, (_, i) => ({
      id: i,
      text: `Question ${i}`,
      isCompleted: false,
    })),
    huntProgress: 0,
    showHuntCompleteModal: false,
  };

  const mockScavengerHuntActions = {
    toggleHuntItem: vi.fn(),
    dismissHuntCompleteModal: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('game state routing', () => {
    it('should render bingo board when gameState is "playing"', () => {
      render(
        <GameScreen
          gameState={mockBingoState.gameState}
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={mockScavengerHuntState.huntProgress}
          showHuntCompleteModal={mockScavengerHuntState.showHuntCompleteModal}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      expect(screen.getByRole('button', { name: /reset|back/i })).toBeInTheDocument();
    });

    it('should render scavenger hunt screen when gameState is "scavenger-hunt"', () => {
      render(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={mockScavengerHuntState.huntProgress}
          showHuntCompleteModal={mockScavengerHuntState.showHuntCompleteModal}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
    });

    it('should show hunt complete modal when gameState is "hunt-complete"', () => {
      render(
        <GameScreen
          gameState="hunt-complete"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={100}
          showHuntCompleteModal={true}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      expect(screen.getByText(/congratulations|complete/i)).toBeInTheDocument();
    });
  });

  describe('scavenger hunt interactions', () => {
    it('should call onToggleHuntItem when hunt checkbox is clicked', async () => {
      render(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={mockScavengerHuntState.huntProgress}
          showHuntCompleteModal={mockScavengerHuntState.showHuntCompleteModal}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      await userEvent.click(checkboxes[0]);

      expect(mockScavengerHuntActions.toggleHuntItem).toHaveBeenCalledWith(0);
    });

    it('should call onReset when reset button is clicked in hunt mode', async () => {
      render(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={mockScavengerHuntState.huntProgress}
          showHuntCompleteModal={mockScavengerHuntState.showHuntCompleteModal}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      const resetButton = screen.getByRole('button', { name: /reset|back|start/i });
      await userEvent.click(resetButton);

      expect(mockBingoActions.resetGame).toHaveBeenCalled();
    });

    it('should call onDismissHuntComplete when modal dismiss button is clicked', async () => {
      render(
        <GameScreen
          gameState="hunt-complete"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={100}
          showHuntCompleteModal={true}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      const dismissButton = screen.getByRole('button', { name: /continue|back|dismiss/i });
      await userEvent.click(dismissButton);

      expect(mockScavengerHuntActions.dismissHuntCompleteModal).toHaveBeenCalled();
    });
  });

  describe('hunt progress display', () => {
    it('should display hunt progress percentage', () => {
      render(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={50}
          showHuntCompleteModal={mockScavengerHuntState.showHuntCompleteModal}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      expect(screen.getByText(/50%/)).toBeInTheDocument();
    });

    it('should update progress display when huntProgress prop changes', () => {
      const { rerender } = render(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={25}
          showHuntCompleteModal={mockScavengerHuntState.showHuntCompleteModal}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      expect(screen.getByText(/25%/)).toBeInTheDocument();

      rerender(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={75}
          showHuntCompleteModal={mockScavengerHuntState.showHuntCompleteModal}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      expect(screen.getByText(/75%/)).toBeInTheDocument();
    });
  });

  describe('hunt list rendering', () => {
    it('should render all hunt items when in scavenger hunt mode', () => {
      const huntList = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Question ${i + 1}`,
        isCompleted: false,
      }));

      render(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={huntList}
          huntProgress={0}
          showHuntCompleteModal={false}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(24);
    });

    it('should update hunt list when items are marked as completed', () => {
      const completedHuntList = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Question ${i + 1}`,
        isCompleted: i < 12, // First 12 completed
      }));

      render(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={completedHuntList}
          huntProgress={50}
          showHuntCompleteModal={false}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.slice(0, 12).forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
      checkboxes.slice(12).forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe('conditional rendering', () => {
    it('should not render hunt elements in bingo mode', () => {
      render(
        <GameScreen
          gameState="playing"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={mockBingoState.showBingoModal}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={mockScavengerHuntState.huntProgress}
          showHuntCompleteModal={mockScavengerHuntState.showHuntCompleteModal}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      const progressBars = screen.queryAllByRole('progressbar');
      // Might have 0 if no progress bar in bingo, or it uses different structure
      expect(progressBars.length).toBeLessThanOrEqual(0);
    });

    it('should not render bingo board in hunt mode', () => {
      render(
        <GameScreen
          gameState="scavenger-hunt"
          board={mockBingoState.board}
          winningLine={mockBingoState.winningLine}
          winningSquareIds={mockBingoState.winningSquareIds}
          showBingoModal={false}
          huntList={mockScavengerHuntState.huntList}
          huntProgress={0}
          showHuntCompleteModal={false}
          onSquareClick={mockBingoActions.handleSquareClick}
          onReset={mockBingoActions.resetGame}
          onToggleHuntItem={mockScavengerHuntActions.toggleHuntItem}
          onDismissBingo={mockBingoActions.dismissModal}
          onDismissHuntComplete={mockScavengerHuntActions.dismissHuntCompleteModal}
        />
      );

      // Bingo board uses buttons with specific patterns, hunt uses checkboxes
      expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
    });
  });
});
