import React from "react";

function Moves({ turn }) {
  return (
    <div className="moves-container">
      <div className="shield">
        <div className="turn-number">
          <span>{turn}</span>
        </div>
        <div className="turn-text">
          <span>Turn</span>
        </div>
      </div>
    </div>
  );
}

export default Moves;
