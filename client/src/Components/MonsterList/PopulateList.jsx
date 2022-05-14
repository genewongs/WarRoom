/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { useDrag } from 'react-dnd';
import {
  Icon,
  MonsterContainer,
  ListContainer,
} from './StyledComps/PopulateListCSS';
// import sampleArray from '../../exampleData/data';

function PopulateList({
  index,
  monster,
  setMonster,
  setRender,
  setCount,
}) {
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
