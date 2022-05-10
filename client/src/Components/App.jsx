import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import ProtectedRoute from './Authentication/ProtectedRoute';
import { Button } from '@mui/material';

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
    width: 19%;
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
  padding-left: 10%;
  padding-right: 5%;
  background-color: #00000078;
`

const logout = async ()=> {
  await signOut(auth);
};

function MainHome() {
  return (
    <MasterContainer>
      <HeaderStyled>
        <Title><img src="./assets/logo-sm.png" alt="yes" /></Title>
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
  // console.log('currentUser !== {}', currentUser !== {});

  useEffect(()=>{
    if (currentUser.currentUser !== undefined) {
      setCurrentUser(currentUser)
    } else {
      setCurrentUser({});
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          {/* <Route element={<ProtectedRoute/>}> */}
            <Route exact path="/" element={MainHome()}/>
          {/* </Route> */}
          <Route exact path="/login" element={<Authentication />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
