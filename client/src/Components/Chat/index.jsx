import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import ChatBox from './Chat';
import LogBox from './Log';
import 'regenerator-runtime/runtime';

const socket = io.connect("http://localhost:3000");

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

  .chat-body {
    height: 50vh
  }
`;

function Chat({ }) {

  let username = 'Elliot'
  let room = 123

  const joinRoom = () => {
    socket.emit("join_room", room)
  }

  useEffect(() => {
    joinRoom();
  }, [])

  return (
    <ChatContainer>
      <ChatBox socket={socket} username={username} room={room}/>
    </ChatContainer>
  )
}

export default Chat;