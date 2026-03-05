import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardDeck } from './components/CardDeck';
import { BingoModal } from './components/BingoModal';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    currentCardIndex,
    startGame,
    startCardDeck,
    drawCard,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return <StartScreen onStartBingo={startGame} onStartCardDeck={startCardDeck} />;
  }

  if (gameState === 'card-deck') {
    return <CardDeck currentCardIndex={currentCardIndex} onDrawCard={drawCard} onReset={resetGame} />;
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;
