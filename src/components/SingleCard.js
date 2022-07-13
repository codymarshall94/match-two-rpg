import React from "react";

const RenderCard = ({ card, cardsFlipped, cardsCorrect, index }) => {
  return (
    <div className={
      cardsFlipped.includes(index) || cardsCorrect.includes(index) ? "card-tile" : "flip-card card-tile"
    }>
      <div className="flip-card-inner">
      <div className="flip-card-back">
          <img
            className="card-img"
            src={require("../card-fronts/card-random.png")}
            alt="card back"
          />
        </div>
        <div className="flip-card-front">
          <img className="card-img" src={card.front} alt="Avatar" />
        </div>
      </div>
    </div>

    //backup plan below =======
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
  playerTurn,
  index,
}) {
  return (
    <>
      {cards.map((card, index) => (
        <div className={!playerTurn || cardsFlipped.length === 2 ? "disabled-card" : ""} key={index} onClick={() => handleCardClick(index)}>
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
