import React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  flex-grow: 3;
  border: 1px solid blue;
`;

function Board({}) {
  return (
    <BoardContainer>
      board
    </BoardContainer>
  )
}

export default Board;