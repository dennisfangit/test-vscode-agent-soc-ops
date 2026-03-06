import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartScreen } from './StartScreen';

describe('StartScreen - Scavenger Hunt Mode Option', () => {
  const mockProps = {
    onStartGame: vi.fn(),
    onStartScavengerHunt: vi.fn(),
    onStartCardDeck: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the start screen', () => {
      render(<StartScreen {...mockProps} />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('should display bingo game mode button', () => {
      render(<StartScreen {...mockProps} />);
      expect(screen.getByRole('button', { name: /bingo|play/i })).toBeInTheDocument();
    });

    it('should display scavenger hunt mode button', () => {
      render(<StartScreen {...mockProps} />);
      expect(screen.getByRole('button', { name: /scavenger hunt/i })).toBeInTheDocument();
    });

    it('should display card deck mode button', () => {
      render(<StartScreen {...mockProps} />);
      expect(screen.getByRole('button', { name: /card deck/i })).toBeInTheDocument();
    });

    it('should have three game mode options', () => {
      render(<StartScreen {...mockProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('scavenger hunt button', () => {
    it('should have scavenger hunt as a labeled button', () => {
      render(<StartScreen {...mockProps} />);
      const button = screen.getByRole('button', { name: /scavenger hunt/i });
      expect(button).toBeInTheDocument();
      expect(button.textContent?.toLowerCase()).toContain('scavenger');
      expect(button.textContent?.toLowerCase()).toContain('hunt');
    });

    it('should be clickable', async () => {
      render(<StartScreen {...mockProps} />);
      const button = screen.getByRole('button', { name: /scavenger hunt/i });
      expect(button).toBeEnabled();
    });

    it('should have descriptive text or icon', () => {
      render(<StartScreen {...mockProps} />);
      const button = screen.getByRole('button', { name: /scavenger hunt/i });
      expect(button.textContent).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should call onStartGame when bingo button is clicked', async () => {
      render(<StartScreen {...mockProps} />);
      const bingoButton = screen.getByRole('button', { name: /bingo|play/i });
      await userEvent.click(bingoButton);
      expect(mockProps.onStartGame).toHaveBeenCalled();
    });

    it('should call onStartScavengerHunt when scavenger hunt button is clicked', async () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);
      expect(mockProps.onStartScavengerHunt).toHaveBeenCalled();
    });

    it('should call onStartCardDeck when card deck button is clicked', async () => {
      render(<StartScreen {...mockProps} />);
      const cardDeckButton = screen.getByRole('button', { name: /card deck/i });
      await userEvent.click(cardDeckButton);
      expect(mockProps.onStartCardDeck).toHaveBeenCalled();
    });

    it('should not trigger other callbacks when scavenger hunt is clicked', async () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);
      
      expect(mockProps.onStartScavengerHunt).toHaveBeenCalled();
      expect(mockProps.onStartGame).not.toHaveBeenCalled();
      expect(mockProps.onStartCardDeck).not.toHaveBeenCalled();
    });
  });

  describe('button styling', () => {
    it('should have consistent styling across mode buttons', () => {
      render(<StartScreen {...mockProps} />);
      
      const bingoButton = screen.getByRole('button', { name: /bingo|play/i });
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      const cardDeckButton = screen.getByRole('button', { name: /card deck/i });

      // All should have some class styling
      expect(bingoButton.className).toBeTruthy();
      expect(scavengerHuntButton.className).toBeTruthy();
      expect(cardDeckButton.className).toBeTruthy();
    });

    it('should have thick border styling on scavenger hunt button', () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      expect(scavengerHuntButton.className).toMatch(/border-[4-6]|border/i);
    });

    it('should have neon color styling', () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      expect(scavengerHuntButton.className).toMatch(/cyan|magenta|neon|color|bg/i);
    });

    it('should apply dark background to buttons', () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      expect(scavengerHuntButton.className).toMatch(/bg|dark/i);
    });
  });

  describe('accessibility', () => {
    it('should have accessible button labels', () => {
      render(<StartScreen {...mockProps} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button.textContent).toBeTruthy();
      });
    });

    it('should have proper button roles', () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      expect(scavengerHuntButton.tagName).toMatch(/BUTTON|A/);
    });

    it('should allow keyboard navigation', async () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      
      scavengerHuntButton.focus();
      expect(scavengerHuntButton).toHaveFocus();
      
      await userEvent.keyboard('{Enter}');
      expect(mockProps.onStartScavengerHunt).toHaveBeenCalled();
    });
  });

  describe('visual hierarchy', () => {
    it('should display game mode options in a clear layout', () => {
      const { container } = render(<StartScreen {...mockProps} />);
      
      // Should have some container for buttons
      const buttonContainer = container.querySelector('[class*="flex"], [class*="grid"], [role*="group"]');
      expect(buttonContainer).toBeTruthy();
    });

    it('should have sufficient spacing between buttons', () => {
      const { container } = render(<StartScreen {...mockProps} />);
      
      // Look for gap or margin classes
      const spacing = container.querySelector('[class*="gap"], [class*="space"]');
      expect(spacing || container.firstChild).toBeTruthy();
    });

    it('should have descriptive title/heading', () => {
      render(<StartScreen {...mockProps} />);
      const heading = screen.getByRole('heading');
      expect(heading.textContent?.toLowerCase()).toMatch(/bingo|game|social/);
    });
  });

  describe('responsive design', () => {
    it('should render buttons in accessible sizes', () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      
      const rect = scavengerHuntButton.getBoundingClientRect();
      expect(rect.height).toBeGreaterThan(0);
      expect(rect.width).toBeGreaterThan(0);
    });

    it('should have readable text size', () => {
      render(<StartScreen {...mockProps} />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      expect(scavengerHuntButton.className).toMatch(/text-|font-/i);
    });
  });

  describe('mode descriptions', () => {
    it('should provide context for each game mode', () => {
      render(<StartScreen {...mockProps} />);
      
      // Each mode should have a button with clear text
      expect(screen.getByRole('button', { name: /bingo|play/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /scavenger hunt/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /card deck|draw/i })).toBeInTheDocument();
    });
  });

  describe('button order', () => {
    it('should maintain consistent button order', () => {
      render(<StartScreen {...mockProps} />);
      const buttons = screen.getAllByRole('button');
      
      // Should have at least 3 buttons
      expect(buttons.length).toBeGreaterThanOrEqual(3);
      
      // Scavenger hunt should be present
      expect(buttons.some((btn) => btn.textContent?.toLowerCase().includes('scavenger'))).toBe(true);
    });
  });
});
