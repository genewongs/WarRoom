/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function LogBox({ socket, setLogList, logList }) {
  useEffect(() => {
    socket.on('recieve_log_message', (data) => {
      console.log('data', data);
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
            if (logContent.message.slice(-9) === 'no damage') {
              return (
                <div style={{ backgroundColor: '#444356' }} className="log-message">
                  <p>
                    {logContent.message}
                  </p>
                </div>
              );
            } if (logContent.message.slice(-6) === 'damage') {
              return (
                <div style={{ backgroundColor: '#740011' }} className="log-message">
                  <p>
                    {logContent.message}
                  </p>
                </div>
              );
            }
            return (
              <div style={{ backgroundColor: '#079800c3' }} className="log-message">
                <p>
                  {logContent.message}
                </p>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
    </div>
  );
}

export default LogBox;
