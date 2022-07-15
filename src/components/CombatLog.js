import React from 'react';


function CombatLog({cardsCorrect, cards}) {
  let currentEffect;

  if(cardsCorrect.length >= 1) {
    currentEffect = cardsCorrect[cardsCorrect.length - 1].cardItem.card.effect || cardsCorrect[cardsCorrect.length - 1].cardItem.enemyFirst.effect;
  }
  
  return (
    <div className='log-box'>
        {currentEffect !== undefined ? <span className='combat-text'>{currentEffect}</span> : null}
    </div>
  )
}

//{cards[currentEffect].cardItem.card.effect.charAt(0).toUpperCase() + cards[currentEffect].cardItem.card.effect.slice(1)}

export default CombatLog