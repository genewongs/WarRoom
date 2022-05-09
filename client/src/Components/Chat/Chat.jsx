/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import UserContext from '../UserContext';

function ChatBox({ socket, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { currentUser } = useContext(UserContext);

  const username = currentUser.displayName;

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
      setMessageList([...messageList, messageData]);
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
    <div style={{ border: '0px' }}>
      <div className="chat-header">
        <div className="chat-header-title">Live Battle Chat</div>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => (
            <div className="message" id={username === messageContent.author ? 'you' : 'other'}>
              <div className="message-content">
                <p>
                  {messageContent.message}
                </p>
              </div>
              <div className="message-meta">
                <p>
                  {' '}
                  by
                  {' '}
                  {' '}
                  {messageContent.author}
                  {' '}
                  {' '}
                  at
                  {' '}
                  {' '}
                  {messageContent.time}
                </p>
                <p />
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            placeholder="Enter a message..."
            name="msg"
            id="msg"
            required
            value={currentMessage}
            onKeyDown={(event) => handleKeypress(event)}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onBlur={() => { setCurrentMessage(''); }}
          />
          <label htmlFor="msg" className="form__label">Message</label>
        </div>
        {/* <input
          className="message-bar"
          type="text"
          placeholder="Enter a message"
          value={currentMessage}
          onKeyDown={(event) => handleKeypress(event)}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        /> */}
        {/* <button
          type="submit"
          style={{ height: '3.5vh', width: '5%' }}
          onClick={() => { sendMessage(); setCurrentMessage(''); }}
        >
        </button> */}
      </div>
      <div className="seperator" />
    </div>
  );
}

export default ChatBox;
