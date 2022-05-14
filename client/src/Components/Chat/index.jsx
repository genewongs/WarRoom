import React, { useState, useEffect, useContext } from 'react';
import 'regenerator-runtime/runtime';
import ChatBox from './Chat';
import LogBox from './Log';
import RoomContext from '../RoomContext';
import ChatContainer from './StyledComps/indexCSS';

function Chat() {
  const { joinRoom, room, socket } = useContext(RoomContext);
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    joinRoom();
  }, [room]);

  return (
    <ChatContainer>
      <ChatBox socket={socket} room={room} />
      <LogBox socket={socket} room={room} setLogList={setLogList} logList={logList} />
    </ChatContainer>
  );
}

export default Chat;
