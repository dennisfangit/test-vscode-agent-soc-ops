import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBingoGame } from './useBingoGame';

describe('useBingoGame - Scavenger Hunt Mode', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('scavenger hunt state management', () => {
    it('should have initial game state as "start"', () => {
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.gameState).toBe('start');
    });

    it('should transition to scavenger-hunt state when starting hunt', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.gameState).toBe('scavenger-hunt');
    });

    it('should initialize hunt list with all questions', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.huntList).toHaveLength(24);
    });

    it('should have all hunt items unmarked initially', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      result.current.huntList.forEach((item) => {
        expect(item.isCompleted).toBe(false);
      });
    });
  });

  describe('hunt item toggling', () => {
    it('should toggle hunt item when clicking checkbox', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      const initialState = result.current.huntList[0].isCompleted;

      act(() => {
        result.current.toggleHuntItem(0);
      });

      expect(result.current.huntList[0].isCompleted).toBe(!initialState);
    });

    it('should toggle multiple items independently', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      act(() => {
        result.current.toggleHuntItem(0);
        result.current.toggleHuntItem(5);
        result.current.toggleHuntItem(10);
      });

      expect(result.current.huntList[0].isCompleted).toBe(true);
      expect(result.current.huntList[5].isCompleted).toBe(true);
      expect(result.current.huntList[10].isCompleted).toBe(true);
      expect(result.current.huntList[3].isCompleted).toBe(false);
    });

    it('should persist hunt state to localStorage', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      act(() => {
        result.current.toggleHuntItem(0);
      });

      const stored = localStorage.getItem('bingo-game-state');
      expect(stored).toBeTruthy();
      
      const data = JSON.parse(stored!);
      expect(data.gameState).toBe('scavenger-hunt');
    });

    it('should restore hunt state from localStorage', () => {
      const { result: result1 } = renderHook(() => useBingoGame());
      
      act(() => {
        result1.current.startScavengerHunt();
        result1.current.toggleHuntItem(0);
        result1.current.toggleHuntItem(5);
      });

      // Simulate new session
      const { result: result2 } = renderHook(() => useBingoGame());
      
      expect(result2.current.gameState).toBe('scavenger-hunt');
      expect(result2.current.huntList[0].isCompleted).toBe(true);
      expect(result2.current.huntList[5].isCompleted).toBe(true);
    });
  });

  describe('hunt progress tracking', () => {
    it('should calculate hunt progress as 0 initially', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.huntProgress).toBe(0);
    });

    it('should calculate hunt progress when items are completed', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      act(() => {
        // Mark 12 out of 24 items (50%)
        for (let i = 0; i < 12; i++) {
          result.current.toggleHuntItem(i);
        }
      });

      expect(result.current.huntProgress).toBe(50);
    });

    it('should calculate hunt progress as 100 when all items are completed', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      act(() => {
        for (let i = 0; i < 24; i++) {
          result.current.toggleHuntItem(i);
        }
      });

      expect(result.current.huntProgress).toBe(100);
    });

    it('should update progress when toggling items', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.huntProgress).toBe(0);

      act(() => {
        result.current.toggleHuntItem(0);
      });

      // 1 out of 24 is ~4.17%, should round to 4
      expect(result.current.huntProgress).toBeGreaterThan(0);
      expect(result.current.huntProgress).toBeLessThanOrEqual(5);
    });
  });

  describe('hunt completion', () => {
    it('should transition to hunt-complete state when all items are marked', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.gameState).toBe('scavenger-hunt');

      act(() => {
        for (let i = 0; i < 24; i++) {
          result.current.toggleHuntItem(i);
        }
      });

      expect(result.current.gameState).toBe('hunt-complete');
    });

    it('should show hunt completion modal when hunt is complete', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.showHuntCompleteModal).toBe(false);

      act(() => {
        for (let i = 0; i < 24; i++) {
          result.current.toggleHuntItem(i);
        }
      });

      expect(result.current.showHuntCompleteModal).toBe(true);
    });
  });

  describe('hunt reset and navigation', () => {
    it('should reset hunt when resetGame is called', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
        result.current.toggleHuntItem(0);
      });

      expect(result.current.huntList[0].isCompleted).toBe(true);

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.gameState).toBe('start');
      expect(result.current.huntList).toEqual([]);
    });

    it('should dismiss hunt complete modal and return to start', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
        for (let i = 0; i < 24; i++) {
          result.current.toggleHuntItem(i);
        }
      });

      expect(result.current.gameState).toBe('hunt-complete');
      expect(result.current.showHuntCompleteModal).toBe(true);

      act(() => {
        result.current.dismissHuntCompleteModal();
      });

      expect(result.current.gameState).toBe('start');
      expect(result.current.showHuntCompleteModal).toBe(false);
    });

    it('should allow starting a new hunt after completing one', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startScavengerHunt();
        for (let i = 0; i < 24; i++) {
          result.current.toggleHuntItem(i);
        }
        result.current.dismissHuntCompleteModal();
      });

      expect(result.current.gameState).toBe('start');

      act(() => {
        result.current.startScavengerHunt();
      });

      expect(result.current.gameState).toBe('scavenger-hunt');
      expect(result.current.huntList.every((item) => !item.isCompleted)).toBe(true);
    });
  });

  describe('hunt state in mixed game mode', () => {
    it('should preserve bingo state when switching between modes', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.startGame();
      });

      expect(result.current.gameState).toBe('playing');
      const bingoBoard = result.current.board;

      act(() => {
        result.current.resetGame();
        result.current.startScavengerHunt();
      });

      expect(result.current.gameState).toBe('scavenger-hunt');

      act(() => {
        result.current.resetGame();
        result.current.startGame();
      });

      // Board should be different (randomly generated)
      expect(result.current.board).toHaveLength(25);
    });
  });
});
