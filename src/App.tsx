import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardDeck } from './components/CardDeck';
import { BingoModal } from './components/BingoModal';

function App() {
  const {
    gameState,
    board,
    winningLine,
    winningSquareIds,
    showBingoModal,
    currentCardIndex,
    huntList,
    huntProgress,
    showHuntCompleteModal,
    startGame,
    startScavengerHunt,
    startCardDeck,
    drawCard,
    handleSquareClick,
    toggleHuntItem,
    resetGame,
    dismissModal,
    dismissHuntCompleteModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return (
      <StartScreen
        onStartBingo={startGame}
        onStartScavengerHunt={startScavengerHunt}
        onStartCardDeck={startCardDeck}
      />
    );
  }

  if (gameState === 'card-deck') {
    return <CardDeck currentCardIndex={currentCardIndex} onDrawCard={drawCard} onReset={resetGame} />;
  }

  return (
    <GameScreen
      gameState={gameState}
      board={board}
      winningLine={winningLine}
      winningSquareIds={winningSquareIds}
      showBingoModal={showBingoModal}
      huntList={huntList}
      huntProgress={huntProgress}
      showHuntCompleteModal={showHuntCompleteModal}
      onSquareClick={handleSquareClick}
      onReset={resetGame}
      onToggleHuntItem={toggleHuntItem}
      onDismissBingo={dismissModal}
      onDismissHuntComplete={dismissHuntCompleteModal}
    />
  );
}

export default App;
