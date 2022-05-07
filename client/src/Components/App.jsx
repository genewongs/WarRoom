import React, {useState} from 'react';
import styled from 'styled-components';
import MonsterList from './MonsterList/index.jsx';
import Chat from './Chat/index.jsx';
import BoardComponent from './Board/index.jsx';
import Authentication from './Authentication/index.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {UserContext} from './UserContext';


const AppContainer = styled.div`
  margin: 0px 100px 80px 100px;
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
  const [currentUser, setCurrentUser] = useState({});
  console.log('currentUser in app', currentUser.email, currentUser.uid)

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <Router>
        <Routes>
          <Route path='/' element={MainHome()}/>
          <Route path='/login' element={<Authentication/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App;