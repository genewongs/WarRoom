import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Board from './Board';
import RoomContext from '../RoomContext';

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 56%;
`;

function BoardComponent() {
  const { joinRoom, room, socket } = useContext(RoomContext);

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <BoardContainer>
      <Board socket={socket} room={room} />
    </BoardContainer>
  );
}

export default BoardComponent;
