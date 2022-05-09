import React, { useState } from 'react';
import styled from 'styled-components';
import sampleArray from './../../exampleData/data';

const DetailsContainer = styled.div`
  margin: 2% 1% 1%;
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  width: 95%;
  z-index: 100;
`;

const TopContainer = styled.div`
  display: flex;
  margin: 15px;

`;

const IconContainer = styled.img`
  width: 33%;
  height: auto;
  display: flex;
  overflow: hidden;
  // border: solid 1px;
`;
const MonsterName = styled.div`
  display: flex;
  width: 66%;
  font-size: x-large;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-align: center;
  color: #8a0303;
  // border: solid 1px;
`;

const Description = styled.div`
  display: flex;
  width: 99%
  font-size: large;
  justify-content: center;
  align-items: center;
  // border: solid 1px;
  text-transform: uppercase;
  font-style: italic;
  color: #8a0303;
`;

const StatsContainer = styled.div`
  // display: flex;
  margin: 15px;
`;

const AttacksContainer = styled.div`
  margin: 15px;
  text-transform: uppercase;
`;

const AttackTitle = styled.div`
  font-size: large;
  text-align: center;
`;

const StyledLeftTD = styled.div`
  width: 100px;
`;

const StyledAttackTable = styled.table`
  margin-left: 1em;
`;

function Details({}) {
  const [monster, setMonster] = useState(sampleArray.Zelroth[0]);

  return (
    <DetailsContainer>
      <TopContainer>
        <IconContainer src={`${monster.image}`} alt="something" />
        <MonsterName>{monster.name}</MonsterName>
      </TopContainer>
      <Description>{monster.description}</Description>
      <StatsContainer>
        <table>
          <tr>
            <StyledLeftTD>HEALTH: </StyledLeftTD>
            <td>{monster.currentHealth}/{monster.maxHealth} </td>
          </tr>
          <tr>
            <StyledLeftTD>ARMOR: </StyledLeftTD>
            <td>{monster.armor}</td>
          </tr>
          <tr>
            <StyledLeftTD>MOVEMENT: </StyledLeftTD>
            <td>{monster.movement}</td>
          </tr>
        </table>

        {/* <div>HEALTH: {monster.currentHealth}/{monster.maxHealth} <progress value={monster.currentHealth} max={monster.maxHealth} /> </div>
        <div>ARMOR: {monster.armor}</div>
        <div>MOVEMENT: {monster.movement}</div> */}
      </StatsContainer>
      <AttacksContainer>
        <AttackTitle>Attacks</AttackTitle>
        <hr />
        {monster.attacks.map((e) => (
          <>
            {e.attackName}
            <StyledAttackTable>
              <tr>
                <StyledLeftTD>Attack: </StyledLeftTD>
                <td>{e.attack}</td>
              </tr>
              <tr>
                <StyledLeftTD>Damage: </StyledLeftTD>
                <td>{e.damage}</td>
              </tr>
              <tr>
                <StyledLeftTD>Multiplier: </StyledLeftTD>
                <td>{e.multiplier}</td>
              </tr>
            </StyledAttackTable>
            <hr />
            {/* <div>
              Name: {e.attackName}
            </div>
            <div>
              Attack: {e.multiplier > 1 ? `(` : ''}{e.attack}{e.multiplier > 1 ? `)* ${e.multiplier}` : ''}
            </div>
            <div>
              Damage: {e.damage}
            </div> */}
          </>
        )
        )}
      </AttacksContainer>

    </DetailsContainer>
  );
}

export default Details;
