import React from "react";

const RenderCard = ({ card, cardsFlipped, cardsCorrect, index, selectedCardIndexes, correctCardIndexes }) => {

  return (
    <div className={
     selectedCardIndexes.includes(index) || correctCardIndexes.includes(index) ? "card-tile" : "flip-card card-tile"
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
  cards,
  cardsFlipped,
  cardsCorrect,
  playerTurn,
  selectedCardIndexes,
  correctCardIndexes,
}) 
{
  return (
    <>
      {cards.map((card, index) => (
        <div className={!playerTurn || cardsFlipped.length === 2 ? "disabled-card" : ""} key={index} onClick={() => handleCardClick({card, index})}>
          <RenderCard
            card={card}
            cardsFlipped={cardsFlipped}
            cardsCorrect={cardsCorrect}
            index={index}
            selectedCardIndexes={selectedCardIndexes}
            correctCardIndexes={correctCardIndexes}
          />
        </div>
      ))}
    </>
  );
}

export default SingleCard;
