import React, { useEffect, useContext, useState } from 'react';
import Board from './Board';
import RoomContext from '../RoomContext';
import UserContext from '../UserContext';
import { getUsers } from '../../firebase-config';
import BoardContainer from './StyledComps/indexCSS';

function BoardComponent() {
  const { joinRoom, room, socket } = useContext(RoomContext);
  const { currentUser, userList } = useContext(UserContext);
  // const [userRoomList, setUserRoomList] = useState([]);
  const [onBoard, setOnBoard] = useState({});
  const dimension = 6 || 8;
  useEffect(() => {
    const inSameRoom = userList.filter((user) => user.room === room);
    if (inSameRoom.length === 1) {
      setOnBoard({});
    } else if (inSameRoom.length) {
      Promise.all(inSameRoom.map((user) => (
        getUsers(user.name)
          .then((snapshot) => {
            const books = [];
            snapshot.docs.forEach((doc) => {
              books.push({ ...doc.data(), id: doc.id });
            });
            return (books);
          })
          .catch(() => console.log('no such document'))
      )))
        .then((arrMonsterArr) => {
          const allMonsters = {};
          arrMonsterArr.forEach((userMonstersArr) => {
            userMonstersArr.forEach((monster) => {
              if (monster.onBoard) {
                const index = (monster.locationX * dimension) + monster.locationY;
                allMonsters[index] = monster;
              }
            });
          });
          setOnBoard(allMonsters);
        });
    }
  }, [userList]);

  useEffect(() => {
    joinRoom();
  }, []);

  return onBoard ? (
    <BoardContainer>
      <Board
        socket={socket}
        room={room}
        dimension={dimension}
        onBoard={onBoard}
        setOnBoard={setOnBoard}
      />
    </BoardContainer>
  ) : null;
}

export default BoardComponent;
