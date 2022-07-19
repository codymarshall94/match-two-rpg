import React from 'react';


function CombatLog({cardsCorrectRef, cards}) {
  let currentEffect;
  if(cardsCorrectRef.current.length >= 1) {
    currentEffect = cards[cardsCorrectRef.current.length - 1].effect || cards[cardsCorrectRef.current.length - 1].effect;
  }
  return (
    <div className='log-box'>
        {currentEffect !== undefined ? <span className='combat-text'>{currentEffect}</span> : null}
    </div>
  )
}

//{cards[currentEffect].cardItem.card.effect.charAt(0).toUpperCase() + cards[currentEffect].cardItem.card.effect.slice(1)}

export default CombatLog