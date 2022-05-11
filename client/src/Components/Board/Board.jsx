import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import Tile from './Tile';
import UserContext from '../UserContext';
import sampleArray from '../../../../data';
import { updateUserMonster } from '../../firebase-config';

const BoardStyled = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: repeat(${(props) => props.dimension || 8}, ${(props) => 90 / props.dimension || 8}%);
  grid-template-rows: repeat(${(props) => props.dimension || 8}, ${(props) => 90 / props.dimension || 8}%);
  height: 100%;
  width: 100%;
  margin-top: -30px;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 800px;
  width: 800px;
`;

const ErrorMessage = styled.div`
  display: flex;
  text-align: center;
  margin-top: 20px;
  opacity: 0;
  color: #ca0000;
  transition: all ease-in-out 0.3s;
  &.show {
    opacity: 1 !important;
    color: #ca0000;
    transition: all ease-in-out 0.3s;
  }
`;

function Board({ socket, room }) {
  const dimension = 6 || 8;
  const { Zelroth, Gene } = sampleArray;
  const { currentUser } = useContext(UserContext);
  const [randomNumbers] = useState(
    Array.from({ length: dimension * dimension }, () => Math.ceil(Math.random() * 4)),
  );
  const [board, setBoard] = useState(
    Array.from({ length: dimension * dimension }, (element, index) => index),
  );
  const [onBoard, setOnBoard] = useState({});
  const [attacker, setAttacker] = useState(null);
  const [defender, setDefender] = useState(null);
  const [error, setError] = useState(false);
  const [send, setSend] = useState(false);

  const sendNewBoard = () => {
    const newBoardSend = {
      new_board: onBoard,
      room,
    };
    socket.emit('send_new_board', newBoardSend);
  };

  const move = async (from, to, monster, reRender) => {
    if (!onBoard[to]) {
      if (monster.userUID !== currentUser.uid) {
        setError('Trying to move something that is not yours?');
        setTimeout(() => { setError(false); }, 3000);
      } else {
        monster.locationX = Math.floor(to / dimension);
        monster.locationY = to % dimension;
        monster.onBoard = true;
        setAttacker(null);
        setDefender(null);
        await setOnBoard((previous) => ({
          ...previous,
          [to]: monster,
          [from]: null,
        }));
        if (send) {
          setSend(false);
        } else {
          setSend(true);
        }

        updateUserMonster(currentUser.displayName, monster.id, { onBoard: true, locationX: monster.locationX, locationY: monster.locationY })
          .then(() => {
            if (reRender) {
              reRender((previous) => previous + 1);
            }
          });
      }
    } else {
      setError('You can not move there!');
      setTimeout(() => { setError(false); }, 3000);
    }
  };

  useEffect(() => {
    sendNewBoard();
  }, [send]);

  useEffect(() => {
    socket.on('recieve_new_board', (newBoardSend) => {
      setOnBoard(newBoardSend.new_board);
    });
  }, [socket]);

  return (
    <BoardContainer>
      <ErrorMessage className={error ? 'show' : ''}> &nbsp;{error || ""}&nbsp; </ErrorMessage>
      <BoardStyled dimension={dimension}>
        {board.map((tile, index) => (onBoard[index] ? <Tile setError={setError} onBoard={onBoard} setOnBoard={setOnBoard} dimension={dimension} attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender} move={move} x={Math.floor(index / dimension)} y={index % dimension} key={uuidv4()} className="tile" index={index} number={randomNumbers[index]} monster={onBoard[index]} />
          : <Tile onBoard={onBoard} setOnBoard={setOnBoard} dimension={dimension} attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender} move={move} x={Math.floor(index / dimension)} y={index % dimension} key={uuidv4()} className="tile" index={index} number={randomNumbers[index]} />))}
      </BoardStyled>
    </BoardContainer>
  );
}

export default Board;
