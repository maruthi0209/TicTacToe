import { useState } from 'react';
import { checkWinner, canPlaceEmoji } from '../utils/gameRules';
import { getRandomEmoji } from '../utils/EmojiCategories';

export const useGameLogic = () => {
  const [gamePhase, setGamePhase] = useState('category-selection');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Category, setPlayer1Category] = useState('');
  const [player2Category, setPlayer2Category] = useState('');
  const [player1Emojis, setPlayer1Emojis] = useState([]);
  const [player2Emojis, setPlayer2Emojis] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameHistory, setGameHistory] = useState([]);

  const handleCellClick = (index) => {
    if (gamePhase !== 'playing' || board[index] || winner) return;

    const currentCategory = currentPlayer === 1 ? player1Category : player2Category;
    const currentPlayerEmojis = currentPlayer === 1 ? player1Emojis : player2Emojis;
    const randomEmoji = getRandomEmoji(currentCategory);
    
    // Check if placing 4th emoji and validate position
    if (currentPlayerEmojis.length >= 3) {
      const oldestPosition = currentPlayerEmojis[0]?.position;
      if (!canPlaceEmoji(index, oldestPosition, true)) {
        return; // Invalid move
      }
    }

    const newBoard = [...board];
    const emojiData = {
      emoji: randomEmoji,
      player: currentPlayer,
      timestamp: Date.now(),
      position: index
    };

    newBoard[index] = emojiData;

    // Handle vanishing rule
    const updatedPlayerEmojis = [...currentPlayerEmojis, emojiData];
    
    if (updatedPlayerEmojis.length > 3) {
      const oldestEmoji = updatedPlayerEmojis[0];
      newBoard[oldestEmoji.position] = null;
      updatedPlayerEmojis.shift();
    }

    setBoard(newBoard);
    
    // Update player emoji tracking
    if (currentPlayer === 1) {
      setPlayer1Emojis(updatedPlayerEmojis);
    } else {
      setPlayer2Emojis(updatedPlayerEmojis);
    }

    // Check for winner
    const gameResult = checkWinner(newBoard, player1Category, player2Category);
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
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(1);
    setPlayer1Emojis([]);
    setPlayer2Emojis([]);
    setWinner(null);
    setWinningLine([]);
    setGamePhase('playing');
  };

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

  const startGame = () => {
    if (player1Category && player2Category) {
      setGamePhase('playing');
    }
  };

  return {
    // State
    gamePhase,
    board,
    currentPlayer,
    player1Category,
    player2Category,
    winner,
    winningLine,
    scores,
    gameHistory,
    
    // Actions
    handleCellClick,
    startNewGame,
    resetGame,
    startGame,
    setPlayer1Category,
    setPlayer2Category
  };
};