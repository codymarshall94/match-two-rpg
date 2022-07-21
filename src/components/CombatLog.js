import React from 'react';

function CombatLog({cardsMatched}) {
  let currentEffect;
 if(cardsMatched.length >= 1) {
  currentEffect = cardsMatched[cardsMatched.length - 1].card.effect;
 }
  return (
    <div className='log-box'>
        {currentEffect !== undefined ? <span className='combat-text'>{currentEffect}</span> : null}
    </div>
  )
}
//{cards[currentEffect].cardItem.card.effect.charAt(0).toUpperCase() + cards[currentEffect].cardItem.card.effect.slice(1)}

export default CombatLog