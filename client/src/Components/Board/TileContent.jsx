import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { Battle } from './utils/BattleFunc';
import AttackCard from './AttackCard';

const MonsterDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const AttackCardStyled = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 100%;
  width: 285px;
  height: 140px;
  background-color: #1f1f23;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #00000076;
  z-index: 10;
  opacity: 1;
`;

function TileContent({
  x, y, index, monster, attacker, setAttacker, defender, setDefender, dimension, onBoard, setOnBoard, setError
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id: index, monster },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [isDying, setIsDying] = useState(false);

  const fadeOut = (cb) => {
    setIsDying(true);
    cb();
  }

  function handleAttack() {
    if (!attacker) {
      setAttacker(monster);
    } else if (attacker && attacker !== monster && !defender) {
      if (
        Math.abs(attacker.locationX - monster.locationX)
        + Math.abs(attacker.locationY - monster.locationY) === 1
      ) {
        setDefender(monster);
      } else {
        setError(true);
        setTimeout(() => {setError(false)}, 3000);
      }
    } else if (attacker === monster) {
      setAttacker(null);
      setDefender(null);
    }
  }

  // useEffect(() => {
  //   handleAttack();
  // }, [defender]);

  return (
    monster?.image
      ? (
        <MonsterDiv>
          <img
            src={monster.image}
            alt="MonsterImage"
            ref={drag}
            onClick={() => handleAttack()}
            style={{
              opacity: isDragging ? '0' : '1',
              width: '90%',
              height: '90%',
              border: attacker === monster ? '3px solid darkred' : '0px',
              transition: 'all ease-in-out 1s',
            }}
            className={isDying ? 'dying' : ''}
          />
          {(attacker && defender && defender === monster)
            ? (
              <AttackCardStyled>
                <AttackCard
                  onBoard={onBoard}
                  setOnBoard={setOnBoard}
                  attacker={attacker}
                  defender={defender}
                  setAttacker={setAttacker}
                  setDefender={setDefender}
                  dimension={dimension}
                  isDying={isDying}
                  setIsDying={setIsDying}
                  fadeOut={fadeOut}
                />
              </AttackCardStyled>
            ) : null}
        </MonsterDiv>
      )
      : null
  );
}

export default TileContent;
