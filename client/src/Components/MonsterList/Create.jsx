import React, { useState, useContext } from 'react';
import Icons from './create/Icons';
import Attacks from './create/Attacks';
import { addUsers, getUsers } from '../../firebase-config';
import UserContext from '../UserContext';
import CSS from './create/css';

function Create() {
  const [iconArr] = useState([
    'Blob.jpg',
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
    attackName: 'none',
    attack: 'none',
    multiplier: 1,
    damage: 'none',
    range: 5,
  }]);
  const [quantity, setQuantity] = useState(1);
  // access current user
  const { currentUser } = useContext(UserContext);
  // console.log('userName in monster list', currentUser.displayName);
  console.log('all users', getUsers());
  // console.log('currentUser in monster list', currentUser.uid);
  // // renders all icons for user to click from
  const renderIcons = function renderIcons() {
    return (
      <div>
        {iconArr.map((e) => (<Icons current={e} selected={icon} setIcon={setIcon} />))}
        <button type="button" onClick={() => setRenderI(false)}>Close Icon List</button>
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
  const Submit = function Submit() {
    addUsers({
      userUID: currentUser.uid,
      userName: currentUser.displayName,
      name,
      description,
      armor,
      maxHealth: health,
      currentHealth: health,
      movement,
      image: `./assets/monsters/icons/${icon}`,
      attackArr,
      onBoard: false,
      locationX: -1,
      locationY: -1,
    })
      .then((res) => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
          Submit();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <CSS.CreateContainer>
      <div>
        Name:&nbsp;
        <CSS.Input type="text" id="nickname" maxLength="60" placeholder="Example: skeleton" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Description:&nbsp;
        <CSS.Input type="text" id="Description" maxLength="1000" placeholder="Example: Level 3 fighter" onChange={(e) => setDescription(e.target.value)} />
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
          : <button type="button" onClick={() => setRenderI(true)}>Icon List</button>}
      </div>

      <div>
        Stats
      </div>
      <div>
        Armor:&nbsp;
        <CSS.Input type="number" id="Armor" maxLength="60" placeholder="0" onChange={(e) => setArmor(e.target.value)} />
      </div>
      <div>
        Health:&nbsp;
        <CSS.Input type="number" id="Health" maxLength="60" placeholder="0" onChange={(e) => setHealth(e.target.value)} />
      </div>
      <div>
        Movement:&nbsp;
        <CSS.Input type="number" id="Movement" maxLength="60" placeholder="0" onChange={(e) => setMovement(e.target.value)} />
      </div>
      <div>
        Attacks
      </div>
      {attackArr.map(() => {
        count += 1;
        return (
          <Attacks
            setAttack={(index, key, value) => setAttack(index, key, value)}
            deleteAttack={(index) => deleteAttack(index)}
            count={count}
          />
        );
      })}
      <div>
        <button type="button" onClick={() => addAttack()}>Add Attack</button>
      </div>
      <div>
        Quantity: &nbsp;
        <CSS.Short type="number" id="Health" maxLength="60" placeholder="1" onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <button type="button" onClick={() => Submit()}>Submit</button>
    </CSS.CreateContainer>
  );
}

export default Create;
