import { emojiCategories } from './EmojiCategories';

export const checkWinner = (board, player1Category, player2Category) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[b] && board[c]) {
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

export const canPlaceEmoji = (position, oldestPosition, isPlacing4th) => {
  if (isPlacing4th && position === oldestPosition) {
    return false;
  }
  return true;
};