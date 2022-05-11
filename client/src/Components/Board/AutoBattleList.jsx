import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../UserContext';

const BattleCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #0071fc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
  }
`;

const BattleCardLeft = styled.div`
  flex-grow: 1;
  background-color: red;
  width: 100%;

  select {
    width: 20px !important;
    border: 10px solid purple !important;
  }
`;

const BattleCardRight = styled.div`
  flex-grow: 1;
  background-color: red;
  width: 100%;
`;

function AutoBattleList({ monsters }) {
  const [selectedMonster, setSelectedMonster] = useState({
    "userName": "alex",
    "name": "Zapootu",
    "armor": "33",
    "onBoard": true,
    "currentHealth": "42",
    "maxHealth": "42",
    "image": "./assets/monsters/icons/ghoul.png",
    "attacks": [
        {
            "attack": "none",
            "multiplier": 1,
            "damage": "none",
            "range": 5,
            "attackName": "none"
        }
    ],
    "locationY": 3,
    "userUID": "wetRKQoXtgYvVyCfQyawBSqaJ7z1",
    "description": "",
    "locationX": 2,
    "movement": "19",
    "id": "yqFoQpQ4btgbGXmIYRyK"
  });
  const [selectOpponent, setSelectedOpponent] = useState(null);

  const { currentUser } = useContext(UserContext);
  const monsterArr = Object.values(monsters);
  const myMonsters = monsterArr.filter((monster) => {return monster.userUID === currentUser.uid});
  const opponentMonsters = monsterArr.filter((monster) => {return monster.userUID !== currentUser.uid});

  console.log('my shit', myMonsters)
  const renderRooms = function(set) {
    return set.map((monster) => (
      <option key={monster.id} label={monster.name} value={monster}>
        {monster.name}
      </option>
    ));
  }

  return (
    <BattleCardDiv>
      <BattleCardLeft>
        <div className="custom-dropdown">
          <select>
            <option value="" disabled selected>Select Monster</option>
              {renderRooms(myMonsters)}
          </select>
        </div>

        <img src={selectedMonster.image}></img>
        {selectedMonster.name}

      </BattleCardLeft>

      <BattleCardRight>
        <div className="custom-dropdown">
          <select>
            <option value="" disabled selected>Select Opponent</option>
              {renderRooms(opponentMonsters)}
          </select>
        </div>
      </BattleCardRight>
    </BattleCardDiv>
  )
}

export default AutoBattleList;