import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SelectedIcon = styled.img`
  width: 15%;
  background-color: #a6de0b;
`;
const NotSelected = styled.img`
width: 15%;
`;
const Icons = function Icons({ current, selected, setIcon }) {
  const RenderIcon = function RenderIcon() {
    if (selected === current) {
      return (
        <SelectedIcon
          src={`./assets/${current}.png`}
          alt={current} loading="lazy"
          onClick={() => console.log('do something')} />
      );
    }
    return (
      <NotSelected src={`./assets/${current}.png`} alt={current} loading="lazy" onClick={() => setIcon(current)} />);
  };
  return (
    <RenderIcon />
  );
};

export default Icons;
