import React from 'react';
import { ITEM_STYLES } from '../utils/styling';

interface ScavengerHuntItemProps {
  id: number;
  text: string;
  isCompleted: boolean;
  onToggle: (id: number) => void;
}

export const ScavengerHuntItem: React.FC<ScavengerHuntItemProps> = ({
  id,
  text,
  isCompleted,
  onToggle,
}) => {
  const baseClass = ITEM_STYLES.base;
  const stateClass = isCompleted ? ITEM_STYLES.completed : ITEM_STYLES.incomplete;

  return (
    <li className={`${baseClass} ${stateClass}`} data-completed={isCompleted}>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(id)}
          className="w-5 h-5"
          aria-label={text}
        />
        <span>{text}</span>
      </label>
    </li>
  );
};
