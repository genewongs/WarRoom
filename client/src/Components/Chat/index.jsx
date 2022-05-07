import React, { useEffect } from 'react';
import 'regenerator-runtime/runtime';
import styled from 'styled-components';
import io from 'socket.io-client';
import ChatBox from './Chat';
import LogBox from './Log';

const socket = io.connect('http://localhost:3000');

const ChatContainer = styled.div`
  width: 23%;
  border: 1px solid black;

  .message-content {
    font-size: 12px;
  }

  .message-meta {
    font-size: 10px;
  }

  .chat-header {
    border: 1px solid green;
    text-align: center;
  }

  .log-header {
    border: 1px solid green;
    text-align: center;
  }
  .log-body {
    height: 32.5vh;
    overflow-y: auto;
    border: 1px solid yellow;
  }

  .chat-body {
    height: 47vh;
    overflow-y: auto;
  }

`;

function Chat() {
  const username = 'Elliot';
  const room = 123;

  const joinRoom = () => {
    socket.emit('join_room', room);
  };

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <ChatContainer>
      <ChatBox socket={socket} username={username} room={room} />
      <LogBox />
    </ChatContainer>
  );
}

export default Chat;
