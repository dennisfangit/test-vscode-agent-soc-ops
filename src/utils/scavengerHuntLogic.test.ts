import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateScavengerHuntList,
  toggleHuntItem,
  calculateProgress,
  isHuntComplete,
  type ScavengerHuntItem,
} from './scavengerHuntLogic';

describe('scavengerHuntLogic', () => {
  describe('generateScavengerHuntList', () => {
    it('should generate a hunt list with all questions', () => {
      const list = generateScavengerHuntList();
      expect(list).toHaveLength(24);
    });

    it('should create items with correct structure', () => {
      const list = generateScavengerHuntList();
      list.forEach((item, index) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('text');
        expect(item).toHaveProperty('isCompleted');
        expect(item.id).toBe(index);
        expect(typeof item.text).toBe('string');
        expect(item.isCompleted).toBe(false);
      });
    });

    it('should have unique IDs from 0 to 23', () => {
      const list = generateScavengerHuntList();
      const ids = list.map((item) => item.id);
      expect(ids).toEqual(Array.from({ length: 24 }, (_, i) => i));
    });

    it('should have all items marked as not completed initially', () => {
      const list = generateScavengerHuntList();
      list.forEach((item) => {
        expect(item.isCompleted).toBe(false);
      });
    });

    it('should have non-empty text for each item', () => {
      const list = generateScavengerHuntList();
      list.forEach((item) => {
        expect(item.text.length).toBeGreaterThan(0);
      });
    });
  });

  describe('toggleHuntItem', () => {
    let mockList: ScavengerHuntItem[];

    beforeEach(() => {
      mockList = [
        { id: 0, text: 'Question 1', isCompleted: false },
        { id: 1, text: 'Question 2', isCompleted: true },
        { id: 2, text: 'Question 3', isCompleted: false },
      ];
    });

    it('should toggle incomplete item to completed', () => {
      const newList = toggleHuntItem(mockList, 0);
      expect(newList[0].isCompleted).toBe(true);
    });

    it('should toggle completed item to incomplete', () => {
      const newList = toggleHuntItem(mockList, 1);
      expect(newList[1].isCompleted).toBe(false);
    });

    it('should return a new array', () => {
      const newList = toggleHuntItem(mockList, 0);
      expect(newList).not.toBe(mockList);
    });

    it('should not mutate the original array', () => {
      const originalState = JSON.stringify(mockList);
      toggleHuntItem(mockList, 0);
      expect(JSON.stringify(mockList)).toBe(originalState);
    });

    it('should preserve other items', () => {
      const newList = toggleHuntItem(mockList, 0);
      expect(newList[1]).toEqual(mockList[1]);
      expect(newList[2]).toEqual(mockList[2]);
    });

    it('should handle toggling multiple items sequentially', () => {
      let list = mockList;
      list = toggleHuntItem(list, 0);
      expect(list[0].isCompleted).toBe(true);
      list = toggleHuntItem(list, 1);
      expect(list[1].isCompleted).toBe(false);
      list = toggleHuntItem(list, 2);
      expect(list[2].isCompleted).toBe(true);
    });
  });

  describe('calculateProgress', () => {
    it('should return 0 for empty list', () => {
      const progress = calculateProgress([]);
      expect(progress).toBe(0);
    });

    it('should return 0 when no items are completed', () => {
      const list: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: false },
        { id: 1, text: 'Q2', isCompleted: false },
      ];
      const progress = calculateProgress(list);
      expect(progress).toBe(0);
    });

    it('should return 100 when all items are completed', () => {
      const list: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: true },
      ];
      const progress = calculateProgress(list);
      expect(progress).toBe(100);
    });

    it('should return 50 when half items are completed', () => {
      const list: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: false },
      ];
      const progress = calculateProgress(list);
      expect(progress).toBe(50);
    });

    it('should calculate correct percentage for partial completion', () => {
      const list: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: true },
        { id: 2, text: 'Q3', isCompleted: false },
        { id: 3, text: 'Q4', isCompleted: false },
        { id: 4, text: 'Q5', isCompleted: false },
        { id: 5, text: 'Q6', isCompleted: false },
      ];
      const progress = calculateProgress(list);
      expect(progress).toBeCloseTo(33.33, 1);
    });

    it('should return integer percentage', () => {
      const list: ScavengerHuntItem[] = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        text: `Q${i + 1}`,
        isCompleted: i === 0,
      }));
      const progress = calculateProgress(list);
      expect(Number.isInteger(progress)).toBe(true);
    });
  });

  describe('isHuntComplete', () => {
    it('should return false for empty list', () => {
      const isComplete = isHuntComplete([]);
      expect(isComplete).toBe(false);
    });

    it('should return false when no items are completed', () => {
      const list: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: false },
        { id: 1, text: 'Q2', isCompleted: false },
      ];
      const isComplete = isHuntComplete(list);
      expect(isComplete).toBe(false);
    });

    it('should return false when some items are completed', () => {
      const list: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: false },
      ];
      const isComplete = isHuntComplete(list);
      expect(isComplete).toBe(false);
    });

    it('should return true when all items are completed', () => {
      const list: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: true },
      ];
      const isComplete = isHuntComplete(list);
      expect(isComplete).toBe(true);
    });

    it('should return true for single completed item', () => {
      const list: ScavengerHuntItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
      ];
      const isComplete = isHuntComplete(list);
      expect(isComplete).toBe(true);
    });
  });
});
