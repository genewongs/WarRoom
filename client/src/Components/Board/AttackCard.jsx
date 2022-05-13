/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import RoomContext from '../RoomContext';
import { Battle } from './utils/BattleFunc';

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
    padding: 1px 0px 1px 5px;
    transition: all ease-in-out 0.2s;
    &:hover {
      cursor: pointer;
    }
  }
  & .active {
    text-shadow: 1px 1px 2px red;
    color: #ffcc00;
    transition: all ease-in-out 0.2s;
  }
  li {
    padding-left: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  li:last-child {
    padding-bottom: 4px;
  }
  > .attackListStyle {
    height: 25px;
    background-color: #ff0000a6;
  }
`;

const DefenderStats = styled.div`
  width: 90px;
  height: 95%;
  border-radius: 3px;
  font-size: 12px;
  background: #52585c;
  h4 {
    text-align: center;
    text-shadow: 2px 2px 2px #000000d8;
  }
  & .defenderList {
    list-style: none;
    margin-bottom: 28px;
  }
  & .defenderListStyle {
    text-align: center;
    height: 20px;
    border-radius: 3px;
    background-color: #0037ffdf;
  }
  & .listHeadDefender {
    font-size: 1em;
    font-weight: bold;
    max-height: 18px;
    max-width: 100%;
    background-color: #388effd2;
    border-radius: 0 0 3px 3px;
    text-shadow: 2px 2px 2px #00000093;
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 0px 5px;
    margin-bottom: 2px;
  }
`;

function AttackCard({
  attacker, defender, setAttacker, setDefender, onBoard, setOnBoard, dimension, isDying, setIsDying, fadeOut, sendNewBoard
}) {
  const [chosenAttack, setChosenAttack] = useState(null);
  const { room, socket } = useContext(RoomContext);

  const allowedAttacks = attacker.attacks.filter(
    (each) => each.range >= (
      Math.abs(attacker.locationX - defender.locationX)
      + Math.abs(attacker.locationY - defender.locationY)
    ) * 5,
  );
  async function handleAttack() {
    let multiple = chosenAttack.multiplier;
    while (multiple > 0) {
      const message = await Battle(attacker, defender, chosenAttack);
      // console.log(Battle(attacker, defender, chosenAttack));
      const logMessageData = {
        message,
        board: room,
        id: uuidv4(),
      };
      socket.emit('send_log_message', logMessageData);
      multiple -= 1;
    }

    if (defender.currentHealth <= 0) {
      const index = (defender.locationX * dimension) + defender.locationY;
      fadeOut(setTimeout(() => {
        setAttacker(null);
        setOnBoard(() => {
          const tempBoard = { ...onBoard };
          delete tempBoard[index];
          sendNewBoard(tempBoard);
          return tempBoard;
        });
      }, 1000));
    }
    setAttacker(null);
    setDefender(null);
  }
  return (
    (attacker && defender) ? (
      <>
        <AttackList>
          <div className="attackListStyle">
            <h4>ATTACKER</h4>
            {allowedAttacks.map((attack, index) => (
              <ul key={index}>
                <div
                  className={`listHeadAttacker ${chosenAttack === attack ? 'active' : ''}`}
                  onClick={() => setChosenAttack(attack)}
                >
                  {attack.attackName}
                </div>
                <li>
                  Attack:
                  {' '}
                  {attack.attack}
                </li>
                <li>
                  Damage:
                  {' '}
                  {attack.damage}
                </li>
                <li>
                  Multiplier:
                  {' '}
                  {attack.multiplier}
                </li>
              </ul>
            ))}
          </div>
        </AttackList>
        <DefenderStats>
          <div className="defenderListStyle">
            <h4>DEFENDER</h4>
            <ul className="defenderList">
              <div className="listHeadDefender">{defender.name}</div>
              <li>
                Health:
                {' '}
                {defender.currentHealth}
              </li>
              <li>
                Armor:
                {' '}
                {defender.armor}
              </li>
            </ul>
            <Button
              variant="contained"
              color="secondary"
              disabled={!chosenAttack}
              style={{
                backgroundColor: !chosenAttack ? '#35353c' : '#b20000',
                fontSize: '1em',
                height: '25px',
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
