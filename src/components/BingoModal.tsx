interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <div 
        className="max-w-sm w-full text-center p-8 overflow-hidden relative"
        style={{
          background: '#1a1a2e',
          border: '6px solid #00ffff',
          boxShadow: '0 0 50px rgba(0, 255, 255, 1), 0 0 80px rgba(255, 0, 255, 0.6)',
          animation: 'arcade-pulse 0.6s ease-in-out infinite'
        }}
      >
        {/* Celebration emoji */}
        <div 
          className="text-6xl mb-6 font-bold"
          style={{
            color: '#ffff00',
            textShadow: '0 0 30px #ffff00',
            fontSize: '80px'
          }}
        >
          🎉
        </div>

        {/* BINGO! text */}
        <h2 
          className="text-5xl font-bold mb-4 uppercase"
          style={{
            color: '#ff00ff',
            textShadow: '0 0 30px #ff00ff',
            animation: 'arcade-neon-glow 1.5s ease-in-out infinite',
            fontFamily: "'Press Start 2P', monospace"
          }}
        >
          BINGO!
        </h2>

        {/* Congratulations text */}
        <p 
          className="text-2xl font-bold mb-8"
          style={{
            color: '#ffffff',
            textShadow: '0 0 10px #00ffff',
            fontFamily: "'Press Start 2P', monospace"
          }}
        >
          YOU COMPLETED A LINE!
        </p>

        {/* Decorative stars */}
        <div 
          className="flex justify-center gap-3 mb-8 text-3xl"
          style={{
            color: '#ffff00',
            textShadow: '0 0 10px #ffff00'
          }}
        >
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        {/* Continue button */}
        <button
          onClick={onDismiss}
          className="w-full font-bold py-4 px-6 text-2xl uppercase transition-all active:scale-95 border-4"
          style={{
            background: '#00ffff',
            color: '#1a1a2e',
            borderColor: '#ff00ff',
            textShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
            boxShadow: '0 0 25px rgba(0, 255, 255, 0.8)',
            cursor: 'pointer',
            fontFamily: "'Press Start 2P', monospace"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.8)';
          }}
        >
          ▶ CONTINUE ◀
        </button>
      </div>
    </div>
  );
}
