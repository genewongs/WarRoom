import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import sampleArray from '../../exampleData/data';
import PopulateList from './PopulateList';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  width: 100%;
  z-index: 100;
`;
const Header = styled.div`
  font-size: large;
  text-align: center;
`;
function List({ setMonster, setRender, monsterArr }) {
  const [count, setCount] = useState(0);

  let onIndex = -1;
  let offIndex = -1;
  return (
    <ListContainer>
      <Header>On Board</Header>
      <hr />
      {monsterArr.map((e) => {
        onIndex += 1;
        if (e.onBoard) {
          return (<PopulateList index={onIndex} monster={e} setMonster={setMonster} setRender={setRender} />);
        }
        return <div />;
      })}
      <hr />
      <Header>Off Board</Header>
      <hr />
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
