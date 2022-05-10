import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import sampleArray from '../../exampleData/data';

const Icon = styled.img`
width: 15%;
padding 5 px;
`;
function PopulateList({ index, obj, setMonster, setRender }) {
  return (
    <div onClick={() => {
      setMonster(sampleArray.Zelroth[index]);
      setRender('Details');
    }} >
      <Icon
        src={obj.image}
        alt={obj.image}
        loading="lazy"
      />
       &nbsp; {obj.name}
    </div>
  );
}

export default PopulateList;