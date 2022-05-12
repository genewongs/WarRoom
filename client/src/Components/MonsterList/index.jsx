import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../UserContext';
import List from './List';
import Create from './Create';
import Details from './Details';
import sampleArray from '../../exampleData/data';
import { getUsers, addUserMonster } from '../../firebase-config';
import RoomContext from '../RoomContext';

const MonsterListContainer = styled.div`
  flex-grow: 1;
  display: flex;
  background-color: #0000009d;
  flex-direction: column;
  border-radius: 10px;
  width: 23%;
  height: 110%;
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
  font-family: 'Macondo', cursive !important;
  font-size: 1.2rem;
  text-shadow: 2px 2px 2px black;
  width: 33.333333%;
  height: 40px;
  justify-content: center;
  background-color: #1e242eeb;
  color: white;
  border: none;
  border-bottom: 1px solid black;
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

const Header = styled.div`
  font-size: large;
  text-align: center;
`;
const Overflow = styled.div`
  max-width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function MonsterList() {
  const { currentUser, userList } = useContext(UserContext);
  const { socket } = useContext(RoomContext);
  const [monster, setMonster] = useState({});
  const [change, setChange] = useState(false)
  const [monsterArr, setMonsterArr] = useState([]);
  const [render, setRender] = useState('List');
  const userId = currentUser ? currentUser.uid : '';
  const userName = currentUser.displayName;
  // add target dummy if user does not have any monsters
  useEffect(() => {
    socket.on('recieve_log_message', (data) => {
      setChange(!change)
    });
  });

  useEffect(() => {
    if (userName !== undefined) {
      // getUsers(userName)
      //   .then((data) => console.log('get data in monster get request', data))
      //   .catch((err) => console.log('ERROR get data in monster get request', err));
      const example = {
        userUID: currentUser.uid,
        userName: currentUser.displayName,
        name: 'taget dummy',
        description: 'level 1 target dummy',
        maxHealth: 1,
        currentHealth: 1,
        armor: 1,
        movement: 0,
        attacks: [
          {
            attackName: 'stare',
            attack: '2d6 + 5',
            multiplier: 1,
            damage: '1d0 + 0',
          },
        ],
        onBoard: false,
        locationX: -1,
        locationY: -1,
        image: './assets/monsters/icons/TargetDummy.jpg',
      };
      getUsers(userName)
        .then((snapshot) => {
          let books = [];
          snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
          });
          return (books);
        })
        .catch(() => console.log('no such document'))
        .then((data) => {
          if (data.length === 0) {
            addUserMonster(userName, example)
              .then(console.log('data has been added'));
            console.log('add monster');
          }
          if (Object.keys(monster).length === 0) {
            setMonster(data[0]);
          }
          setMonsterArr(data);
        })
        .catch((err) => console.log(err));
    }
    console.log(userList);
  }, [render, userId, change]);
  function deleteMonster(userID, monsterID) {
    setRender('List');
    setMonster(monsterArr[0]);
  }
  function renderComponent() {
    if (userName === undefined) {
      return <Header>Please Login</Header>;
    }
    if (render === 'List') {
      return <List setMonster={setMonster} setRender={setRender} monsterArr={monsterArr} />;
    }
    if (render === 'Create') {
      return (
        <Overflow>
          <Create setRender={setRender} />
        </Overflow>
      )
    }
    return <Details deleteMonster={deleteMonster} monster={monster} />;
  }
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
  )
}

export default MonsterList;
