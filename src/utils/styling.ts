/**
 * Styling utility classes for consistent neon arcade aesthetic
 */

export const NEON_COLORS = {
  cyan: '#00ffff',
  magenta: '#ff00ff',
  yellow: '#ffff00',
  dark: '#1a1a2e',
  white: '#ffffff',
} as const;

export const BUTTON_STYLES = {
  base: 'font-bold py-4 px-6 text-lg md:text-xl active:scale-95 transition-all duration-150 uppercase border-4 min-h-[44px]',
  primary: 'text-bg-dark bg-neon-magenta border-neon-yellow hover:bg-neon-yellow',
  secondary: 'text-neon-cyan bg-transparent border-neon-cyan hover:bg-neon-cyan hover:text-bg-dark',
  tertiary: 'text-neon-yellow bg-transparent border-neon-yellow hover:bg-neon-yellow hover:text-bg-dark',
} as const;

export const ITEM_STYLES = {
  base: 'p-4 border-4 transition-colors',
  completed: 'bg-yellow border-magenta text-dark',
  incomplete: 'bg-dark border-cyan text-white',
} as const;

export const getItemClass = (isCompleted: boolean): string => {
  return `${ITEM_STYLES.base} ${isCompleted ? ITEM_STYLES.completed : ITEM_STYLES.incomplete}`;
};

export const PROGRESS_STYLES = {
  container: 'w-full bg-magenta rounded h-6 mb-2',
  bar: 'bg-yellow h-6 rounded transition-all',
} as const;

export const HEADER_STYLES = {
  base: 'flex items-center justify-between p-4 z-10 relative border-b-4',
  title: 'font-bold text-3xl',
  button: 'font-bold text-lg px-4 py-2 uppercase transition-all border-4 cursor-pointer',
} as const;
