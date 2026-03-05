import React from 'react';
import type { ScavengerHuntItem } from '../types';
import { PROGRESS_STYLES, ITEM_STYLES } from '../utils/styling';

interface Props {
  huntList: ScavengerHuntItem[];
  huntProgress: number;
  onToggleItem: (itemId: number) => void;
  onReset: () => void;
}

const HuntItemRow: React.FC<{
  item: ScavengerHuntItem;
  onToggle: (id: number) => void;
}> = ({ item, onToggle }) => {
  const baseClass = ITEM_STYLES.base;
  const stateClass = item.isCompleted ? ITEM_STYLES.completed : ITEM_STYLES.incomplete;

  return (
    <li key={item.id} className={`mb-3 ${baseClass} ${stateClass}`} data-completed={item.isCompleted}>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => onToggle(item.id)}
          className="w-6 h-6"
        />
        <span className="flex-1">{item.text}</span>
      </label>
    </li>
  );
};

export const ScavengerHuntScreen: React.FC<Props> = ({
  huntList,
  huntProgress,
  onToggleItem,
  onReset,
}) => {
  return (
    <div className="bg-dark p-6 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-cyan mb-6">Scavenger Hunt</h1>

      {/* Progress Section */}
      <div className="mb-6">
        <div
          role="progressbar"
          aria-valuenow={huntProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className={PROGRESS_STYLES.container}
        >
          <div className={PROGRESS_STYLES.bar} style={{ width: `${huntProgress}%` }} />
        </div>
        <p className="text-white text-center font-bold">{huntProgress}%</p>
      </div>

      {/* Items List */}
      <ul className="overflow-y-auto flex-1 list-none p-0 pr-2">
        {huntList.map((item) => (
          <HuntItemRow key={item.id} item={item} onToggle={onToggleItem} />
        ))}
      </ul>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="mt-6 px-6 py-3 bg-magenta border-4 border-magenta text-dark font-bold text-lg hover:bg-yellow hover:border-yellow transition-colors"
      >
        Back to Start
      </button>
    </div>
  );
};
