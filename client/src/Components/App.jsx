import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MonsterList from './MonsterList/index';
import Chat from './Chat/index';
import BoardComponent from './Board/index';
import Authentication from './Authentication/index';
import UserContext from './UserContext';
import ProtectedRoute from './Authentication/ProtectedRoute';
import {signOut} from 'firebase/auth';
import {useNavigate, Link} from 'react-router-dom';
import {auth} from '../firebase-config.js';

const AppContainer = styled.div`
  margin: 0px 100px 0px 100px;
  display: flex;
  flex-direction: row;
  height: 90vh;
`;
const Title = styled.div`
  text-align: center;
  font-size: 2em;
  padding-top: 10px;
  img {
    width: 20%;
  }
`;

const MasterContainer = styled.div`
  background-image: url('./assets/bg.jpg');
  background-size: contain;
  background-repeat: none;
  padding-bottom: 80px;
`;

const logout = async ()=> {
  await signOut(auth);
};

function MainHome() {

  return (
    <MasterContainer>
      <Link to='/login' onClick={logout} style={{float: 'right'}}>Log Out</Link>
      <Title><img src="./assets/logo-sm.png" alt="yes" /></Title>
      <AppContainer>
        <DndProvider backend={HTML5Backend}>
          <MonsterList />
          <BoardComponent />
        </DndProvider>
        <Chat />
      </AppContainer>
    </MasterContainer>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState({});
  console.log('currentUser in app', currentUser);
  // console.log('currentUser !== {}', currentUser !== {});

  useEffect(()=>{
    if (currentUser.auth) {
      setCurrentUser(currentUser)
    } else {
      setCurrentUser({});
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route exact path="/" element={MainHome()}/>
          </Route>
          <Route exact path="/login" element={<Authentication />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
