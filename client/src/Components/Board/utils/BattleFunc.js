const { updateUserMonster, deleteUsers } = require('../../../firebase-config');

async function Battle(attacker, defender, attack) {
  function chanceTime(range) {
    return Math.ceil(Math.random() * range);
  }
  const dmgVerbs = [
    'attacks', 'slices', 'strike',
    'roasts', 'clobbers', 'disses',
    'hits', 'mauls', 'blasts', 'bum rushes',
    'cuts', 'chops', 'whacks', 'smacks',
    'boinks', 'penetrates', 'gashes',
    'nicks', 'scratches', 'sores',
  ];
  const missVerbs = [
    ' whiffs against', ' misses against', ' can not find target, ',
    ' might as well be blind against', ' needs strength training against',
    `'s grandmother could do a better job against`,
  ];
  const adj = [
    'violently', 'grotesquely', 'grossly',
    'fiercely', 'forcefully', 'forcibly',
    'intensely', 'insanely', 'powerfully',
    'vigorously', 'non-chalantly', 'brutaly',
    'hysterically', 'passionately', 'uncontrollably',
    'savagely', 'viciously', 'impatiently',
    'disturbingly', 'hauntingly', 'wildly',
  ];
  const killVerbs = [
    'obliterates', 'decimates', 'destroys', 'wipes out',
    'kills', 'sat on', 'decapitated', 'sharted on', 'KOs', 'disposes of',
    'humiliates', 'slaughters', 'impales', 'claps',
  ];
  const atkDice = attack.attack.split(' + ');
  let numberOfRolls = Number(atkDice[0].split('d')[0]);
  let range = Number(atkDice[0].split('d')[1]);
  let attModifier = Number(atkDice[1]);
  while (numberOfRolls >= 0) {
    attModifier += chanceTime(range);
    numberOfRolls -= 1;
  }
  if (attModifier < defender.armor) {
    return `Rolling a ${attModifier}, ${attacker.userName}'s ${attacker.name}${missVerbs[Math.floor(Math.random() * missVerbs.length)]} ${defender.userName}'s ${defender.name}, dealing no damage`;
  }
  const dmgDice = attack.damage.split(' + ');
  numberOfRolls = Number(dmgDice[0].split('d')[0]);
  range = Number(dmgDice[0].split('d')[1]);
  let modifier = Number(dmgDice[1]);
  while (numberOfRolls >= 0) {
    modifier += chanceTime(range);
    numberOfRolls -= 1;
  }
  if (modifier >= defender.currentHealth) {
    defender.currentHealth -= modifier;
    await updateUserMonster(defender.userName, defender.id, {
      currentHealth: defender.maxHealth,
      onBoard: false,
      locationX: -1,
      locationY: -1,
    });
    return `${attacker.userName}'s ${attacker.name} rolled ${attModifier} and ${adj[Math.floor(Math.random() * adj.length)]} ${killVerbs[Math.floor(Math.random() * killVerbs.length)]} ${defender.userName}'s ${defender.name} with ${modifier} damage`;
  }
  defender.currentHealth -= modifier;
  await updateUserMonster(defender.userName, defender.id, {
    currentHealth: defender.currentHealth,
  });
  return `${attacker.userName}'s ${attacker.name} rolled ${attModifier}, ${dmgVerbs[Math.floor(Math.random() * dmgVerbs.length)]} ${defender.userName}'s ${defender.name} for ${modifier} damage. ${defender.userName}'s ${defender.name} has ${defender.currentHealth} HP left`;
}

module.exports = {
  Battle,
};
