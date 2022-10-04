import React from "react";
import "../css/singlecard.css";

function SingleCard({ card, cardsFlipped, cardsMatched, index }) {
  let flippedCardIndexes = [];
  let cardsMatchedIndexes = [];

  cardsFlipped.forEach((card) => {
    flippedCardIndexes.push(card.index);
  });

  cardsMatched.forEach((card) => {
    cardsMatchedIndexes.push(card.index);
  });

  return (
    <div
      className={
        flippedCardIndexes.includes(index) || cardsMatchedIndexes.includes(index)
          ? "card-tile"
          : " flip-card card-tile"
      }
    >
      <div className="flip-card-inner">
        <div className="flip-card-back">
          <img
            className="card-img"
            src={require("../card-fronts/card-random.png")}
            alt="card back"
          />
        </div>
        <div className="flip-card-front">
          <img className="card-img" src={card.card.front} alt="Avatar" />
        </div>
      </div>
    </div>
  );
}

export default SingleCard;

/*

*/
