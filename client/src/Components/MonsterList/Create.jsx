import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Icons from './create/Icons';
import Attacks from './create/Attacks';
// import { getUsers } from '../../firebase-config';
import UserContext from '../UserContext';
import CSS from './create/css.jsx';

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
  // console.log('all users', getUsers());
  // console.log('currentUser in monster list', currentUser.uid);
  // // renders all icons for user to click from
  const renderIcons = function renderIcons() {
    return (
      <div className="iconContainer">
        <div className="iconSet">
          {iconArr.map((e) => (<Icons style={{ border: '1px solid black' }} current={e} selected={icon} setIcon={setIcon} />))}
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
  const Submit = function Submit() {
    /*
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
      */
    console.log({
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
    });
  };
  return (
    <CSS.CreateContainer>
      <div className="attribute">
        <h4>Name</h4>
        <CSS.Input type="text" id="nickname" maxLength="60" placeholder="Ex: Skeleton" onChange={(e) => setName(e.target.value)} />
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
        <CSS.Input type="number" id="Movement" maxLength="60" placeholder="0" onChange={(e) => setMovement(e.target.value)} />
      </div>
      <div className="attribute-attack">
        <h4>Attacks</h4>
<<<<<<< HEAD
        <CSS.AttackBox>
          {attackArr.map(() => {
            count += 1;
            return (
              <Attacks
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
=======
      {attackArr.map(() => {
        count += 1;
        return (
          <Attacks
            setAttack={(index, key, value) => setAttack(index, key, value)}
            deleteAttack={(index) => deleteAttack(index)}
            addAttack={addAttack}
            count={count}
          />
        );
      })}
>>>>>>> 75e43499ca4d71b3048996f4fd1dadf2fff897d7
      </div>
      <button className="confirm-monster" type="button" onClick={() => Submit()}>Add Monster(s)</button>
    </CSS.CreateContainer>
  );
}

export default Create;
