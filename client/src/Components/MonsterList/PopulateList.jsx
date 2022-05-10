import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
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
function PopulateList({ index, obj, setMonster, setRender }) {
  return (
    <div onClick={() => {
      setMonster(sampleArray.Zelroth[index]);
      setRender('Details');
    }}
    >
      <MonsterContainer>
        <div>
          <h4>
            {obj.name}
          </h4>
          Health:
          {obj.currentHealth}/{obj.maxHealth}
          <br />
          Armor:
          {obj.armor}
          <br />
          Movement:
          {obj.movement}
        </div>
        <div>
          <Icon
            src={obj.image}
            alt={obj.image}
            loading="lazy"
          />
        </div>
      </MonsterContainer>
      <CenterText>
        {obj.description}
      </CenterText>
    </div>
  );
}

export default PopulateList;