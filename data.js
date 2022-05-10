/*
[
  {
    name: text
    desscription: "level 99 wizrd"
    max health: 4
    current health: 3
    armor: 12
    movment: 30
    attacks: [
      {
        attackName: "quick attack",
        attack: "1d20 + 6",
        multiplier: 2,
        damage: 2d4 + 4,
      }
      {...}
    ]
    onBoard:true,
    locationX: 2,
    locationY: 3,
  }
]
*/

const sampleArray = {
  Zelroth: [
    {
      userUID: 'wetRKQoXtgYvVyCfQyawBSqaJ7z1',
      userName: 'Zelroth',
      name: 'Ogre Battler',
      description: 'level 68 paladin',
      maxHealth: 13,
      currentHealth: 4,
      armor: 55,
      movement: 7,
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
      image: './assets/monsters/icons/warrior.jpg',
    },
    {
      userUID: 'wetRKQoXtgYvVyCfQyawBSqaJ7z1',
      userName: 'Zelroth',
      name: 'Imp Boi',
      description: 'level 99 wizrd',
      maxHealth: 10,
      currentHealth: 4,
      armor: 12,
      movement: 6,
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
      image: './assets/monsters/icons/impBoi.jpg',
    },
  ],
  Gene: [
    {
      userUID: 'JgNn0zNQ4ZZCEUkd2xXOMXpYEno1',
      userName: 'Gene',
      name: 'Prest',
      description: 'level 68 paladin',
      maxHealth: 13,
      currentHealth: 13,
      armor: 15,
      movement: 7,
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
      image: './assets/monsters/icons/ironMage.jpg',
    },
    {
      userUID: 'JgNn0zNQ4ZZCEUkd2xXOMXpYEno1',
      userName: 'Gene',
      name: 'Imp Boi',
      description: 'level 99 wizrd',
      maxHealth: 10,
      currentHealth: 4,
      armor: 12,
      movement: 5,
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
      locationX: 3,
      locationY: 3,
      image: './assets/monsters/icons/impBoi.png',
    },
  ],
};

export default sampleArray;
