import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Tile from './Tile';
import UserContext from '../UserContext';
import sampleArray from '../../../../data';

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

function Board() {
  const dimension = 6 || 8;
  const { Zelroth, Gene } = sampleArray;
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  const [randomNumbers] = useState(
    Array.from({ length: dimension * dimension }, () => Math.ceil(Math.random() * 4)),
  );
  const [board, setBoard] = useState(
    Array.from({ length: dimension * dimension }, (element, index) => index),
  );
  const [onBoard, setOnBoard] = useState({
    [(Zelroth[0].locationX * dimension) + Zelroth[0].locationY]: Zelroth[0],
    [(Gene[0].locationX * dimension) + Gene[0].locationY]: Gene[0],
    [(Gene[1].locationX * dimension) + Gene[1].locationY]: Gene[1],
  });
  const [attacker, setAttacker] = useState(null);
  const [defender, setDefender] = useState(null);
  const [error, setError] = useState(false);
  const move = (from, to, monster) => {
    if (!onBoard[to]) {
      monster.locationX = Math.floor(to / dimension);
      monster.locationY = to % dimension;
      setAttacker(null);
      setDefender(null);
      setOnBoard((previous) => ({
        ...previous,
        [to]: monster,
        [from]: null,
      }));
    }
  };
  return (
    <BoardContainer>
    <ErrorMessage className={error ? 'show' : ''}> Opponent is too far away to attack </ErrorMessage>
      <BoardStyled dimension={dimension}>
        {board.map((tile, index) => (onBoard[index] ? <Tile setError={setError} onBoard={onBoard} setOnBoard={setOnBoard} dimension={dimension} attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender} move={move} x={Math.floor(index / dimension)} y={index % dimension} key={uuidv4()} className="tile" index={index} number={randomNumbers[index]} monster={onBoard[index]} />
          : <Tile onBoard={onBoard} setOnBoard={setOnBoard} dimension={dimension} attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender} move={move} x={Math.floor(index / dimension)} y={index % dimension} key={uuidv4()} className="tile" index={index} number={randomNumbers[index]} />))}
      </BoardStyled>
    </BoardContainer>
  );
}

export default Board;
