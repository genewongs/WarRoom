import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import sampleArray from '../../exampleData/data';
import PopulateList from './PopulateList';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #131516;
  width: 100%;
  max-height: 100%;
  min-height: 100%;
  border: 10px;
  z-index: 100;
`;
const Header = styled.div`
  font-family: 'Macondo', cursive !important;
  font-size: large;
  text-align: center;
  padding: 10px 0px;
  background-color: #25282b78;
  text-shadow: 2px 2px 2px #00000078;
`;

function List({ setMonster, setRender, monsterArr }) {
  const [count, setCount] = useState(0);

  let onIndex = -1;
  let offIndex = -1;
  return (
    <ListContainer>
      <Header>On Board</Header>
      {monsterArr.map((e) => {
        onIndex += 1;
        if (e.onBoard) {
          return (<PopulateList index={onIndex} monster={e} setMonster={setMonster} setRender={setRender} />);
        }
        return <div />;
      })}
      <Header>Off Board</Header>
      {monsterArr.map((e) => {
        offIndex += 1;
        if (!e.onBoard) {
          return (<PopulateList index={offIndex} monster={e} setMonster={setMonster} setRender={setRender} setCount={setCount} />);
        }
        return <div />;
      })}
    </ListContainer>
  );
}

export default List;
