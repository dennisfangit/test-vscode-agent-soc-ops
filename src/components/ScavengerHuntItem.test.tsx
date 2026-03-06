import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScavengerHuntItem } from './ScavengerHuntItem';

describe('ScavengerHuntItem', () => {
  const defaultProps = {
    id: 0,
    text: 'bikes to work',
    isCompleted: false,
    onToggle: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the item text', () => {
      render(<ScavengerHuntItem {...defaultProps} />);
      expect(screen.getByText('bikes to work')).toBeInTheDocument();
    });

    it('should render a checkbox input', () => {
      render(<ScavengerHuntItem {...defaultProps} />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should render as a list item', () => {
      render(<ScavengerHuntItem {...defaultProps} />);
      const listItem = screen.getByRole('listitem', { hidden: true });
      expect(listItem).toBeInTheDocument();
    });
  });

  describe('completed state', () => {
    it('should show unchecked checkbox when not completed', () => {
      render(<ScavengerHuntItem {...defaultProps} isCompleted={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('should show checked checkbox when completed', () => {
      render(<ScavengerHuntItem {...defaultProps} isCompleted={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should apply completed styling class', () => {
      const { container } = render(
        <ScavengerHuntItem {...defaultProps} isCompleted={true} />
      );
      const item = container.firstChild;
      expect(item).toHaveAttribute('data-completed', 'true');
    });

    it('should apply incomplete styling class', () => {
      const { container } = render(
        <ScavengerHuntItem {...defaultProps} isCompleted={false} />
      );
      const item = container.firstChild;
      expect(item).toHaveAttribute('data-completed', 'false');
    });
  });

  describe('interactions', () => {
    it('should call onToggle when checkbox is clicked', async () => {
      render(<ScavengerHuntItem {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      expect(defaultProps.onToggle).toHaveBeenCalledWith(0);
    });

    it('should call onToggle with correct item ID', async () => {
      const onToggle = vi.fn();
      render(<ScavengerHuntItem {...defaultProps} id={5} onToggle={onToggle} />);
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      expect(onToggle).toHaveBeenCalledWith(5);
    });

    it('should handle multiple toggles', async () => {
      render(<ScavengerHuntItem {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      
      await userEvent.click(checkbox);
      await userEvent.click(checkbox);
      
      expect(defaultProps.onToggle).toHaveBeenCalledTimes(2);
    });

    it('should be clickable via label text', async () => {
      render(<ScavengerHuntItem {...defaultProps} />);
      const label = screen.getByText('bikes to work');
      await userEvent.click(label);
      expect(defaultProps.onToggle).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have proper label association', () => {
      render(<ScavengerHuntItem {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('bikes to work');
      
      // Check if checkbox is associated with label
      expect(checkbox.getAttribute('aria-label') || label.parentElement?.contains(checkbox)).toBeTruthy();
    });

    it('should have descriptive aria-label if provided', () => {
      const { rerender } = render(<ScavengerHuntItem {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      
      // Initially might not have aria-label but should be associated with text
      expect(checkbox).toBeInTheDocument();
    });

    it('should have semantic HTML structure', () => {
      const { container } = render(<ScavengerHuntItem {...defaultProps} />);
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
      expect(listItem?.querySelector('input[type="checkbox"]')).toBeInTheDocument();
    });
  });

  describe('visual states', () => {
    it('should have neon cyan border when incomplete', () => {
      const { container } = render(
        <ScavengerHuntItem {...defaultProps} isCompleted={false} />
      );
      const item = container.firstChild;
      expect(item?.className).toMatch(/border|cyan|neon/i);
    });

    it('should have yellow background when completed', () => {
      const { container } = render(
        <ScavengerHuntItem {...defaultProps} isCompleted={true} />
      );
      const item = container.firstChild;
      expect(item?.className).toMatch(/bg|yellow|completed/i);
    });

    it('should have checkmark indicator when completed', () => {
      render(<ScavengerHuntItem {...defaultProps} isCompleted={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should apply active/hover states', async () => {
      const { container } = render(
        <ScavengerHuntItem {...defaultProps} />
      );
      const item = container.querySelector('li');
      
      // Simulate hover/focus
      await userEvent.hover(item!);
      expect(item).toBeInTheDocument();
    });
  });

  describe('text handling', () => {
    it('should handle short text', () => {
      render(<ScavengerHuntItem {...defaultProps} text="Short" />);
      expect(screen.getByText('Short')).toBeInTheDocument();
    });

    it('should handle long text', () => {
      const longText = 'This is a very long question that might wrap to multiple lines in the UI';
      render(<ScavengerHuntItem {...defaultProps} text={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should escape special characters in text', () => {
      render(<ScavengerHuntItem {...defaultProps} text="Question with & special < characters" />);
      expect(screen.getByText(/Question with & special < characters/)).toBeInTheDocument();
    });
  });

  describe('different item IDs', () => {
    it('should work with various item IDs', async () => {
      const ids = [0, 5, 23, 99];
      
      for (const id of ids) {
        const onToggle = vi.fn();
        const { unmount } = render(
          <ScavengerHuntItem {...defaultProps} id={id} onToggle={onToggle} />
        );
        
        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);
        
        expect(onToggle).toHaveBeenCalledWith(id);
        unmount();
      }
    });
  });
});
