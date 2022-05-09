import React, { useState } from 'react';
import styled from 'styled-components';
import { Battle } from './utils/BattleFunc';

import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const AttackList = styled.div`
  width: 180px;
  height: 95%;
  font-size: 12px;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background: #52585c;
  border-radius: 3px;
  margin-right: 5px;
  h4 {
    text-align: center;
    text-shadow: 2px 2px 2px #000000d8;
  }
  & .listHeadAttacker {
    font-size: 1em;
    font-weight: bold;
    width: 100%;
    background-color: #222225;
    padding-left: 5px;
  }
  & .active {
    /* border-top: 1px solid red;
    border-bottom: 1px solid red; */
    text-shadow: 1px 1px 2px red;
  }
  li {
    padding-left: 10px;
  }
  > .attackListStyle {
    height: 20px;
    background-color: #ff000085;
  }
`;

const DefenderStats = styled.div`
  width: 90px;
  height: 95%;
  font-size: 12px;
  background: #52585c;
  border-radius: 3px;
  h4 {
    text-align: center;
    text-shadow: 2px 2px 2px #000000d8;
  }
  & .defenderList {
    list-style: none;
  }
  & .defenderListStyle {
    text-align: center;
    height: 20px;
    background-color: #0037ff;
  }
  & .listHeadDefender {
    font-size: 1em;
    font-weight: bold;
    max-height: 20px;
    max-width: 100%;
    background-color: #1b7eff;
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 0px 5px;
  }
`;

function AttackCard({ attacker, defender, setAttacker, setDefender, onBoard, setOnBoard, dimension, isDying, setIsDying, fadeOut }) {
  const [chosenAttack, setChosenAttack] = useState(null);

  function handleAttack() {
    let multiple = chosenAttack.multiplier;
    while (multiple >= 0) {
      console.log(Battle(attacker, defender, chosenAttack));
      multiple -= 1;
    }
    if (defender.currentHealth <= 0) {
      const index = (defender.locationX * dimension) + defender.locationY;
      fadeOut(setTimeout(() => {
        setAttacker(null)
        setOnBoard((previous) => ({
          ...previous,
          [index]: null,
        }))
      }, 1000));
      }
    setAttacker(null);
    setDefender(null);
  }
  return (
    (attacker && defender) ? (
      <>
        <AttackList>
          <div className='attackListStyle' >
            <h4>ATTACKER</h4>
            {attacker.attacks.map((attack) => (
              <ul onClick={() => setChosenAttack(attack)}>
                <div className={`listHeadAttacker ${chosenAttack === attack ? 'active' : ''}`}> {attack.attackName} </div>
                <li>
                  Attack: {attack.attack}
                </li>
                <li>
                  Damage: {attack.damage}
                </li>
                <li>
                  Multiplier: {attack.multiplier}
                </li>
              </ul>
            ))
            }
          </div>
        </AttackList>
        <DefenderStats>
          <div className="defenderListStyle">
            <h4>DEFENDER</h4>
            <ul className="defenderList">
              <div className="listHeadDefender">{defender.name}</div>
              <li>
                Health: {defender.currentHealth}
              </li>
              <li>
                Armor: {defender.armor}
              </li>
            </ul>
            <Button
              variant="contained"
              color="secondary"
              disabled={!chosenAttack}
              style={{
                backgroundColor: !chosenAttack ? '#35353c' : '#7c0000',
              }}
              onClick={() => handleAttack()}
            >
              Attack
            </Button>
          </div>
        </DefenderStats>
      </>
    ) : null
  );
}

export default AttackCard;
