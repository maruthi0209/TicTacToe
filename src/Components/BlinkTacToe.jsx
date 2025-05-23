import React, { useState } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import CategorySelection from './CategorySelection/CategorySelection';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import GameBoard from './GameBoard/GameBoard';
import WinnerModal from './WinnerModal/WinnerModal';
import HelpModal from './HelpModal/HelpModal';

const BlinkTacToe = () => {
  const {
    gamePhase,
    board,
    currentPlayer,
    player1Category,
    player2Category,
    winner,
    winningLine,
    scores,
    handleCellClick,
    startNewGame,
    resetGame,
    startGame,
    setPlayer1Category,
    setPlayer2Category
  } = useGameLogic();

  const [showHelp, setShowHelp] = useState(false);

  if (gamePhase === 'category-selection') {
    return (
      <div className="container-fluid min-vh-100 bg-gradient">
        <CategorySelection
          player1Category={player1Category}
          player2Category={player2Category}
          setPlayer1Category={setPlayer1Category}
          setPlayer2Category={setPlayer2Category}
          onStartGame={startGame}
          onShowHelp={() => setShowHelp(true)}
        />
        <HelpModal show={showHelp} onClose={() => setShowHelp(false)} />
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 bg-gradient">
      <div className="row justify-content-center py-4">
        <div className="col-12 col-lg-10 col-xl-8">
          <ScoreBoard
            scores={scores}
            currentPlayer={currentPlayer}
            player1Category={player1Category}
            player2Category={player2Category}
          />

          <GameBoard
            board={board}
            winningLine={winningLine}
            onCellClick={handleCellClick}
            gamePhase={gamePhase}
            winner={winner}
          />

          <WinnerModal
            winner={winner}
            player1Category={player1Category}
            player2Category={player2Category}
            onPlayAgain={startNewGame}
            onNewCategories={resetGame}
          />

          {/* Controls */}
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                <button
                  className="btn btn-outline-light"
                  onClick={() => setShowHelp(true)}
                >
                  <i className="fas fa-question-circle me-1"></i>
                  Help
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={startNewGame}
                >
                  <i className="fas fa-redo me-1"></i>
                  New Game
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={resetGame}
                >
                  <i className="fas fa-home me-1"></i>
                  Change Categories
                </button>
              </div>
            </div>
          </div>

          <HelpModal show={showHelp} onClose={() => setShowHelp(false)} />
        </div>
      </div>
    </div>
  );
};

export default BlinkTacToe;