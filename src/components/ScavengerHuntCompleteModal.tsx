import React from 'react';

interface ScavengerHuntCompleteModalProps {
  onDismiss: () => void;
}

export const ScavengerHuntCompleteModal: React.FC<ScavengerHuntCompleteModalProps> = ({
  onDismiss,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        role="dialog"
        className="bg-dark border-6 border-cyan p-8 max-w-md mx-4 text-center animate-fade-in"
      >
        <h2 className="text-5xl font-bold text-magenta mb-4">HUNT COMPLETE!</h2>
        <p className="text-2xl text-cyan mb-8 font-bold">Congratulations!</p>
        <p className="text-white mb-8 text-lg">You successfully completed the scavenger hunt!</p>
        <button
          onClick={onDismiss}
          className="px-8 py-4 bg-magenta border-4 border-magenta text-dark font-bold text-lg hover:bg-yellow hover:border-yellow transition-colors"
        >
          Continue to Start
        </button>
      </div>
    </div>
  );
};
