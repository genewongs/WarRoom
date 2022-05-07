import React from 'react';
import styled from 'styled-components';
import MonsterList from './MonsterList/index.jsx';
import Chat from './Chat/index.jsx';
import BoardComponent from './Board/index.jsx';
import Authentication from './Authentication/index.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


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

const MainHome = () => {
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

function App({  }) {

  return (
    <Router>
      <Routes>
        <Route path='/' element={MainHome()}/>
        <Route path='/login' element={<Authentication/>}/>
      </Routes>
    </Router>
  )
}

export default App;