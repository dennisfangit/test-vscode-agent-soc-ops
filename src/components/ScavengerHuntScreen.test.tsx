import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScavengerHuntScreen } from './ScavengerHuntScreen';
import type { ScavengerHuntItem } from '../utils/scavengerHuntLogic';

describe('ScavengerHuntScreen', () => {
  const mockHuntList: ScavengerHuntItem[] = [
    { id: 0, text: 'bikes to work', isCompleted: false },
    { id: 1, text: 'speaks 3+ languages', isCompleted: false },
    { id: 2, text: 'has a pet', isCompleted: true },
    { id: 3, text: 'plays an instrument', isCompleted: false },
  ];

  const defaultProps = {
    huntList: mockHuntList,
    huntProgress: 25,
    onToggleItem: vi.fn(),
    onReset: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the screen with title', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();
    });

    it('should render all hunt items', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      mockHuntList.forEach((item) => {
        expect(screen.getByText(item.text)).toBeInTheDocument();
      });
    });

    it('should render progress meter', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should display progress percentage', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      expect(screen.getByText(/25%/)).toBeInTheDocument();
    });

    it('should render checkbox for each item', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(mockHuntList.length);
    });

    it('should render reset button', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      expect(screen.getByRole('button', { name: /reset|back|start/i })).toBeInTheDocument();
    });
  });

  describe('item state rendering', () => {
    it('should show unchecked checkbox for incomplete items', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      const uncompletedItem = screen.getByLabelText(/bikes to work/i);
      expect(uncompletedItem).not.toBeChecked();
    });

    it('should show checked checkbox for completed items', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      const completedItem = screen.getByLabelText(/has a pet/i);
      expect(completedItem).toBeChecked();
    });

    it('should visually differentiate completed items', () => {
      const { container } = render(<ScavengerHuntScreen {...defaultProps} />);
      const completedItems = container.querySelectorAll('[data-completed="true"]');
      const incompleteItems = container.querySelectorAll('[data-completed="false"]');
      
      expect(completedItems.length).toBeGreaterThan(0);
      expect(incompleteItems.length).toBeGreaterThan(0);
    });
  });

  describe('progress meter', () => {
    it('should display correct progress value', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    });

    it('should update progress when items change', () => {
      const { rerender } = render(<ScavengerHuntScreen {...defaultProps} />);
      expect(screen.getByText(/25%/)).toBeInTheDocument();

      rerender(<ScavengerHuntScreen {...defaultProps} huntProgress={50} />);
      expect(screen.getByText(/50%/)).toBeInTheDocument();
    });

    it('should display 0% progress initially', () => {
      render(<ScavengerHuntScreen {...defaultProps} huntProgress={0} />);
      expect(screen.getByText(/0%/)).toBeInTheDocument();
    });

    it('should display 100% when hunt is complete', () => {
      render(<ScavengerHuntScreen {...defaultProps} huntProgress={100} />);
      expect(screen.getByText(/100%/)).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should call onToggleItem when checkbox is clicked', async () => {
      const onToggle = vi.fn();
      render(<ScavengerHuntScreen {...defaultProps} onToggleItem={onToggle} />);

      const checkbox = screen.getByLabelText(/bikes to work/i);
      await userEvent.click(checkbox);

      expect(onToggle).toHaveBeenCalledWith(0);
    });

    it('should call onToggleItem with correct item ID', async () => {
      const onToggle = vi.fn();
      render(<ScavengerHuntScreen {...defaultProps} onToggleItem={onToggle} />);

      const checkbox = screen.getByLabelText(/speaks 3\+ languages/i);
      await userEvent.click(checkbox);

      expect(onToggle).toHaveBeenCalledWith(1);
    });

    it('should toggle multiple items independently', async () => {
      const onToggle = vi.fn();
      render(<ScavengerHuntScreen {...defaultProps} onToggleItem={onToggle} />);

      const checkbox1 = screen.getByLabelText(/bikes to work/i);
      const checkbox2 = screen.getByLabelText(/speaks 3\+ languages/i);

      await userEvent.click(checkbox1);
      await userEvent.click(checkbox2);

      expect(onToggle).toHaveBeenCalledTimes(2);
      expect(onToggle).toHaveBeenNthCalledWith(1, 0);
      expect(onToggle).toHaveBeenNthCalledWith(2, 1);
    });

    it('should call onReset when reset button is clicked', async () => {
      const onReset = vi.fn();
      render(<ScavengerHuntScreen {...defaultProps} onReset={onReset} />);

      const resetButton = screen.getByRole('button', { name: /reset|back|start/i });
      await userEvent.click(resetButton);

      expect(onReset).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA labels on checkboxes', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      mockHuntList.forEach((item) => {
        const checkbox = screen.getByLabelText(item.text);
        expect(checkbox).toHaveAttribute('type', 'checkbox');
      });
    });

    it('should have progress bar with accessible attributes', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have heading for screen title', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      const heading = screen.getByRole('heading', { name: /scavenger hunt/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have proper button labels', () => {
      render(<ScavengerHuntScreen {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button.textContent).toBeTruthy();
      });
    });
  });

  describe('styling with neon arcade aesthetic', () => {
    it('should apply neon styling classes', () => {
      const { container } = render(<ScavengerHuntScreen {...defaultProps} />);
      
      // Look for neon color classes in the component
      const element = container.querySelector('[class*="neon"]');
      expect(element).toBeTruthy();
    });

    it('should have dark background container', () => {
      const { container } = render(<ScavengerHuntScreen {...defaultProps} />);
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass('bg-');
    });

    it('should have thick borders on interactive elements', () => {
      const { container } = render(<ScavengerHuntScreen {...defaultProps} />);
      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(button.className).toMatch(/border-[4-6]/);
      });
    });
  });

  describe('responsive layout', () => {
    it('should render items in a list layout', () => {
      const { container } = render(<ScavengerHuntScreen {...defaultProps} />);
      const listContainer = container.querySelector('ul, [role="list"]');
      expect(listContainer).toBeInTheDocument();
    });

    it('should be scrollable if many items', () => {
      const manyItems = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Question ${i + 1}`,
        isCompleted: false,
      }));

      const { container } = render(
        <ScavengerHuntScreen {...defaultProps} huntList={manyItems} />
      );
      
      const scrollContainer = container.querySelector('[class*="overflow"]');
      expect(scrollContainer).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('should handle empty hunt list gracefully', () => {
      render(<ScavengerHuntScreen {...defaultProps} huntList={[]} />);
      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();
    });

    it('should display appropriate message when list is empty', () => {
      render(<ScavengerHuntScreen {...defaultProps} huntList={[]} />);
      // Should still show the screen, just with no items
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });
  });
});
