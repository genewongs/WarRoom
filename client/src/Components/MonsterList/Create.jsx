import React, { useState, useContext } from 'react';
// import TextField from '@mui/material/TextField';
import Icons from './create/Icons';
import Attacks from './create/Attacks';
import { addUserMonster } from '../../firebase-config';
import UserContext from '../UserContext';
import CSS from './create/css';

// eslint-disable-next-line react/prop-types
function Create({ setRender }) {
  const { currentUser } = useContext(UserContext);
  const [iconArr] = useState([
    'Blob.jpg',
    'Hunter.jpg',
    'SkullLord.jpg',
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
    'pug.png',
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
    'chad.png',
    'octopus.jpg',
    'oldWizard.jpg',
    'reaperOctopus.jpg',
    'tigerWarrior.jpg',
    'troll.jpg',
    'turqoiseDragon.jpg',
    'warrior.jpg',
    'zombie.jpg',
    'TargetDummy.jpg',
    'zelroth.png',
  ]);
  const [renderI, setRenderI] = useState(false);
  const [attackRerender, setAttackRerender] = useState(1);
  // hooks used for database
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Hunter.jpg');
  const [armor, setArmor] = useState(0);
  const [health, setHealth] = useState(0);
  const [movement, setMovement] = useState(0);
  const [attackArr] = useState([{
    attackName: '',
    attack: 'none',
    multiplier: 1,
    damage: 'none',
    range: 5,
  }]);
  const [quantity, setQuantity] = useState(1);
  // access current user
  // renders all icons for user to click from
  const renderIcons = function renderIcons() {
    return (
      <div className="iconContainer">
        <div className="iconSet">
          {iconArr.map((e, i) => (<Icons key={i} style={{ border: '1px solid black' }} current={e} selected={icon} setIcon={setIcon} />))}
        </div>
        <CSS.CharIcon type="button" onClick={() => setRenderI(false)}>Close</CSS.CharIcon>
      </div>
    );
  };
  let count = 0;
  // triggers on click of add attack button
  const addAttack = function addAttack() {
    attackArr.push({
      attackName: 'none',
      attack: 'none',
      multiplier: 0,
      damage: 'none',
      range: 5,
    });
    setAttackRerender(attackRerender + 1);
  };
  // triggers on click of X
  const deleteAttack = function deleteAttack(index) {
    attackArr.splice(index, 1);
    setAttackRerender(attackRerender - 1);
  };
  // sets new values to attack
  const setAttack = function setAttack(index, key, value) {
    attackArr[index - 1][key] = value;
  };
  // sends data to database
  function Submit() {
    let badData = false;
    let badDataMessage = '';
    const rollRegex = /^\d+d\d+ \+ \d+$/;
    for (let i = 0; i < attackArr.length; i += 1) {
      attackArr[i].attack = attackArr[i].attack.replace(/ /g, '');
      attackArr[i].attack = attackArr[i].attack.replace(/D/g, 'd');
      attackArr[i].attack = attackArr[i].attack.replace(/\+/g, ' + ');
      attackArr[i].damage = attackArr[i].damage.replace(/ /g, '');
      attackArr[i].damage = attackArr[i].damage.replace(/D/g, 'd');
      attackArr[i].damage = attackArr[i].damage.replace(/\+/g, ' + ');
      if (attackArr[i].attackName === '') {
        badData = true;
        badDataMessage = 'A attack does not have a name!';
      }
      if (!rollRegex.test(attackArr[i].attack)) {
        badData = true;
        badDataMessage = 'Attack is not formated correctly. Must be (number)d(number) + (number)';
      }
      if (!rollRegex.test(attackArr[i].damage)) {
        badData = true;
        badDataMessage = 'Damage is not formated correctly. Must be (number)d(number) + (number)';
      }
    }
    if (name === '') {
      alert('Name is blank');
    } else if (badData) {
      alert(badDataMessage);
    } else {
      const promises = [];
      for (let i = 0; i < quantity; i += 1) {
        promises.push(addUserMonster(currentUser.displayName, {
          userUID: currentUser.uid,
          userName: currentUser.displayName,
          name,
          description,
          armor,
          maxHealth: health,
          currentHealth: health,
          movement,
          image: `./assets/monsters/icons/${icon}`,
          attacks: attackArr,
          onBoard: false,
          locationX: -1,
          locationY: -1,
        }));
      }
      setQuantity(1);
      setRender('List');
      return Promise.all().then((data) => console.log(data)).catch((err) => console.log(err));
    }
  }
  return (
    <CSS.CreateContainer>
      <div className="attribute">
        <h4>Name</h4>
        <CSS.Input type="text" id="nickname" autocomplete='off' maxLength="60" placeholder="Ex: Skeleton" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="attribute">
        <h4>Description</h4>
        <CSS.Input type="text" id="Description" maxLength="1000" placeholder="Ex: Level 3 Fighter" onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="attribute">
        <h4>Icon</h4>
        <CSS.SelectedIcon
          src={`./assets/monsters/icons/${icon}`}
          alt={icon}
          loading="lazy"
        />
      </div>
      <div className="attribute">
        {renderI
          ? renderIcons()
          : <CSS.CharIcon type="button" onClick={() => setRenderI(true)}>Icon List</CSS.CharIcon>}
      </div>

      <div className="attribute">
        <h4>Stats</h4>
      </div>
      <div className="attribute">
        <h4>Armor</h4>
        <CSS.Input type="number" id="Armor" maxLength="60" placeholder="0" onChange={(e) => setArmor(e.target.value)} />
      </div>
      <div className="attribute">
        <h4>Health</h4>
        <CSS.Input type="number" id="Health" maxLength="60" placeholder="0" onChange={(e) => setHealth(e.target.value)} />
      </div>
      <div className="attribute">
        <h4>Movement</h4>
        <CSS.Input type="number" id="Movement" step="5" maxLength="60" placeholder="0" onChange={(e) => setMovement(e.target.value)} />
      </div>
      <div className="attribute-attack">
        <h4>Attacks</h4>
        <CSS.AttackBox>
          {attackArr.map((e, i) => {
            count += 1;
            return (
              <Attacks
                key={i}
                setAttack={(index, key, value) => setAttack(index, key, value)}
                deleteAttack={(index) => deleteAttack(index)}
                addAttack={() => addAttack()}
                count={count}
              />
            );
          })}
        </CSS.AttackBox>
      </div>
      <div className="attribute">
        <h4>Quantity</h4>
        <CSS.Input type="number" id="Quantity" maxLength="60" placeholder="1" onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <button className="confirm-monster" type="button" onClick={() => Submit(quantity)}>Add Monster(s)</button>
    </CSS.CreateContainer>
  );
}

export default Create;
