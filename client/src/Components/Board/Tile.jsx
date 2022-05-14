import React from 'react';
import { useDrop } from 'react-dnd';
import TileContent from './TileContent';
import TileContainer from './StyledComps/TileCSS';

function Tile({
  x, y, index, number, move, monster, attacker, setAttacker, defender, setDefender, dimension, onBoard, setOnBoard, setError, sendNewBoard
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => move(item.id, index, item.monster, item.reRender),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <TileContainer number={number} ref={drop} position={index}>
      <TileContent
        x={x}
        y={y}
        index={index}
        monster={monster}
        attacker={attacker}
        setAttacker={setAttacker}
        defender={defender}
        setDefender={setDefender}
        dimension={dimension}
        onBoard={onBoard}
        setOnBoard={setOnBoard}
        setError={setError}
        sendNewBoard={sendNewBoard}
      />
    </TileContainer>
  );
}

export default Tile;
