import React from "react";
import "../css/playerenemydisplay.css";

function PlayerDisplay() {

  return (
    <div className="container player-container">
      <div className="player-icon-container">
        <img
          className="player-icon"
          src={require("../player/kenku-head.png")}
          alt=""
        />
      </div>
      <div className="player-name">Player</div>
      <div className="progress-container">
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{width: 10}}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDisplay;
