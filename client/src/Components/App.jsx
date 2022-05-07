import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MonsterList from './MonsterList/index';
import Chat from './Chat/index';
import BoardComponent from './Board/index';
import Authentication from './Authentication/index';

const AppContainer = styled.div`
  margin: 0px 100px 80px 100px;
  display: flex;
  flex-direction: row;
  height: 90vh;
`;
const Title = styled.div`
  text-align: center;
  font-size: 2em;
  padding-top: 10px;
  img {
    width: 25%;
  }
`;

function MainHome() {
  return (
    <>
      <Title><img src="./assets/logo-sm.png" alt="yes" /></Title>
      <AppContainer>
        <DragDropContext>
          <MonsterList />
          <Droppable droppableId="board">
            {(provided) => (
              <BoardComponent />
            )}
          </Droppable>
        </DragDropContext>
        <Chat />
      </AppContainer>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={MainHome()} />
        <Route path="/login" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
