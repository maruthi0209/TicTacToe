import React from 'react';
import GameCell from '../GameCell/GameCell';
import './GameBoard.css';

const GameBoard = ({ 
  board, 
  winningLine, 
  onCellClick, 
  gamePhase, 
  winner 
}) => {
  return (
    <div className="row justify-content-center mb-4">
      <div className="col-12 col-sm-8 col-md-6">
        <div className="card bg-white border-0 rounded-4 shadow-lg p-3">
          <div className="row g-2">
            {board.map((cell, index) => (
              <GameCell
                key={index}
                cell={cell}
                index={index}
                isWinningCell={winningLine.includes(index)}
                onClick={onCellClick}
                disabled={gamePhase !== 'playing' || winner}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;