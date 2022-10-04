import React, { useEffect, useState } from "react";
import "./App.css";
import { CARDS } from "./cards";
import CardGrid from "./components/CardGrid";
import CombatLog from "./components/CombatLog";
import PlayerDisplay from "./components/PlayerDisplay";
import EnemyDisplay from "./components/EnemyDisplay";
import TurnCount from "./components/TurnCount";

function App() {
  const [cards, setCards] = useState([]);
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [cardsMatched, setCardsMatched] = useState([]);
  const [turn, setTurn] = useState(1);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerHealth, setPlayerHealth] = useState(10);
  const [enemyHealth, setEnemyHealth] = useState(10);
  const [combatLog, setCombatLog] = useState("Select 2 Cards!");
  const unflippedCards = cards.filter((card) => !cardsMatched.includes(card));

  //sort the cards on the first render
  useEffect(() => {
    setCards(CARDS.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = ({ card, index }) => {
    setCardsFlipped([...cardsFlipped, { card, index }]);
  };

  // this useEffect is called when the cardsFlipped array changes (when a card is clicked)
  useEffect(() => {
    if (cardsFlipped.length === 2) {
      const firstCard = cardsFlipped[0];
      const secondCard = cardsFlipped[1];
      const damage = firstCard.card.damage;

      if (firstCard.card.name === secondCard.card.name) {
        setCardsMatched((prev) => [...prev, firstCard, secondCard]);
        setCombatLog(() => `${firstCard.card.effect}!`);
        setTimeout(() => {
          dealDamage(damage);
        }, 1000);

        setTimeout(() => {
          setCardsFlipped([]);
        }, 3000);

        setTimeout(() => {
          setTurn((prev) => prev + 1);
        }, 4000);
      } else {
        setTimeout(() => {
          setCardsFlipped([]);
        }, 1000);

        setTimeout(() => {
          setTurn((prev) => prev + 1);
        }, 2000);
      }
    }
  }, [cardsFlipped]);

  //deals damage to player or enemy is a match is made
  const dealDamage = (damageAmount) => {
    if (playerTurn === true) {
      setEnemyHealth((prev) => prev - damageAmount);
      console.log(damageAmount);
    } else {
      setPlayerHealth((prev) => prev - damageAmount);
    }
  };

  //this useeffect is called when the turn changes
  useEffect(() => {
    if (turn % 2 === 0) {
      setPlayerTurn(false);
      setCombatLog(() => "Enemy Turn");
      setTimeout(() => {
        enemyTurn();
      }, 100);
    } else {
      setPlayerTurn(true);
      setCombatLog(() => "Player Turn");
    }
  }, [turn]);

  const enemyTurn = () => {
    //2 random cards from the unflipped cards but the both cards cannot be the same
    const randomCards = [
      unflippedCards[Math.floor(Math.random() * unflippedCards.length)],
      unflippedCards[Math.floor(Math.random() * unflippedCards.length)],
    ];
    //if the cards are the same, enemy picks a new card
    if (randomCards[0] === randomCards[1]) {
      randomCards[1] =
        unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
    }
    //destructure the array
    const [firstCard, secondCard] = randomCards;
    const firstCardIndex = cards.indexOf(firstCard);
    const secondCardIndex = cards.indexOf(secondCard);

    const enemyCardObj = { card: firstCard, index: firstCardIndex };
    const enemyCardObj2 = { card: secondCard, index: secondCardIndex };
    setTimeout(() => setCardsFlipped((prev) => [...prev, enemyCardObj]), 1000);
    setTimeout(() => setCardsFlipped((prev) => [...prev, enemyCardObj2]), 2000);
  };

  //check to see if the game is over
  useEffect(() => {
    if (
      cardsMatched.length === cards.length ||
      playerHealth <= 0 ||
      enemyHealth <= 0
    ) {
      resetGame();
    }
  }, [cardsMatched, cards, playerHealth, enemyHealth]);

  //reset the game
  const resetGame = () => {
    setCards(CARDS.sort(() => Math.random() - 0.5));
    setCardsFlipped([]);
    setCardsMatched([]);
    setTurn(1);
    setPlayerTurn(true);
  };

  return (
    <div className="app-container">
      <CombatLog combatLog={combatLog} />
      <CardGrid
        cards={cards}
        setCards={setCards}
        handleCardClick={handleCardClick}
        cardsFlipped={cardsFlipped}
        cardsMatched={cardsMatched}
        playerTurn={playerTurn}
      />
      <TurnCount turn={turn} playerTurn={playerTurn} />
      <PlayerDisplay playerHealth={playerHealth} />
      <EnemyDisplay enemyHealth={enemyHealth} />
    </div>
  );
}

export default App;
