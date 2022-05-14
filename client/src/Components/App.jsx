import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { signOut } from 'firebase/auth';
import { Button } from '@mui/material';
import io from 'socket.io-client';
import { auth } from '../firebase-config';
import MonsterList from './MonsterList/index';
import Chat from './Chat/index';
import BoardComponent from './Board/index';
import Authentication from './Authentication/index';
import UserContext from './UserContext';
import ProtectedRoute from './Authentication/ProtectedRoute';
import RoomContext from './RoomContext';
import {
  AppContainer,
  Title,
  MasterContainer,
  HeaderStyled,
} from './StyledComps/AppCSS';

function MainHome(logout) {
  return (
    <MasterContainer>
      <HeaderStyled>
        <Title><img src="./assets/logoflame.png" alt="logo" /></Title>
        <Link to="/login" onClick={logout}>
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
  const [userList, setUserList] = useState([]);
  const [room, setRoom] = useState(27);
  const [changeRoom, setChangeRoom] = useState(false);
  const socket = io.connect('http://localhost:3000');

  const data = {
    room,
    user: currentUser,
    changeRoom,
  };
  const joinRoom = async () => {
    await socket.emit('join_room', data);
    setChangeRoom(false);
  };

  const selectRoom = (room) => {
    setRoom(Number(room));
    setChangeRoom(true);
    joinRoom();
  };

  useEffect(() => {
    socket.on('got_users', (dataList) => {
      if (dataList) {
        setUserList(dataList);
      }
    });
  });

  useEffect(() => {
    if (currentUser.currentUser !== undefined) {
      setCurrentUser(currentUser);
    } else {
      setCurrentUser({});
    }
  }, []);

  const logout = async () => {
    if (currentUser.displayName) {
      socket.emit('logout', currentUser.displayName);
    }
    await signOut(auth);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, userList }}>
      <RoomContext.Provider
        value={{
          setUserList, selectRoom, joinRoom, setRoom, room, socket, data, changeRoom,
        }}
      >
        <Router>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path="/"
                element={MainHome(logout)}
              />
            </Route>
            <Route exact path="/login" element={<Authentication />} />
          </Routes>
        </Router>
      </RoomContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
