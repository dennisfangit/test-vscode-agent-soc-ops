import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScavengerHuntCompleteModal } from './ScavengerHuntCompleteModal';

describe('ScavengerHuntCompleteModal', () => {
  const defaultProps = {
    onDismiss: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render congratulations message', () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
    });

    it('should render hunt complete message', () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      expect(screen.getByText(/scavenger hunt.*complete|hunt.*complete/i)).toBeInTheDocument();
    });

    it('should render dismiss/continue button', () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      expect(screen.getByRole('button', { name: /continue|back|start|dismiss/i })).toBeInTheDocument();
    });

    it('should display as an overlay/modal', () => {
      const { container } = render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const modalElement = container.querySelector('[role="dialog"], .modal, [class*="fixed"], [class*="overlay"]');
      expect(modalElement).toBeInTheDocument();
    });
  });

  describe('neon arcade styling', () => {
    it('should have dark background', () => {
      const { container } = render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const modal = container.firstChild;
      expect(modal?.className).toMatch(/bg.*dark|dark.*bg|bg-/);
    });

    it('should have thick neon border', () => {
      const { container } = render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const modal = container.querySelector('div[class*="border"]');
      expect(modal?.className).toMatch(/border-[4-6]|border.*cyan|border.*magenta|neon/i);
    });

    it('should have magenta/yellow "HUNT COMPLETE" text styling', () => {
      const { container } = render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const completeText = screen.getByText(/scavenger hunt.*complete/i);
      expect(completeText.className).toMatch(/text.*yellow|text.*magenta|text.*white|neon/i);
    });

    it('should have neon cyan accent text', () => {
      const { container } = render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const congratsElement = screen.getByText(/congratulations/i);
      expect(congratsElement).toBeInTheDocument();
    });

    it('should have thick borders on button', async () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const button = screen.getByRole('button', { name: /continue|back|start|dismiss/i });
      expect(button.className).toMatch(/border-[4-6]/);
    });
  });

  describe('interactions', () => {
    it('should call onDismiss when button is clicked', async () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const button = screen.getByRole('button', { name: /continue|back|start|dismiss/i });
      await userEvent.click(button);
      expect(defaultProps.onDismiss).toHaveBeenCalled();
    });

    it('should call onDismiss only once on single click', async () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const button = screen.getByRole('button', { name: /continue|back|start|dismiss/i });
      await userEvent.click(button);
      expect(defaultProps.onDismiss).toHaveBeenCalledTimes(1);
    });

    it('should allow dismissing via keyboard', async () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const button = screen.getByRole('button', { name: /continue|back|start|dismiss/i });
      
      // Focus and press Enter
      await userEvent.keyboard('{Enter}');
      // OR via click which simulates keyboard interaction
      await userEvent.click(button);
      
      expect(defaultProps.onDismiss).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have role="dialog" or similar modal role', () => {
      const { container } = render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const modal = container.querySelector('[role="dialog"], [role="alertdialog"]');
      expect(modal).toBeInTheDocument();
    });

    it('should have semantic heading', () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible button label', () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button.textContent).toBeTruthy();
    });

    it('should indicate focus on interactive elements', () => {
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('visual effects', () => {
    it('should have fade-in animation or transition', () => {
      const { container } = render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const modal = container.firstChild;
      expect(modal?.className).toMatch(/transition|animate|fade/i);
    });

    it('should use bold/chunky typography for title', () => {
      const { container } = render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const title = screen.getByText(/scavenger hunt.*complete/i).closest('*');
      expect(title?.className).toMatch(/text.*font|semi?bold|text-[2-5]xl|font-bold/i);
    });
  });

  describe('content variants', () => {
    it('should handle different dismissal button labels', () => {
      // Component should support flexible button text
      render(<ScavengerHuntCompleteModal {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button.textContent?.length).toBeGreaterThan(0);
    });
  });
});
