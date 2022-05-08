import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Tile from './Tile';

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
  const dimension = 9 || 8;
  const [randomNumbers] = useState(
    Array.from({ length: dimension * dimension }, () => Math.ceil(Math.random() * 4)),
  );
  const [board, setBoard] = useState(
    Array.from({ length: dimension * dimension }, (element, index) => index),
  );
  const [onBoard, setOnBoard] = useState({1: {image: "./assets/monsters/icons/blob.jpg"}, 10: {image: "./assets/monsters/icons/ghoul.png"}});
  const move = (from, to, monster) => {
    console.log(from, to);
    if (!onBoard[to]) {
      setOnBoard((previous) => ({
        ...previous,
        [to]: monster,
        [from]: null,
      }));
    }
  };
  return (
    <BoardStyled dimension={dimension}>
      {board.map((tile, index) => (onBoard[index] ? <Tile move={move} x={Math.floor(index / dimension)} y={index % dimension} key={uuidv4()} className="tile" index={index} number={randomNumbers[index]} monster={onBoard[index]} />
        : <Tile move={move} x={Math.floor(index / dimension)} y={index % dimension} key={uuidv4()} className="tile" index={index} number={randomNumbers[index]} />))}
    </BoardStyled>
  );
}

export default Board;
