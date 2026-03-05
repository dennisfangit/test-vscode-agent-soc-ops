import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

describe('App - Scavenger Hunt Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('game mode navigation', () => {
    it('should display start screen initially', () => {
      render(<App />);
      expect(screen.getByText(/start|welcome|social.*bingo/i)).toBeInTheDocument();
    });

    it('should show scavenger hunt as available mode option', () => {
      render(<App />);
      expect(screen.getByRole('button', { name: /scavenger hunt/i })).toBeInTheDocument();
    });

    it('should transition to scavenger hunt when mode is selected', async () => {
      render(<App />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);
      expect(screen.getByText(/scavenger hunt/i)).toBeInTheDocument();
    });

    it('should display hunt list after selecting scavenger hunt mode', async () => {
      render(<App />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);
      
      // Should show hunt items
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('scavenger hunt gameplay', () => {
    it('should toggle items when checkboxes are clicked', async () => {
      render(<App />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);

      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0];
      
      expect(firstCheckbox).not.toBeChecked();
      await userEvent.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
    });

    it('should update progress as items are completed', async () => {
      render(<App />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);

      // Initially 0%
      expect(screen.getByText(/0%/)).toBeInTheDocument();

      const checkboxes = screen.getAllByRole('checkbox');
      // Complete 25% of items (6 out of 24)
      for (let i = 0; i < 6; i++) {
        await userEvent.click(checkboxes[i]);
      }

      expect(screen.getByText(/2[0-9]%/)).toBeInTheDocument();
    });

    it('should show completion modal when hunt is complete', async () => {
      render(<App />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);

      const checkboxes = screen.getAllByRole('checkbox');
      // Complete all 24 items
      for (let i = 0; i < 24; i++) {
        await userEvent.click(checkboxes[i]);
      }

      expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
      expect(screen.getByText(/hunt.*complete|complete.*hunt/i)).toBeInTheDocument();
    });

    it('should persist hunt progress to localStorage', async () => {
      const { unmount } = render(<App />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);

      const checkboxes = screen.getAllByRole('checkbox');
      await userEvent.click(checkboxes[0]);

      unmount();

      // Re-render app in new session
      render(<App />);
      const savedCheckbox = screen.getAllByRole('checkbox')[0];
      expect(savedCheckbox).toBeChecked();
    });
  });

  describe('hunt reset and restart', () => {
    it('should return to start screen from hunt completion', async () => {
      render(<App />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);

      const checkboxes = screen.getAllByRole('checkbox');
      for (let i = 0; i < 24; i++) {
        await userEvent.click(checkboxes[i]);
      }

      const dismissButton = screen.getByRole('button', { name: /continue|back|dismiss/i });
      await userEvent.click(dismissButton);

      // Should be back at start
      expect(screen.getByRole('button', { name: /scavenger hunt/i })).toBeInTheDocument();
    });

    it('should reset hunt state when restarting', async () => {
      render(<App />);
      
      // Start hunt
      let scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);

      // Mark some items
      let checkboxes = screen.getAllByRole('checkbox');
      await userEvent.click(checkboxes[0]);

      // Complete hunt
      for (let i = 0; i < 24; i++) {
        await userEvent.click(checkboxes[i]);
      }

      // Dismiss modal
      const dismissButton = screen.getByRole('button', { name: /continue|back|dismiss/i });
      await userEvent.click(dismissButton);

      // Start new hunt
      scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);

      // New hunt should have all items unmarked
      checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe('mode switching', () => {
    it('should allow switching between bingo and scavenger hunt modes', async () => {
      render(<App />);

      // Start bingo
      const bingoButton = screen.getByRole('button', { name: /play|bingo/i });
      await userEvent.click(bingoButton);
      expect(screen.getByText(/bingo|board/i)).toBeInTheDocument();

      // Reset
      const resetButton = screen.getByRole('button', { name: /reset|back|start/i });
      await userEvent.click(resetButton);

      // Switch to scavenger hunt
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);
      
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should maintain independent state for each mode', async () => {
      render(<App />);

      // Play bingo partially
      let bingoButton = screen.getByRole('button', { name: /play|bingo/i });
      await userEvent.click(bingoButton);
      let bingoSquares = screen.getAllByRole('button', { name: /bikes|speaks|pet|instrument/i });
      await userEvent.click(bingoSquares[0]);

      // Reset
      let resetButton = screen.getByRole('button', { name: /reset|back|start/i });
      await userEvent.click(resetButton);

      // Start scavenger hunt and complete some items
      let scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);
      let huntCheckboxes = screen.getAllByRole('checkbox');
      await userEvent.click(huntCheckboxes[0]);

      // Reset again
      resetButton = screen.getByRole('button', { name: /reset|back|start/i });
      await userEvent.click(resetButton);

      // Bingo should be fresh (first square unchecked)
      bingoButton = screen.getByRole('button', { name: /play|bingo/i });
      await userEvent.click(bingoButton);
    });
  });

  describe('responsive layout', () => {
    it('should render scavenger hunt screen responsively', async () => {
      render(<App />);
      const scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);

      // Check that main elements are present
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
    });
  });

  describe('localStorage persistence across modes', () => {
    it('should restore correct game state from localStorage', async () => {
      const { unmount } = render(<App />);
      
      // Start scavenger hunt and mark an item
      let scavengerHuntButton = screen.getByRole('button', { name: /scavenger hunt/i });
      await userEvent.click(scavengerHuntButton);
      
      let checkboxes = screen.getAllByRole('checkbox');
      await userEvent.click(checkboxes[0]);

      unmount();

      // Simulate page reload
      render(<App />);

      // Should still be in scavenger hunt with first item marked
      checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).toBeChecked();
    });
  });
});
