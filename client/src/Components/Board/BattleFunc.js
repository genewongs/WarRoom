const sampleArray = {
  Zelroth: [
    {
      name: 'Ogre Battler',
      desscription: 'level 68 paladin',
      maxHealth: 13,
      currentHealth: 4,
      armor: 55,
      movment: 35,
      attacks: [
        {
          attackName: 'X Cut',
          attack: '2d6 + 5',
          multiplier: 1,
          damage: '1d20 + 2',
        },
        {
          attackName: 'Firebell Flame',
          attack: '3d6 + 3',
          multiplier: 2,
          damage: '2d3 + 2',
        },
      ],
      onBoard: true,
      locationX: 3,
      locationY: 2,
    },
    {
      name: 'Imp Boi',
      desscription: 'level 99 wizrd',
      maxHealth: 10,
      currentHealth: 4,
      armor: 12,
      movment: 30,
      attacks: [
        {
          attackName: 'quick attack',
          attack: '1d20 + 6',
          multiplier: 2,
          damage: '1d4 + 4',
        },
        {
          attackName: 'heavy attack',
          attack: '1d20 + 6',
          multiplier: 1,
          damage: '2d4 + 6',
        },
      ],
      onBoard: true,
      locationX: 2,
      locationY: 3,
    },
  ],
  Gene: [
    {
      name: 'Prest',
      desscription: 'level 68 paladin',
      maxHealth: 13,
      currentHealth: 13,
      armor: 15,
      movment: 35,
      attacks: [
        {
          attackName: 'Flying squirrels',
          attack: '2d6 + 5',
          multiplier: 4,
          damage: '1d20 + 0',
        },
        {
          attackName: 'quick attack',
          attack: '1d20 + 6',
          multiplier: 2,
          damage: '2d4 + 4',
        },
      ],
      onBoard: true,
      locationX: 2,
      locationY: 3,
    },
    {
      name: 'Imp Boi',
      desscription: 'level 99 wizrd',
      maxHealth: 10,
      currentHealth: 4,
      armor: 12,
      movment: 30,
      attacks: [
        {
          attackName: 'quick attack',
          attack: '1d20 + 6',
          multiplier: 2,
          damage: '1d4 + 4',
        },
        {
          attackName: 'heavy attack',
          attack: '1d20 + 6',
          multiplier: 1,
          damage: '2d4 + 6',
        },
      ],
      onBoard: true,
      locationX: 2,
      locationY: 3,
    },
  ],
};

function chanceTime(range) {
  return Math.ceil(Math.random() * range);
};

function Battle(attack, defender) {
  const numbers = attack.attack.split(' + ');
  const numberOfRolls = Number(numbers[0].slice(0, 1));
  const range = Number(numbers[0].slice(2));
  let modifier = Number(numbers[1]);
  let i = 0;
  while (i < numberOfRolls) {
    modifier += chanceTime(range);
    i += 1;
  }
  console.log(modifier);
};

Battle(sampleArray.Zelroth[0].attacks[0], sampleArray.Zelroth[1]);
module.exports={
  Battle
}

