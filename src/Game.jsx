import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BlinkTacToe = () => {
  // Emoji categories
  const emojiCategories = {
    animals: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐻', '🐸', '🐯'],
    food: ['🍕', '🍟', '🍔', '🍩', '🌮', '🍎', '🍌', '🍓'],
    sports: ['⚽', '🏀', '🏈', '🎾', '🏐', '🏓', '🎱', '🏸'],
    nature: ['🌺', '🌸', '🌼', '🌻', '🌹', '🌷', '🌲', '🍄'],
    space: ['🌟', '⭐', '🌙', '☀️', '🪐', '🌍', '🚀', '🛸']
  };

  // Game state
  const [gamePhase, setGamePhase] = useState('category-selection'); // 'category-selection', 'playing', 'game-over'
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Category, setPlayer1Category] = useState('');
  const [player2Category, setPlayer2Category] = useState('');
  const [player1Emojis, setPlayer1Emojis] = useState([]);
  const [player2Emojis, setPlayer2Emojis] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameHistory, setGameHistory] = useState([]);

  // Check for winning condition
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[b] && board[c]) {
        // Check if all three belong to the same player
        const player1Emojis = emojiCategories[player1Category] || [];
        const player2Emojis = emojiCategories[player2Category] || [];
        
        const allPlayer1 = [board[a], board[b], board[c]].every(emoji => 
          player1Emojis.includes(emoji?.emoji)
        );
        const allPlayer2 = [board[a], board[b], board[c]].every(emoji => 
          player2Emojis.includes(emoji?.emoji)
        );

        if (allPlayer1) {
          return { winner: 1, line };
        }
        if (allPlayer2) {
          return { winner: 2, line };
        }
      }
    }
    return null;
  };

  // Get random emoji from category
  const getRandomEmoji = (category) => {
    const emojis = emojiCategories[category];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  // Handle cell click
  const handleCellClick = (index) => {
    if (gamePhase !== 'playing' || board[index] || winner) return;

    const newBoard = [...board];
    const currentCategory = currentPlayer === 1 ? player1Category : player2Category;
    const currentPlayerEmojis = currentPlayer === 1 ? player1Emojis : player2Emojis;
    const randomEmoji = getRandomEmoji(currentCategory);
    
    const emojiData = {
      emoji: randomEmoji,
      player: currentPlayer,
      timestamp: Date.now(),
      position: index
    };

    newBoard[index] = emojiData;

    // Handle vanishing rule (max 3 emojis per player)
    const updatedPlayerEmojis = [...currentPlayerEmojis, emojiData];
    
    if (updatedPlayerEmojis.length > 3) {
      // Remove oldest emoji
      const oldestEmoji = updatedPlayerEmojis[0];
      const oldestPosition = oldestEmoji.position;
      
      // Check if trying to place on same position as oldest
      if (index === oldestPosition) {
        return; // Invalid move
      }
      
      newBoard[oldestPosition] = null;
      updatedPlayerEmojis.shift(); // Remove oldest from tracking
    }

    setBoard(newBoard);
    
    // Update player emoji tracking
    if (currentPlayer === 1) {
      setPlayer1Emojis(updatedPlayerEmojis);
    } else {
      setPlayer2Emojis(updatedPlayerEmojis);
    }

    // Check for winner
    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult.winner);
      setWinningLine(gameResult.line);
      setGamePhase('game-over');
      
      // Update scores
      const newScores = { ...scores };
      if (gameResult.winner === 1) {
        newScores.player1++;
      } else {
        newScores.player2++;
      }
      setScores(newScores);
      
      // Add to game history
      setGameHistory(prev => [...prev, {
        winner: gameResult.winner,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } else {
      // Switch player
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  // Start new game
  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(1);
    setPlayer1Emojis([]);
    setPlayer2Emojis([]);
    setWinner(null);
    setWinningLine([]);
    setGamePhase('playing');
  };

  // Reset everything
  const resetGame = () => {
    setGamePhase('category-selection');
    setBoard(Array(9).fill(null));
    setCurrentPlayer(1);
    setPlayer1Category('');
    setPlayer2Category('');
    setPlayer1Emojis([]);
    setPlayer2Emojis([]);
    setWinner(null);
    setWinningLine([]);
    setScores({ player1: 0, player2: 0 });
    setGameHistory([]);
  };

  // Category selection phase
  if (gamePhase === 'category-selection') {
    return (
      <div className="container-fluid min-vh-100 bg-gradient" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
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
                        {category.charAt(0).toUpperCase() + category.slice(1)}
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
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    className="btn btn-lg btn-warning px-5 rounded-pill"
                    onClick={() => setGamePhase('playing')}
                    disabled={!player1Category || !player2Category}
                  >
                    <i className="fas fa-play me-2"></i>
                    Start Game!
                  </button>
                </div>
                
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() => setShowHelp(true)}
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
  }

  return (
    <div className="container-fluid min-vh-100 bg-gradient" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="row justify-content-center py-4">
        <div className="col-12 col-lg-10 col-xl-8">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="display-4 fw-bold text-white mb-2">🎮 Blink Tac Toe</h1>
            <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
              <div className={`badge fs-6 px-3 py-2 ${
                currentPlayer === 1 ? 'bg-primary' : 'bg-secondary'
              }`}>
                Player 1: {player1Category} {emojiCategories[player1Category]?.[0]}
              </div>
              <div className={`badge fs-6 px-3 py-2 ${
                currentPlayer === 2 ? 'bg-success' : 'bg-secondary'
              }`}>
                Player 2: {player2Category} {emojiCategories[player2Category]?.[0]}
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

          {/* Game Board */}
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-sm-8 col-md-6">
              <div className="card bg-white border-0 rounded-4 shadow-lg p-3">
                <div className="row g-2">
                  {board.map((cell, index) => (
                    <div key={index} className="col-4">
                      <button
                        className={`btn w-100 h-100 border-2 rounded-3 position-relative ${
                          winningLine.includes(index) 
                            ? 'btn-warning border-warning shadow-lg' 
                            : 'btn-outline-secondary'
                        }`}
                        style={{ 
                          height: '80px', 
                          fontSize: '2rem',
                          transition: 'all 0.3s ease',
                          transform: cell ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onClick={() => handleCellClick(index)}
                        disabled={gamePhase !== 'playing' || winner}
                      >
                        {cell && (
                          <span 
                            className="d-block"
                            style={{
                              animation: 'fadeInScale 0.3s ease-out'
                            }}
                          >
                            {cell.emoji}
                          </span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Game Over Modal */}
          {winner && (
            <div className="row justify-content-center mb-4">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="card bg-success text-white border-0 rounded-4 shadow-lg">
                  <div className="card-body text-center p-4">
                    <h2 className="mb-3">
                      🎉 Player {winner} Wins! 🎉
                    </h2>
                    <p className="mb-3">
                      Congratulations on your victory with {winner === 1 ? player1Category : player2Category} emojis!
                    </p>
                    <button
                      className="btn btn-light btn-lg me-3"
                      onClick={startNewGame}
                    >
                      <i className="fas fa-redo me-2"></i>
                      Play Again
                    </button>
                    <button
                      className="btn btn-outline-light"
                      onClick={resetGame}
                    >
                      <i className="fas fa-home me-2"></i>
                      New Categories
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">🎮 How to Play Blink Tac Toe</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowHelp(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <h6>🎯 Objective</h6>
                    <p>Be the first to get 3 of your emojis in a row (horizontal, vertical, or diagonal)!</p>
                    
                    <h6>🎲 Game Rules</h6>
                    <ul>
                      <li><strong>Board:</strong> 3x3 grid, maximum 6 active emojis (3 per player)</li>
                      <li><strong>Categories:</strong> Each player chooses a different emoji category</li>
                      <li><strong>Random Emojis:</strong> You get a random emoji from your category each turn</li>
                      <li><strong>Vanishing Rule:</strong> When you place a 4th emoji, your oldest one disappears!</li>
                      <li><strong>Restriction:</strong> You can't place your 4th emoji where your 1st one was</li>
                      <li><strong>Winning:</strong> Get 3 of YOUR emojis in a line to win!</li>
                    </ul>
                    
                    <h6>✨ Features</h6>
                    <ul>
                      <li>🏆 Score tracking across multiple rounds</li>
                      <li>🎨 Smooth animations and visual feedback</li>
                      <li>📱 Responsive design for all devices</li>
                      <li>🌈 Beautiful gradient backgrounds</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowHelp(false)}
                >
                  Got it! Let's Play! 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .btn:hover {
          transform: translateY(-2px) !important;
        }
        
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default BlinkTacToe;