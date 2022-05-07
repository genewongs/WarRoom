import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {UserContext} from '../UserContext.js';

const MonsterListContainer = styled.div`
  flex-grow: 1;
  border: 1px solid red;
  width: 23%;
`;

function MonsterList({}) {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  console.log('currentUser in MonsterList', currentUser);
  return (
    <MonsterListContainer>
      MonsterList
    </MonsterListContainer>
  )
}

export default MonsterList;