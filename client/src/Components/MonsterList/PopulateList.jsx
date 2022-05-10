import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import sampleArray from '../../exampleData/data';

const Icon = styled.img`
  width: 70%;
  padding 5 px;
  float: right;
`;
const MonsterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const CenterText = styled.div`
  width: 100%;
  text-align: center;
`;
function PopulateList({ index, monster, setMonster, setRender, setCount }) {

  const [{ isDragging }, drag] = useDrag(() => ({

    type: 'image',
    item: { id: index, monster, reRender: setCount },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div onClick={() => {
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
          {monster.currentHealth}/{monster.maxHealth}
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
      <CenterText>
        {monster.description}
      </CenterText>
    </div>
  );
}

export default PopulateList;
