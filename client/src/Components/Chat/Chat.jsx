/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function ChatBox({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        author: username,
        room,
        message: currentMessage,
        time:
          `${new Date(Date.now()).getHours()
          }:${new Date(Date.now()).getMinutes()}`,
      };
      await socket.emit('send_message', messageData);
      setMessageList((messageList) => [...messageList, messageData]);
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setMessageList((messageList) => [...messageList, data]);
    });
  }, [socket]);

  return (
    <div style={{ border: '1px solid black' }}>
      <div className="chat-header">
        <p>Live Battle Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => (
          <div className="message">
            <div className="message-content">
              <p>
                {messageContent.author}
                {' '}
                says "
                {messageContent.message}
                "
              </p>
            </div>
            <div className="message-meta">
              <p>
                at
                {messageContent.time}
              </p>
              <p />
            </div>
          </div>
        ))}
      </div>
      <div className="chat-footer" style={{ border: '1px solid red' }}>
        <input
          className="message-bar"
          style={{ width: '24.8vh', height: '3vh' }}
          type="text"
          placeholder="Hey..."
          value={currentMessage}
          onKeyDown={(event) => handleKeypress(event)}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button
          type="submit"
          style={{ height: '3.5vh' }}
          onClick={() => { sendMessage(); setCurrentMessage(''); }}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
