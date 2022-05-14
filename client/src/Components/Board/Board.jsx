/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tile from './Tile';
import AutoBattleList from './AutoBattleList';
import UserContext from '../UserContext';
import { updateUserMonster } from '../../firebase-config';
import aStar from './utils/aStar/aStar';
import { Battle } from './utils/BattleFunc';
import {
  BoardStyled,
  BoardContainer,
  ErrorMessage,
  MenuContainer,
  BattleCardContainer,
} from './StyledComps/BoardCSS';

function Board({
  socket, room, dimension, onBoard, setOnBoard,
}) {
  const { currentUser, userList } = useContext(UserContext);
  const [randomNumbers] = useState(
    Array.from({ length: dimension * dimension }, () => Math.ceil(Math.random() * 4)),
  );
  const [board, setBoard] = useState(
    Array.from({ length: dimension * dimension }, (element, index) => index),
  );
  // const [onBoard, setOnBoard] = useState({});
  const [attacker, setAttacker] = useState(null);
  const [defender, setDefender] = useState(null);
  const [error, setError] = useState(false);
  const [send, setSend] = useState(false);
  const [monsterList, setMonsterList] = useState([]);
  const [monsterListCounter, setMonsterListCounter] = useState([]);
  const [battleList, setBattleList] = useState([{}]);
  const [turn, setTurn] = useState(userList.length > 0 ? userList[0].id : '');
  const sendNewBoard = (newBoard = onBoard) => {
    const newBoardSend = {
      new_board: newBoard,
      room,
    };
    socket.emit('send_new_board', newBoardSend);
  };
  const sendNewTurn = () => {
    const newTurnSend = {
      new_turn: turn,
      room,
    };
    socket.emit('send_new_turn', newTurnSend);
  };
  function endTurn() {
    // create for loop to go though userList and get the index of the user whos turn it is.
    // increament the currnet index by 1 or go back to 0 if we are at the end of the array of users.
    if (currentUser.uid === turn) {
      for (let i = 0; i < userList.length; i += 1) {
        if (userList[i].id === turn) {
          if (i + 1 < userList.length) {
            setTurn(userList[i + 1].id);
          } else {
            setTurn(userList[0].id);
          }
        }
      }
    }
    if (turn.length < 1) {
      setTurn(userList[0].id);
    }
  }
  async function move(from, to, monster, reRender) {
    const fromX = Math.floor(from / dimension);
    const fromY = from % dimension;
    const toX = Math.floor(to / dimension);
    const toY = to % dimension;
    if (currentUser.uid !== turn || turn.length < 1) {
      setError('Its not your turn!');
      setTimeout(() => { setError(false); }, 3000);
    } else if (monster.userUID !== currentUser.uid) {
      setError('Trying to move something that is not yours?');
      setTimeout(() => { setError(false); }, 3000);
    } else if (
      monster.onBoard && Math.abs(toX - fromX) + Math.abs(toY - fromY) > (monster.movement / 5)
    ) {
      setError('That is too far away!');
      setTimeout(() => { setError(false); }, 3000);
    } else if (!onBoard[to]) {
      monster.locationX = toX;
      monster.locationY = toY;
      monster.onBoard = true;
      setAttacker(null);
      setDefender(null);
      const tempBoard = onBoard;
      delete tempBoard[from];
      tempBoard[to] = monster;
      await setOnBoard(tempBoard);
      if (send) {
        setSend(false);
      } else {
        setSend(true);
      }
      updateUserMonster(currentUser.displayName, monster.id, {
        onBoard: true,
        locationX: monster.locationX,
        locationY: monster.locationY,
      })
        .then(() => {
          if (reRender) {
            reRender((previous) => previous + 1);
          }
        });
    } else {
      setError('You can not move there!');
      setTimeout(() => { setError(false); }, 3000);
    }
  }

  function handleAutoBattle() {
    function check(battleObj) {
      return battleObj.attacker && battleObj.defender && battleObj.attack;
      //  this creates a storage of all the old coordinates to use later on
      // this checks if every battle is valid and is users turn
    }
    if (battleList.every(check) && currentUser.uid === turn) {
      // each time a battle occurs, the new coordinates get stored in an object
      const oldCoords = {};
      const successful =  Array.from({ length: battleList.length }, () => false);
      battleList.forEach((battle) => {
        oldCoords[battle.attacker.id] = [battle.attacker.locationX, battle.attacker.locationY];
      });
      // this for loop finds paths for each battle in a sequential order
      // this matters because the result of one path might place an obstacle in the following battle
      const newCoords = {};
      const tempBoard = { ...onBoard };
      for (let i = 0; i < battleList.length; i += 1) {
        const battle = battleList[i];
        const oldIndex = (battle.attacker.locationX * dimension) + battle.attacker.locationY;
        if (newCoords[battle.attacker.id]) {
          battle.attacker.locationX = newCoords[battle.attacker.id][0]
          battle.attacker.locationY = newCoords[battle.attacker.id][1]
        }
        // this finds the path
        const path = aStar(dimension, tempBoard, battle.attacker, battle.defender);
        // if the path is not too long, store the path in the new coords
        // then delete the old coords as it has moved after this battle
        if (path.length
          && path.length - 1 <= ((battle.attacker.movement / 5) + (battle.attack.range / 5))
        ) {
          if (newCoords[battle.attacker.id]) {
            const previousCoord = (newCoords[battle.attacker.id][0] * dimension) + newCoords[battle.attacker.id][1];
            delete tempBoard[previousCoord];
          }
          let newLocation = path[Math.floor((battle.attack.range / 5) - 1)] || path[path.length - 1];
          newCoords[battle.attacker.id] = newLocation;
          newLocation = (newLocation[0] * dimension) + newLocation[1];
          tempBoard[newLocation] = battle.attacker;
          successful[i] = true;
          if (newLocation !== oldIndex) {
            delete tempBoard[oldIndex];
          }
        } else {
          break;
        }
      }
      // once all the new coords are set, move the pieces accordingly
      Promise.all(Object.keys(newCoords).map((monsterID) => {
        const coords = newCoords[monsterID];
        return updateUserMonster(currentUser.displayName, monsterID, {
          onBoard: true,
          locationX: coords[0],
          locationY: coords[1],
        });
      }))
      // by now all the pieces should be in the right position
        .then(() => {
          Promise.all(
            // since the battles update the db, it needs to be async
            battleList.map(async (battle, index) => {
              // commences battle a multiple amount of times
              if (successful[index]) {
                let multiple = battle.attack.multiplier;
                while (multiple > 0) {
                  // updates the battle log with events that occured
                  const message = await Battle(battle.attacker, battle.defender, battle.attack);
                  const logMessageData = {
                    message,
                    board: room,
                    id: uuidv4(),
                  };
                  socket.emit('send_log_message', logMessageData);
                  multiple -= 1;
                }
                if (battle.defender.currentHealth <= 0) {
                  // my shoddy attempt to make sure each location is right
                  // this def needs changing
                  return Promise.resolve(
                    (battle.defender.locationX * dimension) + battle.defender.locationY,
                  );
                }
              }
            }),
          )
          // after all the battle commences
            .then((data) => {
              // create a tempboard and update it with new coords
              data.forEach((deadInd) => {
                delete tempBoard[deadInd];
              });
              setOnBoard(tempBoard);
              sendNewBoard(tempBoard);
            });
        });
    } else if (currentUser.uid !== turn) {
      setError('Not your turn');
      setTimeout(() => { setError(false); }, 3000);
    } else {
      setError('Pick an attack');
      setTimeout(() => { setError(false); }, 3000);
    }
  }
  // USE EFFECTS
  useEffect(() => {
    sendNewTurn();
  }, [turn]);

  useEffect(() => {
    if (JSON.stringify(onBoard) !== '{}') {
      sendNewBoard();
    }
  }, [send]);

  useEffect(() => {
    socket.on('recieve_new_board', (newBoardSend) => {
      setOnBoard(newBoardSend.new_board);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('recieve_new_turn', (newTurn) => {
      setTurn(newTurn.new_turn);
    });
  }, [socket]);

  useEffect(() => {
    const myTemp = [];
    const oppTemp = [];
    Object.values(onBoard).forEach((monster) => {
      if (monster && monster.userUID === currentUser.uid) {
        myTemp.push(monster);
      } else {
        oppTemp.push(monster);
      }
    });
    setMonsterList([myTemp, oppTemp]);
  }, [onBoard]);

  // RENDER
  return (
    <BoardContainer>
      <MenuContainer>
        <div className="section full-height">
          <input
            className="modal-btn"
            type="checkbox"
            id="modal-btn"
            name="modal-btn"
          />
          <label htmlFor="modal-btn">
            Battle List
            <i className="uil uil-expand-arrows" />
          </label>

          <input
            className="modal-btn"
            disabled="disabled"
            type="checkbox"
            id="modal-btn2"
            name="modal-btn"
          />
          <label onClick={() => handleAutoBattle()} htmlFor="modal-btn2">
            Auto Battle
            <i className="uil uil-expand-arrows" />
          </label>

          <input
            className="modal-btn"
            disabled="disabled"
            type="checkbox"
            id="modal-btn3"
            name="modal-btn"
          />
          <label onClick={() => endTurn()} htmlFor="modal-btn3" className="danger">
            {turn.length < 1 ? 'Connect To Game' : currentUser.uid === turn ? 'End Turn' : 'Waiting'}
            <i className="uil uil-expand-arrows" />
          </label>

          <div className="modal">
            <div className="modal-wrap">
              <h4>Auto Battle List</h4>
              <BattleCardContainer>
                {monsterList.length > 0
                  ? battleList.map((el, index) => (
                    <AutoBattleList
                      key={index}
                      monsters={monsterList}
                      setBattleList={setBattleList}
                      battleList={battleList}
                      battle={el}
                      setMonsterListCounter={setMonsterListCounter}
                      id={index}
                    />
                  )) : null}
                <div style={{ display: 'flex', flexDirection: 'rows' }}>
                  <AddCircleIcon
                    className="icon"
                    fontSize="large"
                    onClick={() => {
                      setMonsterList((prv) => [...prv, onBoard]);
                      setBattleList((prv) => [...prv, {}]);
                    }}
                    style={{ color: 'limegreen' }}
                  />
                  <AddCircleIcon
                    className="icon"
                    fontSize="large"
                    onClick={() => {
                      setBattleList((prev) => {
                        const copy = [...prev];
                        copy.pop();
                        return copy;
                      });
                    }}
                    style={{ color: 'red', transform: 'rotate(45deg)' }}
                  />
                </div>
              </BattleCardContainer>
            </div>
          </div>

          <a href="https://front.codes/" className="logo" target="_blank" rel="noreferrer" />
        </div>
      </MenuContainer>
      <BoardStyled dimension={dimension}>
        {board.map((tile, index) => (onBoard[index]
          ? (
            <Tile
              sendNewBoard={sendNewBoard}
              setError={setError}
              onBoard={onBoard}
              setOnBoard={setOnBoard}
              dimension={dimension}
              attacker={attacker}
              setAttacker={setAttacker}
              defender={defender}
              setDefender={setDefender}
              move={move}
              x={Math.floor(index / dimension)}
              y={index % dimension}
              key={uuidv4()}
              className="tile"
              index={index}
              number={randomNumbers[index]}
              monster={onBoard[index]}
              turn={turn}
            />
          )
          : (
            <Tile
              sendNewBoard={sendNewBoard}
              onBoard={onBoard}
              setOnBoard={setOnBoard}
              dimension={dimension}
              attacker={attacker}
              setAttacker={setAttacker}
              defender={defender}
              setDefender={setDefender}
              move={move}
              x={Math.floor(index / dimension)}
              y={index % dimension}
              key={uuidv4()}
              className="tile"
              index={index}
              number={randomNumbers[index]}
              turn={turn}
            />
          )
        ))}
      </BoardStyled>
      <ErrorMessage className={error ? 'show' : ''}>
        {' '}
        &nbsp;
        {error || ''}
&nbsp;
        {' '}
      </ErrorMessage>
      <div
        style={{
          color: `${turn.length < 1 ? 'white' : userList.filter((e) => e.id === turn)[0].color}`,
          textShadow: '2px 2px 2px black',
          fontSize: '1.5em',
        }}
      >
        It's&nbsp;
        {turn.length < 1 ? 'Nobody' : userList.filter((e) => e.id === turn)[0].name}
        's turn
      </div>
    </BoardContainer>
  );
}

export default Board;
