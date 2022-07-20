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
  //let damageTaken; //setting this variable so i can return it from the if statement in dealDamage()
  const turnRef = useRef(1);
  const timeout = useRef(null);
  const cardsMatchedRef = useRef([]);

  useEffect(() => {
    cardsMatchedRef.current = cardsMatched;
  }, [cardsMatched])
  
  
  const handleCardClick = (cardItem) => {
    setCardsFlipped((prev) => [...prev, { cardItem }]);
  };

 /*const availableCard = () => {
  let cardsUnflipped  = cards.map((card, index) => index);
  let newCardsUnflipped = cardsUnflipped.filter((item) => !cardsCorrectRef.current.includes(item))
  setAvailableCards(newCardsUnflipped);
 } */

  useEffect(() => {
    if (cardsFlipped.length === 2) {
      setTimeout(evaluate, 500);
    }
    // eslint-disable-next-line
  }, [cardsFlipped]);

  //everytime 2 cards are flipped they are evaluated
  const evaluate = () => {
    const [first, second] = cardsFlipped; //using the destructured array as a way of searching cards array
    if (
      cards[first.cardItem.index].name === cards[second.cardItem.index].name
    ) {
      setCardsMatched(prev => [...prev, first.cardItem.index, second.cardItem.index]);
    };
    //checkCompletion();
    timeout.current = setTimeout(() => {
      setCardsFlipped([]);
      setTurn((prev) => prev + 1);
    }, 500);
  };

  /*
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
*/

//setting up a turn phase NEWCODE =============
 useEffect(() => {
  turnRef.current = turn;
  if(turnRef.current % 2 === 0) {
    setPlayerTurn(false);
    enemyTurn();
  } else {
    setPlayerTurn(true);
  }
 },[turn])


  const enemyTurn = () => {
    const randomIndex = Math.floor(Math.random() * (availableCards.length - 0) + 0);
    const randomIndexTwo = Math.floor(Math.random() * (availableCards.length - 0) + 0);
    setTimeout(() => {
      const enemyFirst = cards[randomIndex];
      handleCardClick({ card: enemyFirst, index: randomIndex });
    }, 1000);
    setTimeout(() => {
      const enemySecond = cards[randomIndexTwo];
      handleCardClick({ card: enemySecond, index: randomIndexTwo });
    }, 2000);
  };

  /*
  //function will only be called if a match is made
  const dealDamage = () => {
    damageTaken = cards[cardsCorrectRef.current.length - 1].damage;
    console.log(damageTaken);
    if (playerTurn) {
      setEnemyHealth(enemyHealth - damageTaken);
    } else {
      setPlayerHealth(playerHealth - damageTaken);
    }
  }; */

  //checking completion everytime a pair is evaluated
  /*const checkCompletion = () => {
    if (cards.length === correctCardIndexes.length) {
      resetCards();
    }
  }; 

  const resetCards = () => {
    setCards(null);
  };*/

  return (
    <div className="app-container">
      {/*<CombatLog
        cards={cards}
        cardsCorrectRef={cardsCorrectRef}
  />*/}
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
      <PlayerDisplay
        playerHealth={playerHealth}
      />
      <EnemyDisplay enemyHealth={enemyHealth} />
    </div>
  );
}

export default App;
