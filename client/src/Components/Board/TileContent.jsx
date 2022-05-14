import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import AttackCard from './AttackCard';
import UserContext from '../UserContext';

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
  x, y, index, monster, attacker, setAttacker, defender, setDefender, dimension, onBoard, setOnBoard, setError, sendNewBoard
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
  };

  const { currentUser, userList } = useContext(UserContext);

  function handleAttack() {
    if (!attacker) {
      if (monster.userUID !== currentUser.uid) {
        setError('You do not own that monster');
        setTimeout(() => {setError(false); }, 3000);
      } else {
        setAttacker(monster);
      }
    } else if (attacker && attacker !== monster && !defender) {
      const maxRange = Math.max(...attacker.attacks.map((each)=> each.range));
      console.log('maxRange in handleAttack', maxRange);
      if (
        (Math.abs(attacker.locationX - monster.locationX)
        + Math.abs(attacker.locationY - monster.locationY)) <= Math.floor(maxRange / 5)
      ) {
        if (monster.userUID === currentUser.uid) {
          setError('Trying to attack your own monster?');
          setTimeout(() => { setError(false); }, 3000);
        } else {
          setDefender(monster);
        }
      } else {
        setError('Opponent is too far away');
        setTimeout(() => { setError(false); }, 3000);
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
              cursor: (monster.userUID === currentUser.uid) ? 'grab' : 'default',
              width: '90%',
              height: '90%',
              borderWidth: '3px',
              borderStyle: 'solid',
              borderImage: (attacker === monster ? 'linear-gradient(-45deg, #835d1a, #BF953F, #FBF5B7 ,#BF953F, #835d1a) 1' : monster !== undefined ? `linear-gradient(${(userList.filter((e) => e.name === monster.userName)[0].color)}, ${(userList.filter((e) => e.name === monster.userName)[0].color)}) 1` : 'white'),
              // testing border on image
              // determine the owner of the monster
              // monster.userName
              // userList[i].name
              // iterate through userList to find that specific owner/user
              // userList.filter((e) => e.name !== monster.userName).color
              // take the color property and use it on border property of img tag above
              transition: 'all ease-in-out 1s',
            }}
            className={isDying ? 'dying' : ''}
          /> {console.log(monster !== undefined ? userList.filter((e) => e.name === monster.userName)[0].color : 'white')}
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
                  sendNewBoard={sendNewBoard}
                />
              </AttackCardStyled>
            ) : null}
        </MonsterDiv>
      )
      : null
  );
}

export default TileContent;
