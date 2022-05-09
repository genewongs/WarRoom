import React, { useState, useEffect } from 'react';
import CSS from './css';

const Icons = function Icons({ current, selected, setIcon }) {
  return (
    <CSS.NotSelected src={`./assets/monsters/icons/${current}`} alt={current} loading="lazy" onClick={() => setIcon(current)} />
  );
};

export default Icons;
