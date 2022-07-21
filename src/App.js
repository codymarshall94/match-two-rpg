import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { CARDS } from "./cards";
import CombatLog from "./components/CombatLog";
import EnemyDisplay from "./components/EnemyDisplay";
import Moves from "./components/Moves";
import PlayerDisplay from "./components/PlayerDisplay";
import SingleCard from "./components/SingleCard";

function App() {
  const [cards, setCards] = useState(
    CARDS.concat(CARDS).sort(() => Math.random() - 0.5)
  );
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [cardsMatched, setCardsMatched] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [turn, setTurn] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(10);
  const [enemyHealth, setEnemyHealth] = useState(10);
  const turnRef = useRef(1);
  const timeout = useRef(null);
  const cardsMatchedRef = useRef([]);
  const playerHealthRef = useRef(10);
  const enemyHealthRef = useRef(10);
  enemyHealthRef.current = enemyHealth;
  playerHealthRef.current = playerHealth;

  const handleCardClick = (cardItem) => {
    setCardsFlipped((prev) => [...prev, cardItem]);
  };

  useEffect(() => {
    if (cardsFlipped.length === 2) {
      setTimeout(() => evaluate(), 500);
    }
  }, [cardsFlipped]);

  //everytime 2 cards are flipped they are evaluated
  const evaluate = async () => {
    const [first, second] = cardsFlipped; //using the destructured array as a way of searching cards array
    if (cards[first.index].name === cards[second.index].name) {
      setCardsMatched((prev) => [...prev, first, second]);
    }
    checkCompletion();
    timeout.current = setTimeout(() => {
      setCardsFlipped([]);
      setTurn((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    cardsMatchedRef.current = cardsMatched;
    let cardNames = cardsMatchedRef.current.map((c) => c.card.name);
    let cardsUnflipped = cards.map((card, index) => {
      let newCardObj = { card, index };
      return newCardObj;
    });
    let cardsUnflippedFiltered = cardsUnflipped.filter(
      (c) => !cardNames.includes(c.card.name)
    );
    setAvailableCards(cardsUnflippedFiltered);
    dealDamage();
  }, [cardsMatched, cards]);

  //setting up a turn phase
  useEffect(() => {
    turnRef.current = turn;
    if (turnRef.current % 2 === 0) {
      setPlayerTurn(false);
      enemyTurn();
    } else {
      setPlayerTurn(true);
    }
  }, [turn]);

  const enemyTurn = () => {
    let enemySelections = [];
    while (enemySelections.length === 0) {
      let random = Math.floor(Math.random() * (availableCards.length - 0) + 0);
      let randomTwo = Math.floor(
        Math.random() * (availableCards.length - 0) + 0
      );
      if (random !== randomTwo) {
        enemySelections.push(random, randomTwo);
      }
    }
    setTimeout(() => {
      const enemyFirst = availableCards[enemySelections[0]];
      handleCardClick(enemyFirst);
    }, 1000);
    setTimeout(() => {
      const enemySecond = availableCards[enemySelections[1]];
      handleCardClick(enemySecond);
    }, 2000);
  };

  //function will only be called if a match is made
  const dealDamage = () => {
    if (cardsMatchedRef.current.length !== 0) {
      let damageTaken = cardsMatched[cardsMatched.length - 1].card.damage;
      if (playerTurn) {
        setEnemyHealth(enemyHealth - damageTaken);
      } else {
        setPlayerHealth(playerHealth - damageTaken);
      }
    }
  };

  //checking completion everytime a pair is evaluated
  const checkCompletion = () => {
    if (enemyHealth <= 0 || playerHealth <= 0) {
      resetCards();
    }
    if (cards.length === cardsMatchedRef.current.length) {
      resetCards();
    }
  };

  const resetCards = () => {
    let initialCardsState = cards;
    setCards(initialCardsState);
    setPlayerHealth(10);
    setEnemyHealth(10);
    setTurn(1);
    setCardsMatched([]);
  };

  return (
    <div className="app-container">
      <CombatLog cards={cards} cardsMatched={cardsMatched} />
      <div className="card-grid">
        <SingleCard
          playerTurn={playerTurn}
          handleCardClick={handleCardClick}
          cardsFlipped={cardsFlipped}
          cardsMatchedRef={cardsMatchedRef}
          cards={cards}
        />
      </div>
      <Moves turn={turn} />
      <div className="current-turn">
        {playerTurn === true ? (
          <span>Player Turn</span>
        ) : (
          <span>Enemy Turn</span>
        )}
      </div>
      <PlayerDisplay playerHealthRef={playerHealthRef} />
      <EnemyDisplay enemyHealthRef={enemyHealthRef} />
    </div>
  );
}

export default App;
