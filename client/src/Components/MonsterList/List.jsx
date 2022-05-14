/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
// import sampleArray from '../../exampleData/data';
import PopulateList from './PopulateList';
import UserContext from '../UserContext';
import {
  ListContainer,
  Header,
  CharacterContainer,
  BoardCard,
} from './StyledComps/ListCSS';

function List({ setMonster, setRender, monsterArr }) {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  const { currentUser, userList } = useContext(UserContext);
  let onIndex = -1;
  let offIndex = -1;
  return (
    <ListContainer>
      <CharacterContainer>
        <Header>
          On Board
          <div
            style={{
              display: "inline-block",
              backgroundColor: `${
                userList.filter(
                  (e) => e.name === currentUser.displayName
                ).length > 0
                  ? (userList.filter(
                    (e) => e.name === currentUser.displayName
                  )[0].color)
                  : null
              }`,
              borderRadius: "100px",
              width: "10px",
              height: "10px",
              marginLeft: "10px",
            }}
          />
        </Header>
        <BoardCard>
          {monsterArr.map((e) => {
            onIndex += 1;
            if (e.onBoard) {
              return (
                <PopulateList
                  index={onIndex}
                  monster={e}
                  setMonster={setMonster}
                  setRender={setRender}
                />
              );
            }
            return <div />;
          })}
        </BoardCard>
        <Header>Off Board</Header>
        <BoardCard>
          {monsterArr.map((e) => {
            offIndex += 1;
            if (!e.onBoard) {
              return (
                <PopulateList
                  index={offIndex}
                  monster={e}
                  setMonster={setMonster}
                  setRender={setRender}
                  setCount={setCount}
                />
              );
            }
            return <div />;
          })}
        </BoardCard>
      </CharacterContainer>
    </ListContainer>
  );
}

export default List;
