import React from 'react';
import { getCategoryDisplayName } from '../../utils/EmojiCategories';
import './WinnerModal.css';

const WinnerModal = ({ 
  winner, 
  player1Category, 
  player2Category, 
  onPlayAgain, 
  onNewCategories 
}) => {
  if (!winner) return null;

  const winnerCategory = winner === 1 ? player1Category : player2Category;

  return (
    <div className="row justify-content-center mb-4">
      <div className="col-12 col-sm-8 col-md-6">
        <div className="card bg-success text-white border-0 rounded-4 shadow-lg winner-modal">
          <div className="card-body text-center p-4">
            <h2 className="mb-3 winner-title">
              🎉 Player {winner} Wins! 🎉
            </h2>
            <p className="mb-3">
              Congratulations on your victory with {getCategoryDisplayName(winnerCategory)} emojis!
            </p>
            <button
              className="btn btn-light btn-lg me-3"
              onClick={onPlayAgain}
            >
              <i className="fas fa-redo me-2"></i>
              Play Again
            </button>
            <button
              className="btn btn-outline-light"
              onClick={onNewCategories}
            >
              <i className="fas fa-home me-2"></i>
              New Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;