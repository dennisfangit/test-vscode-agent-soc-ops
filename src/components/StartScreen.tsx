interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gradient-to-b from-arcade-bg to-arcade-dark relative overflow-hidden">
      {/* Arcade scanline effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 0, 110, 0.03) 0px, rgba(255, 0, 110, 0.03) 1px, transparent 1px, transparent 2px)'
        }} />
      </div>

      <div className="text-center max-w-xl z-10 relative">
        {/* Title with neon glow and CRT effect */}
        <h1 
          className="text-6xl font-bold text-center mb-2"
          style={{
            color: '#ff006e',
            textShadow: '0 0 20px #ff006e, 0 0 40px #ff006e, 0 0 60px #ff006e',
            letterSpacing: '4px',
            lineHeight: '1.2',
            animation: 'arcade-neon-glow 2s ease-in-out infinite',
            fontFamily: "'Press Start 2P', cursive"
          }}
        >
          SOC OPS
        </h1>

        {/* Subtitle */}
        <p 
          className="text-2xl font-bold mb-12"
          style={{
            color: '#00f5ff',
            textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff',
            animation: 'arcade-flicker 3s infinite'
          }}
        >
          ARCADE BINGO
        </p>

        {/* How to play box with arcade styling */}
        <div 
          className="bg-arcade-dark border-4 p-8 mb-12 text-left"
          style={{
            borderColor: '#fffd38',
            borderImage: 'linear-gradient(135deg, #ff006e, #00f5ff, #fffd38) 1',
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9), rgba(45, 27, 78, 0.9))',
            boxShadow: '0 0 20px rgba(255, 0, 110, 0.5), inset 0 0 20px rgba(0, 245, 255, 0.1)'
          }}
        >
          <h2 
            className="font-bold mb-4 text-xl"
            style={{
              color: '#fffd38',
              textShadow: '0 0 10px #fffd38'
            }}
          >
            &gt; HOW TO PLAY
          </h2>
          <ul className="text-left space-y-3">
            <li style={{ color: '#00f5ff', textShadow: '0 0 5px #00f5ff' }}>
              ▸ FIND people who match
            </li>
            <li style={{ color: '#00f5ff', textShadow: '0 0 5px #00f5ff' }}>
              ▸ TAP squares when matched
            </li>
            <li style={{ color: '#00f5ff', textShadow: '0 0 5px #00f5ff' }}>
              ▸ GET 5 IN A ROW TO WIN!
            </li>
          </ul>
        </div>

        {/* Start button with arcade styling */}
        <button
          onClick={onStart}
          className="w-full font-bold py-4 px-8 text-2xl active:scale-95 transition-transform uppercase"
          style={{
            background: 'linear-gradient(135deg, #ff006e 0%, #b537f2 100%)',
            color: '#fffd38',
            border: '4px solid #fffd38',
            textShadow: '0 0 10px #fffd38',
            boxShadow: '0 0 20px rgba(255, 0, 110, 0.8), inset 0 0 10px rgba(255, 253, 56, 0.3)',
            animation: 'arcade-pulse 1.5s ease-in-out infinite',
            fontFamily: "'Press Start 2P', cursive",
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 110, 1), inset 0 0 15px rgba(255, 253, 56, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.8), inset 0 0 10px rgba(255, 253, 56, 0.3)';
          }}
        >
          ▶ START GAME ◀
        </button>

        {/* Decorative arcade elements */}
        <div 
          className="mt-12 flex justify-center gap-4 text-2xl"
          style={{
            color: '#00f5ff',
            textShadow: '0 0 10px #00f5ff'
          }}
        >
          <span>◆</span>
          <span>◆</span>
          <span>◆</span>
        </div>
      </div>
    </div>
  );
}
