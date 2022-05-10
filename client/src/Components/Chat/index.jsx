import React, { useEffect } from 'react';
import 'regenerator-runtime/runtime';
import styled from 'styled-components';
import io from 'socket.io-client';
import { getUsers } from '../../firebase-config';
import ChatBox from './Chat';
import LogBox from './Log';

const socket = io.connect('http://localhost:3000');

const ChatContainer = styled.div`
  height: 100%;
  /* background-color: #18181f; */
  width: 23%;
  border-radius: 5px;

  .message-content {
    font-size: 12px;
  }

  .message-meta {
    font-size: 10px;
  }

  .chat-header {
    display: flex;
    height: 4vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-shadow: 2px 2px 2px black;
    background-color: #394361;
    border-bottom: 1px solid #d8c8a6;
    border-radius: 5px 5px 0px 0px;
  }

  .log-header {
    display: flex;
    height: 4vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-shadow: 2px 2px 2px black;
    background-color: #45161d;
    border-bottom: 1px solid #972a2a;
    border-radius: 5px 5px 0px 0px;
  }

  .log-body {
    height: 30vh;
    overflow-y: auto;
    font-size: 12px;
    background-color: #18181f;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .chat-body {
    height: 40vh;
    overflow-y: auto;
    scrollbar-width: none;
    background-color: #2f2f39;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .chat-body .message-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .chat-body .message-container::-webkit-scrollbar {
    display: none;
  }

  #you {
    text-align: right;
    background-color: #40465dc3;
    margin: 4px 6px;
    padding: 5px 15px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #00000049;
  }

  #other {
    text-align: left;
    background-color: #ec00003c;
    margin: 4px 6px;
    padding: 5px 15px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #00000049;
  }

  .message-author {
    font-size: 12px;
    color: #aaadbc;
    font-weight: bold;
  }

  .message-time {
    font-size: 12px;
    color: #ffbb00;
  }

  .seperator {
    height: 20px;
    background-color: transparent;
  }

  //Battle Log
  .log-message {
    text-align: center;
    background-color: #32722fc3;
    margin: 4px 6px;
    padding: 5px 15px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #00000049;
    opacity: 1;
    transition: all ease-in-out 1s;
  }

  //MESSAGE BAR
  .chat-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #1f1f26;
    border-radius: 3px;
  }

  .message-bar {
    border: none;
    border-radius: 5px;
    background-color:  #dbdfe3;
    width: 90%;
    height: 3vh;
  }

//FORM STYLING
  $primary: #11998e;
  $secondary: #38ef7d;
  $white: #fff;
  $gray: #9b9b9b;

  .form__group {
    position: relative;
    padding: 0px 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #9b9b9b;
    outline: 0;
    font-size: .7rem;
    color: white;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .form__label {
      font-size: .8rem;
      cursor: text;
      top: 13px;
    }
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $gray;
  }

  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: -8px;
      display: block;
      transition: 0.2s;
      font-size: .6rem;
      color: #828793;
    }
    padding-bottom: 7px;
    border-width: 1px;
    border-image: linear-gradient(to right, #0083d5, #dff4ff);
    border-image-slice: 1;
  }
  /* reset input */
  .form__field{
    &:required,&:invalid { box-shadow:none; }
  }
  /* demo */
  body {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-size: 1.5rem;
    background-color:#222222;
  }

`;

function Chat() {
  const username = 'Elliot';
  const room = 123;

  const joinRoom = () => {
    socket.emit('join_room', room);
  };

  // console.log(getUsers());

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <ChatContainer>
      <ChatBox socket={socket} username={username} room={room} />
      <LogBox socket={socket} room={room} />
    </ChatContainer>
  );
}

export default Chat;
