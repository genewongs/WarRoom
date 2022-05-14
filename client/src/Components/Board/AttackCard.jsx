/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import io from 'socket.io-client';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import RoomContext from '../RoomContext';
import { Battle } from './utils/BattleFunc';
import { AttackList, DefenderStats } from './StyledComps/AttackCardCSS';

function AttackCard({
  attacker,
  defender,
  setAttacker,
  setDefender,
  onBoard, setOnBoard,
  dimension,
  isDying,
  setIsDying,
  fadeOut,
  sendNewBoard,
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
