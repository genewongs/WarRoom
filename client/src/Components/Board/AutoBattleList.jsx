import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../UserContext';

const BattleCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #20222a;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0px;
  justify-content: center;

  img {
    width: 50px;
    height: 50px;
    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(-45deg,#0025ff,#89c5ff,#dddddd,#89c5ff,#0025ff) 1;
    margin: 4px 8px;
  }
`;

const BattleCardLeft = styled.div`
  flex-grow: 1;
  width: 100%;
  margin: 0px 20px;
  border-radius: 10px;
  border-top: 1px solid black;

  select {

  }
`;

const AttackListStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #222129;
  border-radius: 5px;
`;

const AttackListItem = styled.div`
  width: 100%;
  font-size: .9em;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 10px 20px;
  margin: 5px 0px;
  border-radius: 3px;
  transition: all ease-in-out 0.1s;
  background-color: #2d3443;
  box-shadow: 2px 2px 2px #161617;

  &.selected {
    box-shadow: 5px 4px 3px #49546e;
    background-image: linear-gradient(to right, rgba(255,0,0,0), #60719a);
  }

  &:hover{
    transition: all ease-in-out 0.1s;
    transform: scale(1.02);
    background-color: #3c4361cd;
  }
`;

const BattleCardRight = styled.div`
  flex-grow: 1;
  width: 100%;
  margin: 0px 20px;
  border-radius: 10px;
  border-top: 1px solid black;
`;

const MonsterHeader = styled.div`
  font-family: 'Macondo', cursive;
  display: flex;
  align-items: center;
  text-shadow: 2px 2px 2px #161617;
  width: 100%;
  margin-top: 20px;
  border-radius: 3px;
  background-image: linear-gradient(to top, rgba(255,0,0,0), #ff000078);
`;

const MonsterHeader2 = styled.div`
  font-family: 'Macondo', cursive;
  display: flex;
  align-items: center;
  text-shadow: 2px 2px 2px #161617;
  width: 100%;
  margin-top: 20px;
  border-radius: 3px;
  background-image: linear-gradient(to top, rgba(255,0,0,0), #0033ff99);
`;

function AutoBattleList({ monsters, setBattleList, battleList, id }) {
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [selectOpponent, setSelectedOpponent] = useState(null);
  const [attacks, setAttacks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [myBattle, setMyBattle] = useState({});

  const renderMonsters = function(set) {
    return set.map((monster) => (
      <option key={monster.id} label={monster.name} value={JSON.stringify(monster)}>
        {monster.name}
      </option>
    ));
  };

  useEffect(() => {
    setBattleList((list) => {
      const tempList = [...list];
      tempList[id] = { ...myBattle };
      return tempList;
    })
  }, [myBattle]);

  return (
    <BattleCardDiv>
      <BattleCardLeft>
        <div className="custom-dropdown">
          <select onChange={(e) => {
            const currentMonster = JSON.parse(e.target.value);
            setSelectedMonster(currentMonster);
            setMyBattle((prev) => {return {...prev, attacker: currentMonster}});
          }}
          >
            <option
              value=""
              disabled
              selected
            >
              Select Monster
            </option>
            {renderMonsters(monsters[0])}
          </select>
        </div>

        {selectedMonster &&
          <MonsterHeader>
            <img src={selectedMonster.image} />
            {selectedMonster.name}
          </MonsterHeader>
        }

        {selectedMonster && selectedMonster.attacks.map((attack, i) => (
          <AttackListStyled>
            {selectedMonster &&
              <AttackListItem
                className={attack === selectedItem ? 'selected' : ''}
                onClick={() => {
                setAttacks((prev) => [...prev, attack]);
                setSelectedItem(attack);
                setMyBattle((prev) => {return {...prev, attack, }});
              }}
              >
                <div>
                  Attack:c
                  {attack.attack}
                  <br></br>
                  Attack Name:&nbsp;
                  {attack.attackName}
                  <br></br>
                  {' '}
                  Damage:&nbsp;
                  {attack.damage}
                  <br></br>
                  Multiplier:&nbsp;
                  {attack.multiplier}
                  <br></br>
                  Range:&nbsp;
                  {attack.range}
                </div>
              </AttackListItem>
            }
          </AttackListStyled>
        ))}

      </BattleCardLeft>

      <BattleCardRight>
        <div className="custom-dropdown">
          <select onChange={(e) => {
            const currentMonster = JSON.parse(e.target.value);
            setSelectedOpponent(currentMonster);
            setMyBattle((prev) =>  {return {...prev, defender: currentMonster}});
            // setBattleList((list) => list[id].defender = currentMonster)
          }}>
            <option value="" disabled selected>Select Opponent</option>
            {renderMonsters(monsters[1])}
          </select>

          {selectOpponent &&
            <div style={{marginTop: '20px'}}>
              <MonsterHeader2>
                <img src={selectOpponent.image}></img>
                {selectOpponent.name} <br></br>
              </MonsterHeader2>
              Armor: {selectOpponent.armor} <br></br>
              Health: {selectOpponent.maxHealth} <br></br>
              Current Health: {selectOpponent.currentHealth} <br></br>
            </div>
          }
        </div>
      </BattleCardRight>
    </BattleCardDiv>
  );
}

export default AutoBattleList;
