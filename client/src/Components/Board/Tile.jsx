import React, { useState } from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  border: 1px solid black;
`;

function Tile ({}) {
  let [content, setContent] = useState({});

  return (
    <TileContainer>
    </TileContainer>
  )
}

export default Tile;