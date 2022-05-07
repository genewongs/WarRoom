import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import TileContent from './TileContent';

const TileContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  /* border: 1px solid black; */
  background-image: url(${(props) => `./assets/square${props.number}.png`});
  background-size: cover;
`;

function Tile({ x, y }) {
  const id = uuidv4();

  return (
    <TileContainer number={Math.ceil(Math.random() * 4)}>
      <Draggable key={id} draggableId={id} index={x, y}>
        {(provided) => (
          <div className="batman" x={x} y={y} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
            <AccessibleForwardIcon />
          </div>
          // <TileContent x={x} y={y} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}/>
          )}
      </Draggable>
    </TileContainer>
  );
}

export default Tile;
