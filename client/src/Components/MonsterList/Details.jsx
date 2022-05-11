import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import sampleArray from "./../../exampleData/data";
import { updateUserMonster, deleteUsers } from "../../firebase-config";
import UserContext from "../UserContext";
import CSS from "./create/css";

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #131516;
  width: 100%;
  max-height: 100%;
  min-height: 100%;
  z-index: 5;
  border-radius: 5px;

  & .edit {
    margin: 0 auto;
  }
  & .delete {
    background-color: #FF0000;
    margin: 0 auto;
    margin-top: 20px
  }
`;

const TopContainer = styled.div`
  display: flex;
  margin: 15px;
  font-family: "Macondo", cursive !important;
`;

const IconContainer = styled.img`
  width: 33%;
  height: auto;
  display: flex;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(
      -45deg,
      #835d1a,
      #bf953f,
      #fbf5b7,
      #bf953f,
      #835d1a
    )
    1;
`;

const MonsterName = styled.div`
  display: flex;
  width: 100%;
  background-image: linear-gradient(to right, rgba(255, 0, 0, 0), #526e9f34);
  border-radius: 3px;
  font-size: x-large;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-align: center;
  color: #cad9eb;
  text-shadow: 1px 1px 1px #000000;
`;

const Description = styled.div`
  display: flex;
  width: 100%
  font-size: large;
  justify-content: center;
  align-items: center;
  // border: solid 1px;
  text-transform: uppercase;
  font-style: italic;
  color: #97b3d2;
  background-color: #1a1d23c5;
  text-shadow: 1px 1px 1px #000000;
`;

const StatsContainer = styled.div`
  margin: 15px;
`;

const AttacksContainer = styled.div`
  margin: 15px;
  text-transform: uppercase;

  tr:nth-last-child() {
    border-bottom: none !important;
  }

  & .attackContainer {
    padding-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid white;
    h4 {
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        #3e497a7d
      );
    }
  }
`;

const AttackTitle = styled.div`
  font-size: large;
  text-align: center;
  background-color: #25293e;
  border-bottom: 1px solid white;
`;

const StyledLeftTD = styled.div`
  width: 100px;
`;

const StyledAttackTable = styled.table`
  margin-left: 1em;
`;

function Details({ monster, deleteMonster }) {
  // const [monster, setMonster] = useState(sampleArray.Zelroth[0]);
  const { currentUser } = useContext(UserContext);
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editHealth, setEditHealth] = useState(false);
  const [editArmor, setEditArmor] = useState(false);
  const [editMovement, setEditMovement] = useState(false);
  const [editAttack, setEditAttack] = useState(false);
  const [copiedMonster, setCopiedMonster] = useState(
    JSON.parse(JSON.stringify(monster))
  );
  useEffect(() => {
    setCopiedMonster(JSON.parse(JSON.stringify(monster)));
    console.log(monster);
  }, [monster]);
  // Need to check if monsterID is accessible
  function change() {
    updateUserMonster(currentUser.displayName, monster.id, copiedMonster)
      .then((data) => console.log("Monster had been updataed", data))
      .catch((err) => console.log("Failed to update monster", err));
  }
  return (
    <DetailsContainer>
      <TopContainer>
        <IconContainer src={`${copiedMonster.image}`} alt="something" />
        <MonsterName
          onDoubleClick={() => setEditName(true)}
          onBlur={() => {
            change();
            setEditName(false);
          }}
        >
          <h4>
            {editName ? (
              <CSS.InputFatty
                type="text"
                id="MonsterName"
                maxLength="20"
                placeholder={copiedMonster.name}
                onChange={(e) => {
                  copiedMonster.name = e.target.value;
                }} // change to onBlur?
              />
            ) : (
              copiedMonster.name
            )}
          </h4>
        </MonsterName>
      </TopContainer>
      <Description
        onDoubleClick={() => setEditDescription(true)}
        onBlur={() => {
          change();
          setEditDescription(false);
        }}
      >
        {editDescription ? (
          <CSS.InputFatty
            type="text"
            id="Description"
            maxLength="1000"
            placeholder={copiedMonster.description}
            onChange={(e) => {
              copiedMonster.description = e.target.value;
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
            <td
              onDoubleClick={() => setEditHealth(true)}
              onBlur={() => {
                change();
                setEditHealth(false);
              }}
            >
              {editHealth ? (
                <CSS.InputSkinny
                  type="number"
                  id="CurrentHealth"
                  maxLength="3"
                  placeholder={copiedMonster.currentHealth}
                  onChange={(e) => {
                    copiedMonster.currentHealth = e.target.value;
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
                  maxLength="3"
                  placeholder={copiedMonster.maxHealth}
                  onChange={(e) => (copiedMonster.maxHealth = e.target.value)}
                />
              ) : (
                copiedMonster.maxHealth
              )}{" "}
            </td>
          </tr>
          <tr>
            <StyledLeftTD>ARMOR: </StyledLeftTD>
            <td
              onDoubleClick={() => setEditArmor(true)}
              onBlur={() => {
                change();
                setEditArmor(false);
              }}
            >
              {editArmor ? (
                <CSS.InputFatty
                  type="number"
                  id="Armor"
                  maxLength="3"
                  placeholder={copiedMonster.armor}
                  onChange={(e) => (copiedMonster.armor = e.target.value)}
                />
              ) : (
                copiedMonster.armor
              )}
            </td>
          </tr>
          <tr>
            <StyledLeftTD>MOVEMENT: </StyledLeftTD>
            <td
              onDoubleClick={() => setEditMovement(true)}
              onBlur={() => {
                change();
                setEditMovement(false);
              }}
            >
              {editMovement ? (
                <CSS.InputSkinny
                  type="number"
                  id="Movement"
                  maxLength="3"
                  step="5"
                  placeholder={copiedMonster.movement}
                  onChange={(e) => (copiedMonster.movement = e.target.value)}
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
            onBlur={() => {
              change();
              setEditAttack(false);
            }}
          >
            <h4>
              {editAttack ? (
                <CSS.InputFatty
                  type="text"
                  id="Attack Name"
                  maxLength="20"
                  placeholder={e.attackName}
                  onChange={(e) =>
                    (copiedMonster.attacks[i].attackName = e.target.value)
                  }
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
                      placeholder={e.attack}
                      onChange={(e) =>
                        (copiedMonster.attacks[i].attack = e.target.value)
                      }
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
                      placeholder={e.damage}
                      onChange={(e) =>
                        (copiedMonster.attacks[i].damage = e.target.value)
                      }
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
                      maxLength="3"
                      placeholder={e.multiplier}
                      onChange={(e) =>
                        (copiedMonster.attacks[i].multiplier = e.target.value)
                      }
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
                      step="5"
                      maxLength="3"
                      placeholder={e.range}
                      onChange={(e) =>
                        (copiedMonster.attacks[i].range = e.target.value)
                      }
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
          if (editName || editDescription || editArmor || editHealth || editMovement || editAttack) {
            setEditName(false);
            setEditDescription(false);
            setEditArmor(false);
            setEditHealth(false);
            setEditMovement(false);
            setEditAttack(false);
          } else {
            setEditName(true);
            setEditDescription(true);
            setEditArmor(true);
            setEditHealth(true);
            setEditMovement(true);
            setEditAttack(true);
          }

          console.log(copiedMonster);
        }}
      >
        {editName || editDescription || editArmor || editHealth || editMovement || editAttack ? 'Submit' : 'Edit'}
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
