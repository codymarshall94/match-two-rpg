import React from "react";

const RenderCard = ({ card, cardsFlipped, cardsCorrect, index }) => {
  return (
    <div className={
      cardsFlipped.includes(index) || cardsCorrect.includes(index) ? "card-tile" : "flip-card card-tile"
    }>
      <div class="flip-card-inner">
      <div class="flip-card-back">
          <img
            className="card-img"
            src={require("../card-fronts/card-random.png")}
            alt="card back"
          />
        </div>
        <div class="flip-card-front">
          <img className="card-img" src={card.front} alt="Avatar" />
        </div>
      </div>
    </div>

    //backup plan

    /*
    <div
      className={
        cardsFlipped.includes(index) ? "card-tile card-flip" : "card-tile"
      }
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
    </div> */
  );
};

function SingleCard({
  handleCardClick,
  cards,
  cardsFlipped,
  cardsCorrect,
  index,
}) {
  return (
    <>
      {cards.map((card, index) => (
        <div key={index} onClick={() => handleCardClick(index)}>
          <RenderCard
            card={card}
            cardsFlipped={cardsFlipped}
            cardsCorrect={cardsCorrect}
            index={index}
          />
        </div>
      ))}
    </>
  );
}

export default SingleCard;
