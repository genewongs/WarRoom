import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

const MonsterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TileContent({
  x, y, index, monster,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id: index, monster },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    monster?.image
      ? (
        <MonsterDiv>
          <img
            src={monster.image}
            ref={drag}
            style={{
              opacity: isDragging ? '0' : '1',
              width: '90%',
              height: '90%',
            }}
          />
        </MonsterDiv>
      )
      : null
  );
}

export default TileContent;
