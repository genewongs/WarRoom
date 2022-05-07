import React from 'react';
import styled from 'styled-components';
import MonsterList from './MonsterList/index.jsx';
import Chat from './Chat/index.jsx';
import BoardComponent from './Board/index.jsx';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
`;
const Title = styled.div`
  text-align: center;
  font-size: 2em;
  padding: 20px;
`;

function App({  }) {

  return (
    <>
      <Title>WAR ROOM</Title>
      <AppContainer>
        <MonsterList />
        <BoardComponent />
        <Chat />
      </AppContainer>
    </>
  )
}

export default App;