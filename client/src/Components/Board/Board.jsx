import React, { useEffect } from 'react';
import styled from 'styled-components';
import Tile from './Tile.jsx';
import { v4 as uuidv4 } from 'uuid';

const BoardStyled = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: repeat(${props => props.dimension || 8}, ${props => 90/props.dimension || 8}%);
  grid-template-rows: repeat(${props => props.dimension || 8}, ${props => 90/props.dimension || 8}%);
  height: 800px;
  width: 800px;
`;

function Board({}) {
  const dimension = 12 || 8;
  let board = [];
  for(let i = dimension - 1; i >= 0; i--) {
    for(let j = 0; j < dimension; j++) {
      board.push(
        <Tile key={uuidv4()} className='tile' />
        )
      }
    }
  return (
    <BoardStyled dimension={dimension}>
      {board}
    </BoardStyled>
  )
}

export default Board;