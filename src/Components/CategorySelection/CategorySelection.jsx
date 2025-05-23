import React from 'react';
import { emojiCategories, getCategoryDisplayName } from '../../utils/EmojiCategories';
import './CategorySelection.css';

const CategorySelection = ({ 
  player1Category, 
  player2Category, 
  setPlayer1Category, 
  setPlayer2Category, 
  onStartGame,
  onShowHelp 
}) => {
  return (
    <div className="category-selection-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h1 className="text-center mb-4 display-4 fw-bold text-primary">
                🎮 Blink Tac Toe
              </h1>
              <p className="text-center text-muted mb-4">
                Choose your emoji categories to begin the battle!
              </p>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h4 className="text-center mb-3">
                    <span className="badge bg-primary rounded-pill">Player 1</span>
                  </h4>
                  {Object.keys(emojiCategories).map(category => (
                    <button
                      key={category}
                      className={`btn w-100 mb-2 ${
                        player1Category === category 
                          ? 'btn-primary' 
                          : 'btn-outline-primary'
                      }`}
                      onClick={() => setPlayer1Category(category)}
                    >
                      <span className="me-2">
                        {emojiCategories[category].slice(0, 4).join(' ')}
                      </span>
                      {getCategoryDisplayName(category)}
                    </button>
                  ))}
                </div>
                
                <div className="col-md-6 mb-4">
                  <h4 className="text-center mb-3">
                    <span className="badge bg-success rounded-pill">Player 2</span>
                  </h4>
                  {Object.keys(emojiCategories).map(category => (
                    <button
                      key={category}
                      className={`btn w-100 mb-2 ${
                        player2Category === category 
                          ? 'btn-success' 
                          : 'btn-outline-success'
                      }`}
                      onClick={() => setPlayer2Category(category)}
                      disabled={category === player1Category}
                    >
                      <span className="me-2">
                        {emojiCategories[category].slice(0, 4).join(' ')}
                      </span>
                      {getCategoryDisplayName(category)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <button
                  className="btn btn-lg btn-warning px-5 rounded-pill"
                  onClick={onStartGame}
                  disabled={!player1Category || !player2Category}
                >
                  <i className="fas fa-play me-2"></i>
                  Start Game!
                </button>
              </div>
              
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={onShowHelp}
                >
                  <i className="fas fa-question-circle me-1"></i>
                  How to Play?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;