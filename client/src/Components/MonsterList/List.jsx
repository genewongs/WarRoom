import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import sampleArray from '../../exampleData/data';
import PopulateList from './PopulateList';

const ListContainer = styled.div`
  margin: 2% 1% 1%;
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  width: 95%;
  z-index: 100;
`;
const Header = styled.div`
  font-size: large;
  text-align: center;
`;
function List({ setMonster, setRender }) {
  let onIndex = -1;
  let offIndex = -1;
  return (
    <ListContainer>
      <Header>On Board</Header>
      <hr />
      {sampleArray.Zelroth.map((e) => {
        onIndex += 1;
        if (e.onBoard) {
          return (<PopulateList index={onIndex} obj={e} setMonster={setMonster} setRender={setRender} />);
        }
        return <div />;
      })}
      <hr />
      <Header>Off Board</Header>
      <hr />
      {sampleArray.Zelroth.map((e) => {
        offIndex += 1;
        if (!e.onBoard) {
          return (<PopulateList index={offIndex} obj={e} setMonster={setMonster} setRender={setRender} />);
        }
        return <div />;
      })}
    </ListContainer>
  );
}

export default List;
