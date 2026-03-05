interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-bg-dark relative overflow-hidden">
      <div className="text-center max-w-xl z-10 relative">
        {/* Title */}
        <h1 
          className="text-6xl font-bold text-center mb-2"
          style={{
            color: '#00ffff',
            textShadow: '0 0 20px #00ffff, 0 0 40px #00ffff',
            letterSpacing: '4px',
            lineHeight: '1.2',
            fontFamily: "'Press Start 2P', monospace"
          }}
        >
          SOC OPS
        </h1>

        {/* Subtitle */}
        <p 
          className="text-2xl font-bold mb-12"
          style={{
            color: '#ff00ff',
            textShadow: '0 0 10px #ff00ff'
          }}
        >
          ARCADE BINGO
        </p>

        {/* How to play box */}
        <div 
          className="bg-bg-dark border-4 p-8 mb-12 text-left"
          style={{
            borderColor: '#00ffff',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          }}
        >
          <h2 
            className="font-bold mb-4 text-xl"
            style={{
              color: '#ffff00',
              textShadow: '0 0 10px #ffff00'
            }}
          >
            &gt; HOW TO PLAY
          </h2>
          <ul className="text-left space-y-3">
            <li style={{ color: '#ffffff', textShadow: '0 0 5px #00ffff' }}>
              ▸ FIND people who match
            </li>
            <li style={{ color: '#ffffff', textShadow: '0 0 5px #00ffff' }}>
              ▸ TAP squares when matched
            </li>
            <li style={{ color: '#ffffff', textShadow: '0 0 5px #00ffff' }}>
              ▸ GET 5 IN A ROW TO WIN!
            </li>
          </ul>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full font-bold py-4 px-8 text-2xl active:scale-95 transition-transform uppercase border-4"
          style={{
            color: '#1a1a2e',
            backgroundColor: '#ff00ff',
            borderColor: '#ffff00',
            boxShadow: '0 0 20px rgba(255, 0, 255, 0.8)',
            textShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
            fontFamily: "'Press Start 2P', monospace"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 0, 255, 1)';
            e.currentTarget.style.borderColor = '#ffff00';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.8)';
          }}
        >
          ▶ START ◀
        </button>
      </div>
    </div>
  );
}
