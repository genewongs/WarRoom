/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function LogBox({ socket }) {
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    socket.on('recieve_log_message', (data) => {
      setLogList((logList) => [...logList, data]);
    });
  });

  return (
    <div>
      <div className="log-header">
        <p>Battle Events</p>
      </div>
      <div className="log-body">
        <ScrollToBottom className="message-container">
          {logList.map((logContent) => {
            console.log(logContent)
            if (logContent.message.slice(-9)==='no damage') {
              return (
                <div style={{backgroundColor: 'grey'}} className="log-message">
                  <p>
                    {logContent.message}
                  </p>
                </div>
              )
            } else if (logContent.message.slice(-6) === 'damage') {
              return (
                <div style={{backgroundColor: 'red'}} className="log-message">
                  <p>
                    {logContent.message}
                  </p>
                </div>
              )
            } else {
              return (
                <div style={{backgroundColor: 'green'}} className="log-message">
                  <p>
                    {logContent.message}
                  </p>
                </div>
              )
            }
          })}
        </ScrollToBottom>
      </div>
    </div>
  );
}

export default LogBox;
