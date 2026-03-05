import type { ScavengerHuntItem } from '../types';

/**
 * Get count of completed items in the hunt
 */
export function getCompletedCount(list: ScavengerHuntItem[]): number {
  return list.filter((item) => item.isCompleted).length;
}

/**
 * Get count of remaining items
 */
export function getRemainingCount(list: ScavengerHuntItem[]): number {
  return list.length - getCompletedCount(list);
}

/**
 * Check if hunt has items
 */
export function hasHuntItems(list: ScavengerHuntItem[]): boolean {
  return list.length > 0;
}

/**
 * Check if a specific item is completed
 */
export function isItemCompleted(list: ScavengerHuntItem[], itemId: number): boolean {
  return list.some((item) => item.id === itemId && item.isCompleted);
}
