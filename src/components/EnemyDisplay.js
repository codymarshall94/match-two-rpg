import React from 'react';
import "../css/playerenemydisplay.css";

function EnemyDisplay({enemyHealth}) {
  return (
    <div className="container enemy-container">
      <div className="enemy-icon-container">
        <img
          className="player-icon"
          src={require("../enemy/drakkar-dragon.png")}
          alt=""
        />
      </div>
      <div className="enemy-name">Enemy</div>
      <div className="container progress-container">
        <div className="progress">
          <div
            className="progress-bar"
            style={{width: `${enemyHealth * 10}%`}}
            role="progressbar"
            aria-valuenow={enemyHealth * 10} 
            aria-valuemin="0"
            aria-valuemax="100"
          >{enemyHealth}</div>
        </div>
      </div>
    </div>
  )
}

export default EnemyDisplay