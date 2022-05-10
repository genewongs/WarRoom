import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../UserContext';
import List from './List';
import Create from './Create';
import Details from './Details';
import sampleArray from '../../exampleData/data';
import { getUsers, addUserMonster } from '../../firebase-config';

const MonsterListContainer = styled.div`
  flex-grow: 1;
  display: flex;
  background-color: #0000009d;
  flex-direction: column;
  border-radius: 10px;
  width: 23%;
  margin-bottom: 20px;

  & .activeTab {
    background-color: #465b82c9;
  }

  & .buttons-container {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    button:nth-child(1) {
      border-radius: 10px 0px 0px 0px;
      border-right: 1px solid black;
    }
    button:nth-child(3) {
      border-radius: 0px 10px 0px 0px;
      border-left: 1px solid black;
    }
  }
`;

const MainButtons = styled.button`
  width: 33.333333%;
  height: 40px;
  background-color: #1e242eeb;
  justify-content: center;
  font-size: 1rem;
  text-shadow: 2px 2px 2px black;
  color: white;
  border: none;
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover {
    background: #465b82c9;
    color: white;
  }
  &:active {
    color: #FFD4CD;
  };
`;
const ClickedButtons = styled.button`
  width: 33.333333%;
  height: 40px;
  background-color: #15b151;
  justify-content: center;
  font-size: 1rem;
  text-shadow: 2px 2px 2px black;
  color: white;
  border: none;
  cursor: pointer;
  transition-duration: 0.2s;
  &:active {
    color: #FFD4CD;
  };
  `;
function MonsterList() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [monster, setMonster] = useState(sampleArray.Zelroth[0]);
  const [render, setRender] = useState('List');
  const userId = currentUser ? currentUser.uid : '';
  const userName = currentUser.displayName;
  // if (userName !== undefined) {
  //   console.log('get data in monster get request', getUsers(userName));
  // }

  // let example= {
  //   userID: '5CGsEVgEq6PxwmXrwuevlnB86Qy1',
  //   userName: 'elliot123',
  //   name: 'Prest',
  //   description: 'level 68 paladin',
  //   maxHealth: 13,
  //   currentHealth: 13,
  //   armor: 15,
  //   movement: 35,
  //   attacks: [
  //     {
  //       attackName: 'Flying squirrels',
  //       attack: '2d6 + 5',
  //       multiplier: 4,
  //       damage: '1d20 + 0',
  //     },
  //     {
  //       attackName: 'quick attack',
  //       attack: '1d20 + 6',
  //       multiplier: 2,
  //       damage: '2d4 + 4',
  //     },
  //   ],
  //   onBoard: true,
  //   locationX: 2,
  //   locationY: 3,
  //   image: './assets/monsters/icons/ironMage.jpg',
  // };
  // if (userName !== undefined) {
  //   console.log('add monster');
  //   addUserMonster(userName, example)
  //   .then(console.log('data has been added'));
  // }

  function renderComponent() {
    if (render === 'List') {
      return <List setMonster={setMonster} setRender={setRender} />;
    }
    if (render === 'Create') {
      return <Create />;
    }
    return <Details monster={monster} />;
  };
  return (
    <MonsterListContainer>
      <div className="buttons-container">
        <MainButtons
          className={render === 'List' ? 'activeTab' : ''}
          type="button"
          name="List"
          onClick={() => {
            setRender('List');
          }}
        >
          List
        </MainButtons>
        <MainButtons
          className={render === 'Create' ? 'activeTab' : ''}
          type="button"
          name="Create"
          onClick={() => {
            setRender('Create');
          }}
        >
          Create
        </MainButtons>
        <MainButtons
          className={render === 'Details' ? 'activeTab' : ''}
          type="button"
          name="Details"
          onClick={() => {
            setRender('Details');
          }}
        >
          Details
        </MainButtons>
      </div>
      {renderComponent()}
    </MonsterListContainer>
  );
}

export default MonsterList;
