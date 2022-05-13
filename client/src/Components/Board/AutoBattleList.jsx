/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

  & .icon {
    cursor: pointer;
    align-self: center;
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

function AutoBattleList({
  monsters, setBattleList, id, battle = { attacker: null, defender: null, attack: null },
}) {
  const [selectedMonster, setSelectedMonster] = useState(battle.attacker);
  const [selectOpponent, setSelectedOpponent] = useState(battle.defender);
  const [attacks, setAttacks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [myBattle, setMyBattle] = useState({});

  const renderMonsters = function (set) {
    return set.map((monster) => (
      <option key={monster.id} label={monster.name} value={JSON.stringify(monster)}>
        {monster.name}
      </option>
    ));
  };

  // // For further implementation
  // const handleDelete = function(index) {
  //   console.log('BattleList which we are iterating over.', battleList);
  //   console.log('here is my index', index);
  //   // setMonsterListCounter((prev) => {
  //   //   let counterCopy = [...prev];
  //   //   counterCopy.splice(index, 1);
  //   //   console.log('prevv', counterCopy)
  //   //   return counterCopy;
  //   // });
  //   setBattleList((prev) => {
  //     let copy = [...prev];
  //     console.log('battleList', copy);
  //     copy.splice(id, 1);
  //     console.log('spliced', copy);
  //     return copy;
  //   });
  // }

  useEffect(() => {
    setBattleList((list) => {
      const tempList = [...list];
      tempList[id] = { ...myBattle };
      return tempList;
    });
  }, [myBattle]);

  return (
    <BattleCardDiv>
      <BattleCardLeft>
        <div className="custom-dropdown">
          <select onChange={(e) => {
            const currentMonster = JSON.parse(e.target.value);
            setSelectedMonster(currentMonster);
            setMyBattle((prev) => ({ ...prev, attacker: currentMonster }));
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

        {selectedMonster && (
          <MonsterHeader>
            <img src={selectedMonster.image} alt="" />
            {selectedMonster.name}
          </MonsterHeader>
        )}

        {selectedMonster && selectedMonster.attacks.map((attack, i) => (
          <AttackListStyled>
            {selectedMonster && (
              <AttackListItem
                className={attack === selectedItem ? 'selected' : ''}
                onClick={() => {
                  setAttacks((prev) => [...prev, attack]);
                  setSelectedItem(attack);
                  setMyBattle((prev) => ({ ...prev, attack }));
                }}
              >
                <div>
                  Attack:c
                  {attack.attack}
                  <br />
                  Attack Name:&nbsp;
                  {attack.attackName}
                  <br />
                  {' '}
                  Damage:&nbsp;
                  {attack.damage}
                  <br />
                  Multiplier:&nbsp;
                  {attack.multiplier}
                  <br />
                  Range:&nbsp;
                  {attack.range}
                </div>
              </AttackListItem>
            )}
          </AttackListStyled>
        ))}

      </BattleCardLeft>

      <BattleCardRight>
        <div className="custom-dropdown">
          <select onChange={(e) => {
            const currentMonster = JSON.parse(e.target.value);
            setSelectedOpponent(currentMonster);
            setMyBattle((prev) => ({ ...prev, defender: currentMonster }));
            // setBattleList((list) => list[id].defender = currentMonster)
          }}
          >
            <option value="" disabled selected>Select Opponent</option>
            {renderMonsters(monsters[1])}
          </select>

          {selectOpponent
          && (
            <div style={{ marginTop: '20px' }}>
              <MonsterHeader2>
                <img src={selectOpponent.image} alt="defender" />
                {selectOpponent.name}
                <br />
              </MonsterHeader2>
              Armor:
              {' '}
              {selectOpponent.armor}
              <br />
              Health:
              {' '}
              {selectOpponent.maxHealth}
              <br />
              Current Health:
              {' '}
              {selectOpponent.currentHealth}
              <br />
            </div>
          )}
        </div>
      </BattleCardRight>
      {/* <div style={{float: 'right', display: 'flex'}}>
        <button
            className="icon"
            value={id}
            style={{
              fontFamily: 'Font Awesome 5 Free',
              color: 'red',
            }}
            onClick={(e) => {handleDelete(e.target.value)}}
          >
            ⓧ
        </button>
      </div> */}
    </BattleCardDiv>
  );
}

export default AutoBattleList;
