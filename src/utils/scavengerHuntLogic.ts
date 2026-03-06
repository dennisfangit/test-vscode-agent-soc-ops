import type { ScavengerHuntItem } from '../types';
import { questions } from '../data/questions';

/**
 * Generate a list of scavenger hunt items from the questions pool
 */
export function generateScavengerHuntList(): ScavengerHuntItem[] {
  return questions.map((text, index) => ({
    id: index,
    text,
    isCompleted: false,
  }));
}

/**
 * Toggle a hunt item's completion status (immutable pattern)
 */
export function toggleHuntItem(
  list: ScavengerHuntItem[],
  itemId: number
): ScavengerHuntItem[] {
  return list.map((item) =>
    item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
  );
}

/**
 * Count items with a specific completion status
 */
function countByCompletion(list: ScavengerHuntItem[], completed: boolean): number {
  return list.filter((item) => item.isCompleted === completed).length;
}

/**
 * Calculate the completion progress as a percentage (0-100)
 * Returns an integer percentage rounded to nearest whole number
 */
export function calculateProgress(list: ScavengerHuntItem[]): number {
  if (list.length === 0) return 0;
  const completed = countByCompletion(list, true);
  return Math.round((completed / list.length) * 100);
}

/**
 * Check if the hunt is fully complete (all items marked)
 */
export function isHuntComplete(list: ScavengerHuntItem[]): boolean {
  return list.length > 0 && list.every((item) => item.isCompleted);
}
