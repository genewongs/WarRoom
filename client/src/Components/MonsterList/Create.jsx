import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icons from './create/Icons';
import Attacks from './create/Attacks';

const axios = require('axios');

const CreateContainer = styled.div`
  margin: 2% 1% 1%;
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  width: 95%;
  z-index: 100;
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

function Create() {
  const [iconArr, setIconArr] = useState(['Hero', 'ninja', 'skull', 'crusader', 'villian']);
  const [icon, setIcon] = useState('Hero');
  const [attackArr, setAttackArr] = useState([{
    attackName: 'none',
    attack: 'none',
    multiplier: 0,
    damage: 'none',
  }]);
  let count = 0;
  const addAttack = function addAttack() {
    attackArr.push({
      attackName: 'none',
      attack: 'none',
      multiplier: 0,
      damage: 'none',
    });
  };
  const deleteAttack = function deleteAttack(index) {
    attackArr.splice(index, 1);
  };
  return (
    <CreateContainer>
      <div>
        Name:&nbsp;
        <Input type="text" id="nickname" maxLength="60" placeholder="Example: skeleton" />
      </div>
      <div>
        Description:&nbsp;
        <Input type="text" id="Description" maxLength="1000" placeholder="Example: Level 3 fighter" />
      </div>
      <div>
        Icons:
        {iconArr.map((e) => (
          <Icons current={e} selected={icon} setIcon={setIcon} />
        ))}
      </div>
      <div>
        Stats
      </div>
      <div>
        Armor:&nbsp;
        <Input type="number" id="Armor" maxLength="60" placeholder="Example: 12" />
      </div>
      <div>
        Health:&nbsp;
        <Input type="number" id="Health" maxLength="60" placeholder="Example: 20" />
      </div>
      <div>
        Movement:&nbsp;
        <Input type="number" id="Movement" maxLength="60" placeholder="Example: 30" />
      </div>
      <div>
        Attacks
      </div>
      {attackArr.map((e) => {
        count += 1;
        return (
          <Attacks obj={e} deleteAttack={(index) => deleteAttack(index)} index={count} />
        );
      })}
      <div>
        <button type="button" onClick={() => addAttack()}>Add Attack</button>
      </div>
    </CreateContainer>
  );
}

export default Create;
