import React, { useState, useEffect, useContext } from 'react';
import { updateUserMonster, deleteUsers } from '../../firebase-config';
import UserContext from '../UserContext';
import CSS from './create/css';
import {
  DetailsContainer,
  TopContainer,
  IconContainer,
  MonsterName,
  Description,
  StatsContainer,
  AttacksContainer,
  AttackTitle,
  StyledLeftTD,
  StyledAttackTable,
} from './StyledComps/DetailsCSS';

function Details({ monster, deleteMonster }) {
  // const [monster, setMonster] = useState(sampleArray.Zelroth[0]);
  const { currentUser, userList } = useContext(UserContext);
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editHealth, setEditHealth] = useState(false);
  const [editArmor, setEditArmor] = useState(false);
  const [editMovement, setEditMovement] = useState(false);
  const [editAttack, setEditAttack] = useState(false);
  const [copiedMonster, setCopiedMonster] = useState(
    JSON.parse(JSON.stringify(monster)),
  );
  useEffect(() => {
    setCopiedMonster(JSON.parse(JSON.stringify(monster)));
  }, [monster]);
  // Need to check if monsterID is accessible
  function change() {
    let badData = false;
    let badDataMessage = '';
    const rollRegex = /^\d+d\d+ \+ \d+$/;
    for (let i = 0; i < copiedMonster.attacks.length; i += 1) {
      copiedMonster.attacks[i].attack = copiedMonster.attacks[i].attack.replace(/ /g, '');
      copiedMonster.attacks[i].attack = copiedMonster.attacks[i].attack.replace(/D/g, 'd');
      copiedMonster.attacks[i].attack = copiedMonster.attacks[i].attack.replace(/\+/g, ' + ');
      copiedMonster.attacks[i].damage = copiedMonster.attacks[i].damage.replace(/ /g, '');
      copiedMonster.attacks[i].damage = copiedMonster.attacks[i].damage.replace(/D/g, 'd');
      copiedMonster.attacks[i].damage = copiedMonster.attacks[i].damage.replace(/\+/g, ' + ');
      if (copiedMonster.attacks[i].attackName === '') {
        badData = true;
        badDataMessage = 'A attack does not have a name!';
      }
      if (!rollRegex.test(copiedMonster.attacks[i].attack)) {
        badData = true;
        badDataMessage = 'Attack is not formated correctly. Must be (number)d(number) + (number)';
      }
      if (!rollRegex.test(copiedMonster.attacks[i].damage)) {
        badData = true;
        badDataMessage = 'Damage is not formated correctly. Must be (number)d(number) + (number)';
      }
    }
    if (copiedMonster.name === '') {
      alert('Name is blank');
    } else if (badData) {
      alert(badDataMessage);
    } else {
      updateUserMonster(currentUser.displayName, monster.id, copiedMonster)
        .then((data) => console.log("Monster had been updataed", data))
        .catch((err) => console.log("Failed to update monster", err));
    }
  }
  return (
    <DetailsContainer>
      <TopContainer>
        <IconContainer src={`${copiedMonster.image}`} alt="something" />
        <MonsterName onDoubleClick={() => setEditName(true)}>
          <h4>
            {editName ? (
              <CSS.InputFatty
                type="text"
                id="MonsterName"
                maxLength="20"
                value={copiedMonster.name}
                onChange={(e) => {
                  copiedMonster.name = e.target.value;
                  setCopiedMonster({
                    ...copiedMonster,
                  });
                }}
              />
            ) : (
              copiedMonster.name
            )}
          </h4>
        </MonsterName>
      </TopContainer>
      <Description onDoubleClick={() => setEditDescription(true)}>
        {editDescription ? (
          <CSS.InputFatty
            type="text"
            id="Description"
            maxLength="1000"
            value={copiedMonster.description}
            onChange={(e) => {
              copiedMonster.description = e.target.value;
              setCopiedMonster({
                ...copiedMonster,
              });
            }}
          />
        ) : (
          copiedMonster.description
        )}
      </Description>
      <StatsContainer>
        <table>
          <tr>
            <StyledLeftTD>HEALTH: </StyledLeftTD>
            <td onDoubleClick={() => setEditHealth(true)}>
              {editHealth ? (
                <CSS.InputSkinny
                  type="number"
                  id="CurrentHealth"
                  min="0"
                  maxLength="3"
                  value={copiedMonster.currentHealth}
                  onChange={(e) => {
                    copiedMonster.currentHealth = e.target.value;
                    setCopiedMonster({
                      ...copiedMonster,
                    });
                  }}
                />
              ) : (
                copiedMonster.currentHealth
              )}
              /
              {editHealth ? (
                <CSS.InputSkinny
                  type="number"
                  id="MaxHealth"
                  min={copiedMonster.currentHealth}
                  maxLength="3"
                  value={copiedMonster.maxHealth}
                  onChange={(e) => {
                    copiedMonster.maxHealth = e.target.value;
                    setCopiedMonster({
                      ...copiedMonster,
                    });
                  }}
                />
              ) : (
                copiedMonster.maxHealth
              )}{" "}
            </td>
          </tr>
          <tr>
            <StyledLeftTD>ARMOR: </StyledLeftTD>
            <td onDoubleClick={() => setEditArmor(true)}>
              {editArmor ? (
                <CSS.InputSkinny
                  type="number"
                  id="Armor"
                  maxLength="3"
                  min="0"
                  value={copiedMonster.armor}
                  onChange={(e) => {
                    copiedMonster.armor = e.target.value;
                    setCopiedMonster({
                      ...copiedMonster,
                    });
                  }}
                />
              ) : (
                copiedMonster.armor
              )}
            </td>
          </tr>
          <tr>
            <StyledLeftTD>MOVEMENT: </StyledLeftTD>
            <td onDoubleClick={() => setEditMovement(true)}>
              {editMovement ? (
                <CSS.InputSkinny
                  type="number"
                  id="Movement"
                  maxLength="3"
                  min="5"
                  step="5"
                  value={copiedMonster.movement}
                  onChange={(e) => {
                    copiedMonster.movement = e.target.value;
                    setCopiedMonster({
                      ...copiedMonster,
                    });
                  }}
                />
              ) : (
                copiedMonster.movement
              )}
            </td>
          </tr>
        </table>

        {/* <div>HEALTH: {monster.currentHealth}/{monster.maxHealth} <progress value={monster.currentHealth} max={monster.maxHealth} /> </div>
        <div>ARMOR: {monster.armor}</div>
        <div>MOVEMENT: {monster.movement}</div> */}
      </StatsContainer>
      <AttacksContainer>
        <AttackTitle>Attacks</AttackTitle>
        {copiedMonster.attacks.map((e, i) => (
          <div
            className="attackContainer"
            onDoubleClick={() => setEditAttack(true)}
          >
            <h4>
              {editAttack ? (
                <CSS.InputFatty
                  type="text"
                  id="Attack Name"
                  maxLength="20"
                  value={e.attackName}
                  onChange={(d) => {
                    copiedMonster.attacks[i].attackName = d.target.value;
                    setCopiedMonster({
                      ...copiedMonster,
                    });
                  }}
                />
              ) : (
                e.attackName
              )}
            </h4>
            <StyledAttackTable>
              <tr>
                <StyledLeftTD>Attack: </StyledLeftTD>
                <td>
                  {editAttack ? (
                    <CSS.InputFatty
                      type="text"
                      id="Attack"
                      maxLength="10"
                      value={e.attack}
                      onChange={(d) => {
                        copiedMonster.attacks[i].attack = d.target.value;
                        setCopiedMonster({
                          ...copiedMonster,
                        });
                      }}
                    />
                  ) : (
                    e.attack
                  )}
                </td>
              </tr>
              <tr>
                <StyledLeftTD>Damage: </StyledLeftTD>
                <td>
                  {editAttack ? (
                    <CSS.InputFatty
                      type="text"
                      id="Damage"
                      maxLength="10"
                      value={e.damage}
                      onChange={(d) => {
                        copiedMonster.attacks[i].damage = d.target.value;
                        setCopiedMonster({
                          ...copiedMonster,
                        });
                      }}
                    />
                  ) : (
                    e.damage
                  )}
                </td>
              </tr>
              <tr>
                <StyledLeftTD>Multiplier: </StyledLeftTD>
                <td>
                  {editAttack ? (
                    <CSS.InputSkinny
                      type="number"
                      id="Multiplier"
                      min="1"
                      maxLength="3"
                      value={e.multiplier}
                      onChange={(d) => {
                        copiedMonster.attacks[i].multiplier = d.target.value;
                        setCopiedMonster({
                          ...copiedMonster,
                        });
                      }}
                    />
                  ) : (
                    e.multiplier
                  )}
                </td>
              </tr>
              <tr>
                <StyledLeftTD>Range: </StyledLeftTD>
                <td>
                  {editAttack ? (
                    <CSS.InputSkinny
                      type="number"
                      id="Range"
                      min="5"
                      step="5"
                      maxLength="3"
                      value={e.range}
                      onChange={(d) => {
                        copiedMonster.attacks[i].range = d.target.value;
                        setCopiedMonster({
                          ...copiedMonster,
                        });
                      }}
                    />
                  ) : (
                    e.range
                  )}
                </td>
              </tr>
            </StyledAttackTable>
            {/* <div>
              Name: {e.attackName}
            </div>
            <div>
              Attack: {e.multiplier > 1 ? `(` : ''}{e.attack}{e.multiplier > 1 ? `)* ${e.multiplier}` : ''}
            </div>
            <div>
              Damage: {e.damage}
            </div> */}
          </div>
        ))}
      </AttacksContainer>
      <CSS.CharIcon
        type="button"
        className="edit"
        onClick={() => {
          if (
            editName
            || editDescription
            || editArmor
            || editHealth
            || editMovement
            || editAttack
          ) {
            setEditName(false);
            setEditDescription(false);
            setEditArmor(false);
            setEditHealth(false);
            setEditMovement(false);
            setEditAttack(false);
            change();
          } else {
            setEditName(true);
            setEditDescription(true);
            setEditArmor(true);
            setEditHealth(true);
            setEditMovement(true);
            setEditAttack(true);
          }
        }}
      >
        {editName ||
        editDescription ||
        editArmor ||
        editHealth ||
        editMovement ||
        editAttack
          ? 'Submit'
          : 'Edit'}
      </CSS.CharIcon>
      <CSS.CharIcon
        type="button"
        className="delete"
        onClick={() => {
          deleteUsers(currentUser.displayName, monster.id)
            .then(() => deleteMonster(currentUser.displayName, monster.id))
            .catch((err) => console.log('Failed to update monster', err));
        }}
      >
        DELETE
      </CSS.CharIcon>
    </DetailsContainer>
  );
}

export default Details;

/* DELETE THIS LATER... this is just for Elbert's convenience
export const updateUserMonster = (userName, monsterId, updatedArea)=> {
  const docRef = doc(db, userName, monsterId); // monster.userName, monster.id
  updateDoc(docRef, updatedArea);
};
*/
