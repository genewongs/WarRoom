import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icons from './create/Icons';
import Attacks from './create/Attacks';
import CSS from './create/css';

const axios = require('axios');

function Create() {
  const [iconArr, setIconArr] = useState(['Blob.jpg',
    'Hunter.jpg',
    'SkullLord.jpg',
    'Thief.jpg',
    'amethystDragon.jpg',
    'boneWarrior.png',
    'chomp.jpg',
    'demonLord.jpg',
    'dragonSkellie.jpg',
    'eyeBall.jpg',
    'fox.jpg',
    'ghoul.png',
    'greenDragon.jpg',
    'iceBug.jpg',
    'iceDragon.jpg',
    'iceMage.jpg',
    'iceQueen.jpg',
    'impBoi.png',
    'impDemon.jpg',
    'impGnome.jpg',
    'impGurl.jpg',
    'ironMage.jpg',
    'jackDragon.png',
    'mage.jpg',
    'minotaur.png',
    'octoman.jpg',
    'octopus.jpg',
    'oldWizard.jpg',
    'reaperOctopus.jpg',
    'tigerWarrior.jpg',
    'troll.jpg',
    'turqoiseDragon.jpg',
    'warrior.jpg',
    'zombie.jpg']);
  const [icon, setIcon] = useState('Hunter.jpg');
  const [renderI, setRenderI] = useState(false);
  const [attackArr, setAttackArr] = useState([{
    attackName: 'none',
    attack: 'none',
    multiplier: 0,
    damage: 'none',
  }]);
  const renderIcons = function renderIcons() {
    return (
      <div>
        {iconArr.map((e) => (<Icons current={e} selected={icon} setIcon={setIcon} />))}
        <CSS.MainButtons type="button" onClick={() => setRenderI(false)}>Close Icon List</CSS.MainButtons>
      </div>
    );
  };
  let count = 0;
  const addAttack = function addAttack() {
    attackArr.push({
      attackName: 'none',
      attack: 'none',
      multiplier: 0,
      damage: 'none',
    });
  };
  const deleteAttack = function deleteAttack(index) {
    attackArr.splice(index, 1);
  };
  return (
    <CSS.CreateContainer>
      <div>
        Name:&nbsp;
        <CSS.Input type="text" id="nickname" maxLength="60" placeholder="Example: skeleton" />
      </div>
      <div>
        Description:&nbsp;
        <CSS.Input type="text" id="Description" maxLength="1000" placeholder="Example: Level 3 fighter" />
      </div>
      <div>
        Icon:
        <CSS.SelectedIcon
          src={`./assets/monsters/icons/${icon}`}
          alt={icon}
          loading="lazy"
        />
      </div>
      <div>
        {renderI
          ? renderIcons()
          : <CSS.MainButtons type="button" onClick={() => setRenderI(true)}>Icon List</CSS.MainButtons>}
      </div>

      <div>
        Stats
      </div>
      <div>
        Armor:&nbsp;
        <CSS.Input type="number" id="Armor" maxLength="60" placeholder="Example: 12" />
      </div>
      <div>
        Health:&nbsp;
        <CSS.Input type="number" id="Health" maxLength="60" placeholder="Example: 20" />
      </div>
      <div>
        Movement:&nbsp;
        <CSS.Input type="number" id="Movement" maxLength="60" placeholder="Example: 30" />
      </div>
      <div>
        Attacks
      </div>
      {attackArr.map((e) => {
        count += 1;
        return (
          <Attacks obj={e} deleteAttack={(index) => deleteAttack(index)} index={count} />
        );
      })}
      <div>
        <button type="button" onClick={() => addAttack()}>Add Attack</button>
      </div>
    </CSS.CreateContainer>
  );
}

export default Create;
