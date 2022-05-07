import React, { useEffect } from 'react';
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
  const dimension = 12 || 8;
  const board = [];
  for (let i = 0; i < dimension; i += 1) {
    for (let j = 0; j < dimension; j += 1) {
      board.push(
        <Tile key={uuidv4()} x={i} y={j} className="tile" />,
      );
    }
  }
  return (
    <BoardStyled dimension={dimension}>
      {board}
    </BoardStyled>
  );
}

export default Board;
