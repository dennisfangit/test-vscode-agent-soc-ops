import { describe, it, expect } from 'vitest';
import type { GameState, BingoSquareData, BingoLine, ScavengerHuntItem } from './index';

describe('Type Definitions', () => {
  describe('GameState type', () => {
    it('should include scavenger-hunt state', () => {
      const state: GameState = 'scavenger-hunt';
      expect(state).toBe('scavenger-hunt');
    });

    it('should include hunt-complete state', () => {
      const state: GameState = 'hunt-complete';
      expect(state).toBe('hunt-complete');
    });

    it('should still include original states', () => {
      const states: GameState[] = ['start', 'playing', 'bingo', 'card-deck'];
      expect(states).toHaveLength(4);
      states.forEach((state) => {
        expect(['start', 'playing', 'bingo', 'card-deck']).toContain(state);
      });
    });

    it('should accept all valid states', () => {
      const allStates: GameState[] = [
        'start',
        'playing',
        'bingo',
        'card-deck',
        'scavenger-hunt',
        'hunt-complete',
      ];
      expect(allStates).toHaveLength(6);
    });

    it('should be assignable from string literals', () => {
      const startState: GameState = 'start';
      const huntState: GameState = 'scavenger-hunt';
      const completeState: GameState = 'hunt-complete';

      expect(startState).toBeTruthy();
      expect(huntState).toBeTruthy();
      expect(completeState).toBeTruthy();
    });
  });

  describe('ScavengerHuntItem type', () => {
    it('should have required properties', () => {
      const item: ScavengerHuntItem = {
        id: 0,
        text: 'Test question',
        isCompleted: false,
      };

      expect(item.id).toBe(0);
      expect(item.text).toBe('Test question');
      expect(item.isCompleted).toBe(false);
    });

    it('should allow id property', () => {
      const item: ScavengerHuntItem = {
        id: 5,
        text: 'Question',
        isCompleted: true,
      };
      expect(typeof item.id).toBe('number');
    });

    it('should allow text property as string', () => {
      const item: ScavengerHuntItem = {
        id: 0,
        text: 'This is a question text',
        isCompleted: false,
      };
      expect(typeof item.text).toBe('string');
    });

    it('should allow isCompleted property as boolean', () => {
      const itemTrue: ScavengerHuntItem = {
        id: 0,
        text: 'Q',
        isCompleted: true,
      };
      const itemFalse: ScavengerHuntItem = {
        id: 0,
        text: 'Q',
        isCompleted: false,
      };

      expect(typeof itemTrue.isCompleted).toBe('boolean');
      expect(typeof itemFalse.isCompleted).toBe('boolean');
    });

    it('should create array of hunt items', () => {
      const items: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: false },
        { id: 1, text: 'Q2', isCompleted: true },
        { id: 2, text: 'Q3', isCompleted: false },
      ];

      expect(Array.isArray(items)).toBe(true);
      expect(items).toHaveLength(3);
      items.forEach((item, index) => {
        expect(item.id).toBe(index);
        expect(typeof item.text).toBe('string');
        expect(typeof item.isCompleted).toBe('boolean');
      });
    });
  });

  describe('ScavengerHuntState interface', () => {
    it('should define hunt list property', () => {
      const huntState = {
        huntList: [
          { id: 0, text: 'Q1', isCompleted: false },
        ],
        huntProgress: 0,
        showHuntCompleteModal: false,
      };

      expect(Array.isArray(huntState.huntList)).toBe(true);
    });

    it('should define hunt progress property', () => {
      const huntState = {
        huntList: [],
        huntProgress: 50,
        showHuntCompleteModal: false,
      };

      expect(typeof huntState.huntProgress).toBe('number');
      expect(huntState.huntProgress).toBeGreaterThanOrEqual(0);
      expect(huntState.huntProgress).toBeLessThanOrEqual(100);
    });

    it('should define showHuntCompleteModal property', () => {
      const huntState = {
        huntList: [],
        huntProgress: 0,
        showHuntCompleteModal: true,
      };

      expect(typeof huntState.showHuntCompleteModal).toBe('boolean');
    });

    it('should allow nested item structure', () => {
      const items: ScavengerHuntItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Question ${i + 1}`,
        isCompleted: Math.random() > 0.5,
      }));

      expect(items.every((item) => typeof item.id === 'number')).toBe(true);
      expect(items.every((item) => typeof item.text === 'string')).toBe(true);
      expect(items.every((item) => typeof item.isCompleted === 'boolean')).toBe(true);
    });
  });

  describe('BingoSquareData type', () => {
    it('should still maintain its original structure', () => {
      const square: BingoSquareData = {
        id: 0,
        text: 'Question',
        isMarked: false,
        isFreeSpace: false,
      };

      expect(square.id).toBe(0);
      expect(square.text).toBe('Question');
      expect(square.isMarked).toBe(false);
      expect(square.isFreeSpace).toBe(false);
    });
  });

  describe('BingoLine type', () => {
    it('should still maintain its original structure', () => {
      const line: BingoLine = {
        type: 'row',
        index: 0,
        squares: [0, 1, 2, 3, 4],
      };

      expect(line.type).toBe('row');
      expect(line.index).toBe(0);
      expect(Array.isArray(line.squares)).toBe(true);
    });
  });

  describe('Type compatibility', () => {
    it('should allow type narrowing for scavenger hunt state', () => {
      const state: GameState = 'scavenger-hunt';

      if (state === 'scavenger-hunt' || state === 'hunt-complete') {
        // Type guard successful
        expect(true).toBe(true);
      }
    });

    it('should allow union of hunt-related states', () => {
      type HuntStates = 'scavenger-hunt' | 'hunt-complete';
      const state: HuntStates = 'hunt-complete';

      expect(['scavenger-hunt', 'hunt-complete']).toContain(state);
    });
  });
});
