import React, { useState, useEffect, useContext } from 'react';
import 'regenerator-runtime/runtime';
import styled from 'styled-components';
import ChatBox from './Chat';
import LogBox from './Log';
import RoomContext from '../RoomContext';

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
    font-family: 'Macondo', cursive !important;
    font-size: 1.15em;
    display: flex;
    height: 4vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-shadow: 2px 2px 2px black;
    background-color: #394361;
    border-bottom: 1px solid #b1bcd18d;
    border-radius: 5px 5px 0px 0px;
  }

  .log-header {
    font-family: 'Macondo', cursive !important;
    font-size: 1.15em;
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

  .log-body .message-container {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .log-body .message-container::-webkit-scrollbar {
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
    background-color: #079800c3;
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
