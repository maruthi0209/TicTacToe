import React from 'react';
import './GameCell.css';

const GameCell = ({ 
  cell, 
  index, 
  isWinningCell, 
  onClick, 
  disabled 
}) => {
  return (
    <div className="col-4">
      <button
        className={`btn w-100 h-100 border-2 rounded-3 position-relative game-cell ${
          isWinningCell 
            ? 'btn-warning border-warning shadow-lg winning-cell' 
            : 'btn-outline-secondary'
        }`}
        onClick={() => onClick(index)}
        disabled={disabled}
      >
        {cell && (
          <span 
            className="d-block emoji-animation"
          >
            {cell.emoji}
          </span>
        )}
      </button>
    </div>
  );
};

export default GameCell;