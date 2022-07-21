import React from "react";
import DamageCounter from "./DamageCounter";

function PlayerDisplay({playerHealthRef}) {

  return (
    <div className="container player-container">
      <div className="player-icon-container">
        <img
          className="player-icon"
          src={require("../player/kenku-head.png")}
          alt=""
        />
        <DamageCounter/>
      </div>
      <div className="player-name">Player</div>
      <div className="container progress-container">
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{width: `${playerHealthRef.current * 10}%`}}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          >{playerHealthRef.current}</div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDisplay;
