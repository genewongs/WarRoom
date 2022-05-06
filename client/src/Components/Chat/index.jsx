import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import ChatBox from './Chat'

const socket = io.connect("http://localhost:3000");

const ChatContainer = styled.div`
  flex-grow: 1;
  border: 1px solid black;
`;

function Chat({ }) {

  let username = 'Elliot'

  const joinRoom = () => {
    socket.emit("join_room", username)
  }

  useEffect(() => {
    joinRoom();
  }, [])

  return (
    <ChatContainer>

    </ChatContainer>
  )
}

export default Chat;