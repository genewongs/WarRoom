/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function LogBox({ socket }) {
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    socket.on('recieve_log_message', (data) => {
      setLogList([...logList, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="log-header">
        <p>Battle Events</p>
      </div>
      <div className="log-body">
        {logList.map((logContent) => (
          <div className="log-message">
            <p>
              {logContent.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogBox;
