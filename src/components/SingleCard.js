import React from "react";

function SingleCard({ handleCardClick, cardsFlipped, cardsCorrect, cards }) {
  return (
    <div className="row">
      {cards.map((card, index) => (
        <div
          key={index}
          className="col-4 card"
          onClick={() => handleCardClick(index)}
        >
          {cardsFlipped.includes(index) || cardsCorrect.includes(index) ? (
            <img className="card-img" src={card.front} alt="card front" />
          ) : (
            <img
              className="card-img"
              src={require("../card-fronts/card-random.png")}
              alt="card back"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SingleCard;
