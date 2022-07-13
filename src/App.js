import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { CARDS } from "./cards";
import CombatLog from "./components/CombatLog";
import Moves from "./components/Moves";
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
  const [playerTurn, setPlayerTurn] = useState(true);
  const [turn, setTurn] = useState(1);
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


  //setting the turn between enemy and player
  const changeTurn = () => {
    setTimeout(() => {
      setTurn(turn + 1);
      turn % 2 === 0 ? setPlayerTurn(true) : setPlayerTurn(false); 
    }, 500);
    if(playerTurn) { //currently working with playerTurn set to positive. need to figure out why
      setTimeout(enemyTurn , 1000);
    }
  }

  const enemyTurn = () => {
    setTimeout(() => {
      setCardsFlipped((prev) => [...prev, Math.floor(Math.random() * (cards.length - 0) + 0)]);//using delay on setting cards flipped for a delayed flip
    },500);
    setTimeout(() => {
      setCardsFlipped((prev) => [...prev, Math.floor(Math.random() * (cards.length - 0) + 0)]);
    },1500);
  }


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
    changeTurn();
  };

  //checking completion everytime a pair is evaluated
  const checkCompletion = () => {
    if (cards.length === cardsCorrect.length) {
      resetCards();
    }
  };

  const resetCards = () => {
    setCards(null);
  }

  useEffect(() => {
    if (cardsFlipped.length === 2) {
      setTimeout(evaluate, 500);
    }
  // eslint-disable-next-line
  }, [cardsFlipped]);

  return (
    <div className="app-container">
      <CombatLog cardsCorrect={cardsCorrect} cards={cards}/>
      <div className="card-grid">
        <SingleCard
          playerTurn={playerTurn}
          handleCardClick={handleCardClick}
          cardsFlipped={cardsFlipped}
          cardsCorrect={cardsCorrect}
          cards={cards}
        />
      </div>
      <Moves turn={turn}/>
      <div className="current-turn">{playerTurn === true ? <span>Player Turn</span> : <span>Enemy Turn</span>}</div>
    </div>
  );
}

export default App;
