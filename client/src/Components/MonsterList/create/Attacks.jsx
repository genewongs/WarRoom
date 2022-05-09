/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import CSS from './css';

const Attacks = function Attacks({ obj, deleteAttack, index }) {
  return (
    <div>
      <CSS.Close onClick={() => deleteAttack(index - 1)}><div>X</div></CSS.Close>
      <CSS.DivInputs>
        Name:&nbsp;
        <CSS.Input type="text" id="nickname" maxLength="60" placeholder="Quick slash" />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Attack:&nbsp;
        <CSS.Input type="text" id="Attack" maxLength="60" placeholder="1d20 + 6" />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Strikes:&nbsp;
        <CSS.Input type="number" id="Strikes" maxLength="60" placeholder="2" />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Damage:&nbsp;
        <CSS.Input type="text" id="Damage" maxLength="60" placeholder="Example: 2d6 + 3" />
      </CSS.DivInputs>
    </div>
  );
};

export default Attacks;
