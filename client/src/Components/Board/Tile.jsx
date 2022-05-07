import React, { useState } from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  /* border: 1px solid black; */
  background-image: url(${props => `./assets/square${props.number}.png`});
  background-size: cover;
`;

function Tile ({}) {
  let [content, setContent] = useState({});

  return (
    <TileContainer number={Math.ceil(Math.random() * 4)}>
    </TileContainer>
  )
}

export default Tile;