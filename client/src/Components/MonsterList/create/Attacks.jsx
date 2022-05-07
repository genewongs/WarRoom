import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Close = styled.div`
display: flex;
justify-content: flex-end;
width: 17vw;
`;
const Input = styled.textarea`
  height: 12px;
  padding: 0.5em;
  border-width: 1px;
  border-style: inset;
  border-color: #a6de0b;
  border-radius: 3px;
  width: 50%;
  margin-bottom: 0.5em;
  margin-left: 2px;
  box-shadow: 0 5px 5px rgba(17, 16, 62, 0.1);
  ::placeholder {
    color: #6e0d15;
  }
`;
const DivInputs = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Attacks = function Attacks({ obj, deleteAttack, index }) {
  return (
    <div>
      <Close onClick={() => deleteAttack(index)}><div>X</div></Close>
      <DivInputs>
        Name:&nbsp;
        <Input type="text" id="nickname" maxLength="60" placeholder="Quick slash" />
      </DivInputs>
      <DivInputs>
        Attack:&nbsp;
        <Input type="text" id="Attack" maxLength="60" placeholder="1d20 + 6" />
      </DivInputs>
      <DivInputs>
        Strikes:&nbsp;
        <Input type="number" id="Strikes" maxLength="60" placeholder="2" />
      </DivInputs>
      <DivInputs>
        Damage:&nbsp;
        <Input type="text" id="Damage" maxLength="60" placeholder="Example: 2d6 + 3" />
      </DivInputs>
    </div>
  );
};

export default Attacks;
