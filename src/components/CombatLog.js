import React from 'react';


function CombatLog({cardsCorrectRef}) {
  let currentEffect;
  if(cardsCorrectRef.current.length >= 1) {
    currentEffect = cardsCorrectRef.current[cardsCorrectRef.current.length - 1].cardItem.card.effect || cardsCorrectRef.current[cardsCorrectRef.current.length - 1].cardItem.enemyFirst.effect;
  }
  return (
    <div className='log-box'>
        {currentEffect !== undefined ? <span className='combat-text'>{currentEffect}</span> : null}
    </div>
  )
}

//{cards[currentEffect].cardItem.card.effect.charAt(0).toUpperCase() + cards[currentEffect].cardItem.card.effect.slice(1)}

export default CombatLog