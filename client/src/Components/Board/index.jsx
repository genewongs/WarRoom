import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import Board from './Board';
import RoomContext from '../RoomContext';
import UserContext from '../UserContext';
import { getUsers } from '../../firebase-config';

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 56%;
`;

function BoardComponent() {
  const { joinRoom, room, socket } = useContext(RoomContext);
  const { currentUser, userList } = useContext(UserContext);
  const [userRoomList, setUserRoomList] = useState([]);
  const [onBoard, setOnBoard] = useState({});
  const dimension = 6 || 8;
  useEffect(() => {
    setUserRoomList(userList.filter((each) => each.room === room));
    console.log(userList);
    if (userRoomList.length) {
      Promise.all(userRoomList.map((user) => (
        getUsers(user.name)
          .then((snapshot) => {
            let books = [];
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

  return ((JSON.stringify(onBoard) !== '{}') || !userList.length) ? (
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
