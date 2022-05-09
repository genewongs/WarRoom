/* eslint-disable react/prop-types */
import React from 'react';
import CSS from './css';

const Attacks = function Attacks({ setAttack, deleteAttack, count }) {
  return (
    <div>
      <CSS.Close onClick={() => deleteAttack(count - 1)}><div>X</div></CSS.Close>
      <CSS.DivInputs>
        Name:&nbsp;
        <CSS.Input type="text" id="nickname" maxLength="60" placeholder="Example: Stab" onChange={(e) => setAttack(count, 'attackName', e.target.value)} />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Attack:&nbsp;
        <CSS.Input type="text" id="Attack" maxLength="60" placeholder="Example: 1d20 + 6" onChange={(e) => setAttack(count, 'attack', e.target.value)} />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Strikes:&nbsp;
        <CSS.Input type="number" id="Strikes" maxLength="60" placeholder="0" onChange={(e) => setAttack(count, 'multiplier', e.target.value)} />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Damage:&nbsp;
        <CSS.Input type="text" id="Damage" maxLength="60" placeholder="Example: 2d6 + 3" onChange={(e) => setAttack(count, 'damage', e.target.value)} />
      </CSS.DivInputs>
    </div>
  );
};

export default Attacks;
