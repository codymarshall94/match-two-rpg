import React, { useRef } from "react";

const RenderCard = ({ card, index, cardsFlipped, cardsMatchedRef}) => {
  const activeCardsRef = useRef([]);
  activeCardsRef.current = cardsFlipped.map(card => card.cardItem.index);
  return (
    <div className={
     activeCardsRef.current.includes(index) || cardsMatchedRef.current.includes(index) ? "card-tile" : "flip-card card-tile"
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
  );
};

function SingleCard({
  handleCardClick,
  cardsFlipped,
  cardsMatchedRef,
  playerTurn,
  cards,
}) 
{
  return (
    <>
      {cards.map((card, index) => (
        <div className={!playerTurn || cardsFlipped.length === 2 ? "disabled-card" : ""} key={index} onClick={() => handleCardClick({card, index})}>
          <RenderCard
            card={card}
            index={index}
            cardsFlipped={cardsFlipped}
            cardsMatchedRef={cardsMatchedRef}
          />
        </div>
      ))}
    </>
  );
}

export default SingleCard;
