interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{
        background: 'radial-gradient(circle, rgba(255, 0, 110, 0.3), rgba(0, 0, 0, 0.8))',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        className="max-w-sm w-full text-center p-8 overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, #0a0e27, #2d1b4e)',
          border: '4px solid #fffd38',
          boxShadow: '0 0 50px rgba(255, 0, 110, 1), 0 0 100px rgba(0, 245, 255, 0.5), inset 0 0 30px rgba(255, 253, 56, 0.2)',
          animation: 'arcade-pulse 0.6s ease-in-out infinite'
        }}
      >
        {/* Arcade stars animation */}
        <div 
          className="text-6xl mb-6 font-bold"
          style={{
            color: '#fffd38',
            textShadow: '0 0 30px #fffd38, 0 0 60px #ff006e',
            animation: 'arcade-neon-glow 1s ease-in-out infinite',
            fontSize: '80px'
          }}
        >
          ✦
        </div>

        <h2 
          className="text-5xl font-bold mb-4 uppercase"
          style={{
            background: 'linear-gradient(90deg, #ff006e, #00f5ff, #fffd38)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(255, 0, 110, 1)',
            animation: 'arcade-neon-glow 1.5s ease-in-out infinite',
            fontFamily: "'Press Start 2P', cursive"
          }}
        >
          BINGO!
        </h2>

        <p 
          className="text-2xl font-bold mb-8"
          style={{
            color: '#00f5ff',
            textShadow: '0 0 15px #00f5ff'
          }}
        >
          YOU COMPLETED A LINE!
        </p>

        {/* Decorative elements */}
        <div 
          className="flex justify-center gap-3 mb-8 text-3xl"
          style={{
            color: '#ff006e',
            textShadow: '0 0 10px #ff006e'
          }}
        >
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        <button
          onClick={onDismiss}
          className="w-full font-bold py-4 px-6 text-2xl uppercase transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #00f5ff 0%, #b537f2 100%)',
            color: '#0a0e27',
            border: '3px solid #fffd38',
            textShadow: '0 0 10px #fffd38',
            boxShadow: '0 0 25px rgba(0, 245, 255, 0.8), inset 0 0 10px rgba(255, 253, 56, 0.4)',
            cursor: 'pointer',
            fontFamily: "'Press Start 2P', cursive"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 245, 255, 1), inset 0 0 15px rgba(255, 253, 56, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.8), inset 0 0 10px rgba(255, 253, 56, 0.4)';
          }}
        >
          ▶ CONTINUE ◀
        </button>
      </div>
    </div>
  );
}
