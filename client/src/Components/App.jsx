import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import MonsterList from './MonsterList/index';
import Chat from './Chat/index';
import BoardComponent from './Board/index';
import Authentication from './Authentication/index';
import UserContext from './UserContext';
import io from 'socket.io-client';
import ProtectedRoute from './Authentication/ProtectedRoute';
import { Button } from '@mui/material';
import RoomContext from './RoomContext';

const AppContainer = styled.div`
  margin: 0px 100px 0px 100px;
  display: flex;
  flex-direction: row;
  height: 80vh;
`;

const Title = styled.div`
  text-align: center;
  font-size: 2em;
  padding-top: 10px;
  margin-left: 112px;
  img {
    width: 20%;
  }
`;

const MasterContainer = styled.div`
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
`;

const logout = async () => {
  await signOut(auth);
};

function MainHome() {
  return (
    <MasterContainer>
      <Link to='/login' onClick={logout}>
        <Button variant="contained" className="logoutBtn">Log Out</Button>
      </Link>
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
  const socket = io.connect('http://localhost:3000');
  // console.log('currentUser !== {}', currentUser !== {});

  const room = 123;

  const joinRoom = () => {
    socket.emit('join_room', room);
  };

  useEffect(() => {
    if (currentUser.currentUser !== undefined) {
      setCurrentUser(currentUser)
    } else {
      setCurrentUser({});
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RoomContext.Provider value={ {joinRoom, room, socket} }>
        <Router>
          <Routes>
            {/* <Route element={<ProtectedRoute/>}> */}
            <Route exact path="/" element={MainHome()} />
            {/* </Route> */}
            <Route exact path="/login" element={<Authentication />} />
          </Routes>
        </Router>
      </RoomContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
