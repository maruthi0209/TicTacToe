import React from 'react';
import { getCategoryDisplayName, emojiCategories } from '../../utils/EmojiCategories';
import './ScoreBoard.css';

const ScoreBoard = ({ 
  scores, 
  currentPlayer, 
  player1Category, 
  player2Category 
}) => {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold text-white mb-2">🎮 Blink Tac Toe</h1>
        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <div className={`badge fs-6 px-3 py-2 ${
            currentPlayer === 1 ? 'bg-primary' : 'bg-secondary'
          }`}>
            Player 1: {getCategoryDisplayName(player1Category)} {emojiCategories[player1Category]?.[0]}
          </div>
          <div className={`badge fs-6 px-3 py-2 ${
            currentPlayer === 2 ? 'bg-success' : 'bg-secondary'
          }`}>
            Player 2: {getCategoryDisplayName(player2Category)} {emojiCategories[player2Category]?.[0]}
          </div>
        </div>
      </div>

      {/* Score Board */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-white bg-opacity-90 border-0 rounded-4 shadow">
            <div className="card-body p-3">
              <div className="row text-center">
                <div className="col-4">
                  <h5 className="mb-1">Player 1</h5>
                  <span className="badge bg-primary fs-6">{scores.player1}</span>
                </div>
                <div className="col-4">
                  <h5 className="mb-1">Current Turn</h5>
                  <span className={`badge fs-6 ${
                    currentPlayer === 1 ? 'bg-primary' : 'bg-success'
                  }`}>
                    Player {currentPlayer}
                  </span>
                </div>
                <div className="col-4">
                  <h5 className="mb-1">Player 2</h5>
                  <span className="badge bg-success fs-6">{scores.player2}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;