import React from 'react';
import styled from 'styled-components';
import Board from './Board';

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 56%;
`;

function BoardComponent() {
  return (
    <BoardContainer>
      <Board />
    </BoardContainer>
  );
}

export default BoardComponent;
