import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { CARDS } from "./cards";
import SingleCard from "./components/SingleCard";

//start game with all cards flipped upside down
//allow player to select a card and flip upright
//select a second card and check to see if they match
// if they dont match, flip both back down, if they do match they remain up

function App() {
  const [cards, setCards] = useState(
    CARDS.concat(CARDS).sort(() => Math.random() - 0.5)
  );
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [cardsCorrect, setCardsCorrect] = useState([]);
  const timeout = useRef(null);

  const handleCardClick = (cardIndex) => {
    // Have a maximum of 2 items in array at once.
    if (cardsFlipped.length === 1) {
      setCardsFlipped((prev) => [...prev, cardIndex]);
    } else {
      // If two cards are already open, we cancel timeout set for flipping cards back
      clearTimeout(timeout.current);
      setCardsFlipped([cardIndex]);
    }
  };

  //everytime 2 cards are flipped they are evaluated
  const evaluate = () => {
    const [first, second] = cardsFlipped; //using the destructured array as a way of searching cards array
    if (cards[first].name === cards[second].name) {
      setCardsCorrect((prev) => [...prev, first, second]);
    }
    timeout.current = setTimeout(() => {
      setCardsFlipped([]);
    }, 500);
    checkCompletion();
  };

  //checking completion everytime a pair is evaluated
  const checkCompletion = () => {
    if (cards.length === cardsCorrect.length) {
      console.log("you win");
    }
  };

  useEffect(() => {
    if (cardsFlipped.length === 2) {
      setTimeout(evaluate, 500);
    }
  }, [cardsFlipped]);

  return (
    <div className="app-container">
      <div className="card-grid">
          <SingleCard
            handleCardClick={handleCardClick}
            cardsFlipped={cardsFlipped}
            cardsCorrect={cardsCorrect}
            cards={cards}
          />
      </div>
    </div>
  );
}

export default App;
