/* eslint-disable react/prop-types */
import React from 'react';
import CSS from './css';

const Icons = function Icons({ current, setIcon }) {
  return (
    <CSS.NotSelected src={`./assets/monsters/icons/${current}`} alt={current} loading="lazy" onClick={() => setIcon(current)} />
  );
};

export default Icons;
