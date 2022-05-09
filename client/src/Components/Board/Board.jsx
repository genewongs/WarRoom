import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Tile from './Tile';
import { sampleArray } from '../../../../data';

const BoardStyled = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: repeat(${(props) => props.dimension || 8}, ${(props) => 90 / props.dimension || 8}%);
  grid-template-rows: repeat(${(props) => props.dimension || 8}, ${(props) => 90 / props.dimension || 8}%);
  height: 800px;
  width: 800px;
`;

function Board() {
  const dimension = 6 || 8;
  const { Zelroth, Gene } = sampleArray;
  const [randomNumbers] = useState(
    Array.from({ length: dimension * dimension }, () => Math.ceil(Math.random() * 4)),
  );
  const [board, setBoard] = useState(
    Array.from({ length: dimension * dimension }, (element, index) => index),
  );
  const [onBoard, setOnBoard] = useState({
    [(Zelroth[0].locationX * dimension) + Zelroth[0].locationY]: Zelroth[0],
    [(Gene[0].locationX * dimension) + Gene[0].locationY]: Gene[0],
  });
  const [attacker, setAttacker] = useState(null);
  const [defender, setDefender] = useState(null);
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
    <BoardStyled dimension={dimension}>
      {board.map((tile, index) => (onBoard[index] ? <Tile onBoard={onBoard} setOnBoard={setOnBoard} dimension={dimension} attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender} move={move} x={Math.floor(index / dimension)} y={index % dimension} key={uuidv4()} className="tile" index={index} number={randomNumbers[index]} monster={onBoard[index]} />
        : <Tile onBoard={onBoard} setOnBoard={setOnBoard} dimension={dimension} attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender} move={move} x={Math.floor(index / dimension)} y={index % dimension} key={uuidv4()} className="tile" index={index} number={randomNumbers[index]} />))}
    </BoardStyled>
  );
}

export default Board;
