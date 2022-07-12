import React, {useEffect, useState} from "react";
import "../css/gamegrid.css";
import { CARDS } from "../cards";
import SingleCard from "./SingleCard";

function GameGrid() {
const [cards, setCards] = useState(CARDS.concat(CARDS).sort(() => Math.random() - 0.5));
const [choiceOne, setChoiceOne] = useState(null);
const [choiceTwo, setChoiceTwo] = useState(null);
const [cardsFlipped, setCardsFlipped] = useState([]);
const [cardsCorrect, setCardsCorrect] = useState([]);

const handleCardClick = (cardIndex) => {
    setCardsFlipped((prev) => [...prev, cardIndex]);
}

const evaluate = () => {
    const [first, second] = cardsFlipped;
    if(cards[first].name === cards[second].name) { //using the destructured array as a way of searching cards array
        setCardsCorrect((prev) => [...prev, first, second]);
        setCardsFlipped([]);
    } else {
        setCardsFlipped([]);
    }
    checkCompletion(); 
}

//checking completion everytime a pair is evaluated
const checkCompletion = () => { 
    if (cards.length === cardsCorrect.length) {
      alert("you win");
    }
  };

useEffect(() => {
    if(cardsFlipped.length === 2) {
        setTimeout(evaluate, 500);
    }
}, [cardsFlipped])

return (
<div className="container game-grid border">
    <SingleCard handleCardClick={handleCardClick} cardsFlipped={cardsFlipped} cardsCorrect={cardsCorrect} cards={cards}/>
</div>
);
}

export default GameGrid;
