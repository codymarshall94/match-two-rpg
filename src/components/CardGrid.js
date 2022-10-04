import React from "react";
import "../css/cardgrid.css";
import SingleCard from "./SingleCard";

function CardGrid({
  cards,
  handleCardClick,
  cardsFlipped,
  cardsMatched,
  playerTurn,
}) {
  return (
    <div className="container card-grid-container">
      <div className="row d-flex justify-content-center">
        {cards.map((card, index) => (
          <div
            //apply disabled class if player turn is false
            className={
              cardsFlipped.length === 2 || playerTurn === false
                ? "disabled-card col-4 col-lg-5 card-container "
                : "col-4 col-lg-5 card-container"
            }
            key={card.id}
            onClick={() => handleCardClick({ card, index })}
          >
            <SingleCard
              card={{ card, index }}
              cardsFlipped={cardsFlipped}
              index={index}
              cardsMatched={cardsMatched}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
