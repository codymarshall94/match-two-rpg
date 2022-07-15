import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { CARDS } from "./cards";
import CombatLog from "./components/CombatLog";
import EnemyDisplay from "./components/EnemyDisplay";
import Moves from "./components/Moves";
import PlayerDisplay from "./components/PlayerDisplay";
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
  const [selectedCardIndexes, setSelectedCardIndexes] = useState([]); //using this to easily get indexes to flip cards
  const [correctCardIndexes, setCorrectCardIndexes] = useState([]); //same reason as selectedCardIndexes
  const [cardsCorrect, setCardsCorrect] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [turn, setTurn] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(10);
  const [enemyHealth, setEnemyHealth] = useState(10);
  const timeout = useRef(null);
  let damageTaken;

  const handleCardClick = (cardItem) => {
    setCardsFlipped((prev) => [...prev, { cardItem }]);
    setSelectedCardIndexes((prev) => [...prev, cardItem.index]);
  };

  useEffect(() => {
    if (cardsFlipped.length === 2) {
      setTimeout(evaluate, 500);
    }
    // eslint-disable-next-line
  }, [cardsFlipped]);

  //everytime 2 cards are flipped they are evaluated
  const evaluate = () => {
    const [first, second] = cardsFlipped; //using the destructured array as a way of searching cards array
    console.log(first);
    if (
      cards[first.cardItem.index].name === cards[second.cardItem.index].name
    ) {
      setCardsCorrect((prev) => [...prev, first, second]);
      setCorrectCardIndexes((prev) => [
        ...prev,
        first.cardItem.index,
        second.cardItem.index,
      ]);
      dealDamage();
    }
    timeout.current = setTimeout(() => {
      setCardsFlipped([]);
      setSelectedCardIndexes([]);
    }, 500);
    checkCompletion();
    changeTurn();
  };

  //setting the turn between enemy and player
  const changeTurn = () => {
    setTimeout(() => {
      setTurn(turn + 1);
      turn % 2 === 0 ? setPlayerTurn(true) : setPlayerTurn(false);
    }, 500);
    if (playerTurn) {
      //currently working with playerTurn set to positive. need to figure out why
      setTimeout(enemyTurn, 1000);
    }
  };

  const enemyTurn = () => {
    const randomIndex = Math.floor(Math.random() * (cards.length - 0) + 0);
    const randomIndexTwo = Math.floor(Math.random() * (cards.length - 0) + 0);
    setTimeout(() => {
      const enemyFirst = cards[randomIndex];
      handleCardClick({ card: enemyFirst, index: randomIndex });
    }, 500);
    setTimeout(() => {
      const enemySecond = cards[randomIndexTwo];
      handleCardClick({ card: enemySecond, index: randomIndexTwo });
    }, 1500);
  };

  //function will only be called if a match is made
  const dealDamage = () => {
    damageTaken = cardsCorrect[cardsCorrect.length - 1].cardItem.card.damage;
    console.log(damageTaken);
    if (playerTurn) {
      setEnemyHealth(enemyHealth - damageTaken);
    } else {
      setPlayerHealth(playerHealth - damageTaken);
    }
  };

  //checking completion everytime a pair is evaluated
  const checkCompletion = () => {
    if (cards.length === cardsCorrect.length) {
      resetCards();
    }
  };

  const resetCards = () => {
    setCards(null);
  };

  return (
    <div className="app-container">
      <CombatLog cardsCorrect={cardsCorrect} cards={cards} />
      <div className="card-grid">
        <SingleCard
          selectedCardIndexes={selectedCardIndexes}
          correctCardIndexes={correctCardIndexes}
          playerTurn={playerTurn}
          handleCardClick={handleCardClick}
          cardsFlipped={cardsFlipped}
          cardsCorrect={cardsCorrect}
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
      <PlayerDisplay playerHealth={playerHealth} />
      <EnemyDisplay enemyHealth={enemyHealth} />
    </div>
  );
}

export default App;
