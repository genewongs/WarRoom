/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  BattleCardDiv,
  BattleCardLeft,
  AttackListStyled,
  AttackListItem,
  BattleCardRight,
  BattleCardRightInfo,
  MonsterHeader,
  MonsterHeader2,
} from './StyledComps/AutoBattleListCSS';

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
              <BattleCardRightInfo>
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
              </BattleCardRightInfo>
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
