//import { useState } from 'react';
import './App.css';
import GameGrid from './components/gameGrid';

//start game with all cards flipped upside down
//allow player to select a card and flip upright
//select a second card and check to see if they match
// if they dont match, flip both back down, if they do match they remain up

function App() {
  

  return (
    <div className="App">
     <GameGrid />
    </div>
  );
}

export default App;
