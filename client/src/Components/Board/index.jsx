import React from 'react';
import styled from 'styled-components';
import Board from './Board.jsx';

const BoardContainer = styled.div`
  flex-grow: 3;
  border: 1px solid blue;
`;

function BoardComponent({}) {
  return (
    <BoardContainer>
      <Board />
    </BoardContainer>
  )
}

export default BoardComponent;