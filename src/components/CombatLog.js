import React from 'react'

function CombatLog({cardsCorrect}) {
  return (
    <div className='log-box'>
        {cardsCorrect.length - 1 !== null ? <span>{cardsCorrect[cardsCorrect.length -1].effect}</span> : null}
    </div>
  )
}

export default CombatLog