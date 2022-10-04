import React from 'react';
import "../css/combatlog.css";

function CombatLog({combatLog}) {

  return (
    <div className='log-box'>
        <span className='combat-text'>{combatLog}</span>
    </div>
  )
}

export default CombatLog