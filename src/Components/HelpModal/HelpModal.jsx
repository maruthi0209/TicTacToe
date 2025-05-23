import React from 'react';
import './HelpModal.css';

const HelpModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block help-modal" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">🎮 How to Play Blink Tac Toe</h5>
            <button
              className="btn-close"
              onClick={onClose}
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
              onClick={onClose}
            >
              Got it! Let's Play! 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;