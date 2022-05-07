import React from 'react';
import styled from 'styled-components';
import Board from './Board.jsx';

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1.5;
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