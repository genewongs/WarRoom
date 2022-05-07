import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sampleArray from './../../exampleData/data';
import Icons from './create/Icons';

const DetailsContainer = styled.div`
  margin: 2% 1% 1%;
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  width: 95%;
  z-index: 100;
`;

function Details({}) {
  const [monster, setMonster] = useState(sampleArray.Zelroth[0]);

  return (
    <DetailsContainer>
      <img src={`./../assets/monsters/icons/${monster.image}`} alt="something" />
      <div>Name: {monster.name}</div>
      <div>Description: {monster.desscription}</div>
      <div>Health: {monster.currentHealth}/{monster.maxHealth}</div>
      <div>Armor Rating: {monster.armor}</div>
      <div>Movement: {monster.movement}</div>
      <div>
        <div>Attacks</div>
        {monster.attacks.map((e) => (
          <>
            <div>
              Name: {e.attackName}
            </div>
            <div>
              Attack: {e.multiplier > 1 ? `(` : ''}{e.attack}{e.multiplier > 1 ? `)* ${e.multiplier}` : ''}
            </div>
            <div>
              Damage: {e.damage}
            </div>
          </>
        )
        )}
      </div>

    </DetailsContainer>
  );
}

export default Details;
