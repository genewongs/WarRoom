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
  padding-top: 12px;
  font-size: 2em;
  float: left;
  img {
    width: 23%;
  }
`;

const MasterContainer = styled.div`
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: 60px;
  min-height: 60px;
  margin-bottom: 20px;
  padding-left: 3%;
  padding-right: 5%;
  background-color: #000000c2;
`


function MainHome(logout) {
  return (
    <MasterContainer>
      <HeaderStyled>
        <Title><img src="./assets/logoflame.png" alt="logo" /></Title>
        <Link to='/login' onClick={logout}>
          <Button variant="contained" className="logoutBtn">Log Out</Button>
        </Link>
      </HeaderStyled>
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
  const logout = async ()=> {
    if (currentUser.displayName) {
      socket.emit('logout', currentUser.displayName);
    }
    await signOut(auth);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RoomContext.Provider value={ {joinRoom, room, socket} }>
        <Router>
          <Routes>
            {/* <Route element={<ProtectedRoute/>}> */}
            <Route exact path="/" element={MainHome(logout)} />
            {/* </Route> */}
            <Route exact path="/login" element={<Authentication />} />
          </Routes>
        </Router>
      </RoomContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
