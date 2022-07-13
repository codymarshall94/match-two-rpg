import React from 'react'

function CombatLog({cardsCorrect, cards}) {
let currentEffect = cardsCorrect[cardsCorrect.length - 1];
console.log(currentEffect);

  return (
    <div className='log-box'>
        {cardsCorrect && currentEffect ? <span className='combat-text'>{cards[currentEffect].effect.charAt(0).toUpperCase() + cards[currentEffect].effect.slice(1)}</span> : null}
    </div>
  )
}

export default CombatLog