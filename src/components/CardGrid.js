import React from "react";
import "../css/cardgrid.css";
import SingleCard from "./SingleCard";

function CardGrid({ cards, handleCardClick, cardsFlipped, cardsMatched }) {
  return (
    <div className="container card-grid-container">
      <div className="row d-flex justify-content-center">
        {cards.map((card, index) => (
          <div
            className="col-4 col-lg-5 card-container"
            key={card.id}
            onClick={() => handleCardClick({ card, index})}
          >
            <SingleCard card={{card, index}} cardsFlipped={cardsFlipped} index={index} cardsMatched={cardsMatched}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
