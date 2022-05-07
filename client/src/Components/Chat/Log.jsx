/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function LogBox({ socket, room }) {
  const [logList, setLogList] = useState([]);

  const message = 'Skeleton attacks Wizard for 3 damange';

  // const createAttack = () => {
  //   const logMessage = Battle(attacker, defender, attack);
  //   const logMessageData = {
  //     message: logMessage,
  //     board: room,
  //   };
  //   socket.emit('send_log_message', logMessageData);
  // };

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
              {message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogBox;
