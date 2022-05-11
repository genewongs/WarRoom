/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
// import sampleArray from '../../exampleData/data';

const Icon = styled.img`
  min-height: 100px;
  max-height: 100px;
  min-width: 100px;
  max-width: 100px;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(-45deg, #835d1a, #BF953F, #FBF5B7 ,#BF953F, #835d1a) 1;
`;
const MonsterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px;

  h4 {
    font-weight: 200;
    color: #fff0cf;
    text-shadow: 2px 2px 2px #171512;
  }
`;
const CenterText = styled.div`
  width: 100%;
  text-align: center;
`;
const ListContainer = styled.div`
  height: auto;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(to right, #f5f7f5, #526e9f34) 1;
  background-image: linear-gradient(to left, rgba(255,0,0,0), #526e9f34);
`;
function PopulateList({ index, monster, setMonster, setRender, setCount }) {
  // eslint-disable-next-line no-unused-vars
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id: index, monster, reRender: setCount },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <ListContainer onClick={() => {
      setMonster(monster);
      setRender('Details');
    }}
    >
      <MonsterContainer>
        <div>
          <h4>
            {monster.name}
          </h4>
          Health:
          {monster.currentHealth}
          /
          {monster.maxHealth}
          <br />
          Armor:
          {monster.armor}
          <br />
          Movement:
          {monster.movement}
        </div>
        <div>
          <Icon
            src={monster.image}
            alt={monster.image}
            loading="lazy"
            ref={!monster.onBoard ? drag : null}
          />
        </div>
      </MonsterContainer>
    </ListContainer>
  );
}

export default PopulateList;
