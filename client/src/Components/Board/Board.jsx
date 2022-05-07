import React, { useEffect } from 'react';
import styled from 'styled-components';
import Tile from './Tile.jsx';

const BoardStyled = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: repeat(${props => props.dimension || 8}, ${props => 90/props.dimension || 8}%);
  grid-template-rows: repeat(${props => props.dimension || 8}, ${props => 90/props.dimension || 10}%);
  height: 100%;
  width: 100%;
  background-color: white;
`;

function Board({}) {
  console.log('hey alex');
  const dimension = 12 || 8;
  let board = [];
  for(let i = dimension - 1; i >= 0; i--) {
    for(let j = 0; j < dimension; j++) {
      board.push(
        <Tile className='tile' />
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