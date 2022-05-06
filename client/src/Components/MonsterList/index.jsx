import React from 'react';
import styled from 'styled-components';

const MonsterListContainer = styled.div`
  flex-grow: 1;
  border: 1px solid red;
`;

function MonsterList({}) {

  return (
    <MonsterListContainer>
      MonsterList
    </MonsterListContainer>
  )
}

export default MonsterList;