import { useState, useCallback, useMemo, useEffect } from 'react';
import type { ScavengerHuntItem } from '../types';
import {
  generateScavengerHuntList,
  toggleHuntItem as toggleHuntItemLogic,
  calculateProgress,
  isHuntComplete,
} from '../utils/scavengerHuntLogic';

interface UseHuntStateReturn {
  huntList: ScavengerHuntItem[];
  huntProgress: number;
  showHuntCompleteModal: boolean;
  startScavengerHunt: () => void;
  toggleHuntItem: (itemId: number) => void;
  dismissHuntCompleteModal: () => void;
  resetHunt: () => void;
  initializeHunt: (initialList: ScavengerHuntItem[]) => void;
}

export function useHuntState(onComplete?: () => void): UseHuntStateReturn {
  const [huntList, setHuntList] = useState<ScavengerHuntItem[]>([]);
  const [showHuntCompleteModal, setShowHuntCompleteModal] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const huntProgress = useMemo(
    () => calculateProgress(huntList),
    [huntList]
  );

  // Detect hunt completion
  useEffect(() => {
    if (isActive && isHuntComplete(huntList) && huntList.length > 0) {
      setShowHuntCompleteModal(true);
      onComplete?.();
    }
  }, [isActive, huntList, onComplete]);

  const startScavengerHunt = useCallback(() => {
    setHuntList(generateScavengerHuntList());
    setIsActive(true);
    setShowHuntCompleteModal(false);
  }, []);

  const toggleHuntItem = useCallback((itemId: number) => {
    setHuntList((current) => toggleHuntItemLogic(current, itemId));
  }, []);

  const dismissHuntCompleteModal = useCallback(() => {
    setShowHuntCompleteModal(false);
    setIsActive(false);
    setHuntList([]);
  }, []);

  const resetHunt = useCallback(() => {
    setHuntList([]);
    setShowHuntCompleteModal(false);
    setIsActive(false);
  }, []);

  const initializeHunt = useCallback((initialList: ScavengerHuntItem[]) => {
    setHuntList(initialList);
    setIsActive(true);
  }, []);

  return {
    huntList,
    huntProgress,
    showHuntCompleteModal,
    startScavengerHunt,
    toggleHuntItem,
    dismissHuntCompleteModal,
    resetHunt,
    initializeHunt,
  };
}
