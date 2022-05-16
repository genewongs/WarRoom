if (Object.keys(newCoords).length) {
  Object.keys(newCoords).forEach((monsterId) => {
    // this modifies the temporary board to reflect the most updated board state
    if (newCoords[battle.attacker.id] && newCoords[monsterId].length) {
      const oldIndex = (newCoords[monsterId][0] * dimension) + newCoords[monsterId][1];
      delete tempBoard[oldIndex];
    }
  });
}
// if a previous battle had this monster move
// this modifies its location for the next path finding
if (newCoords[battle.attacker.id] && newCoords[battle.attacker.id].length) {
  battle.attacker.locationX = newCoords[battle.attacker.id][0];
  battle.attacker.locationY = newCoords[battle.attacker.id][1];
}


        // look for a new coord and transform it to an index on the board
        let newIndex = newCoords[battle.attacker.id] ? newCoords[battle.attacker.id] : null;
        const oldIndex = (battle.attacker.locationX * dimension) + battle.attacker.locationY;
        if (newIndex) {
          newIndex = (newIndex[0] * dimension) + newIndex[1];
          // move the monster and return the battle for the next promise
          return (
            move(oldIndex, newIndex, battle.attacker)
              .then(() => battle)
          );
        }
        // not sure what this does
        console.log(`${currentUser.displayName}'s ${battle.attacker.name} could not find a valid path.`);


        Promise.all(
          // since the battles update the db, it needs to be async
          results.map(async (battle) => {
            console.log(battle);
            // commences battle a multiple amount of times
            let multiple = battle.attack.multiplier;
            while (multiple > 0) {
              //updates the battle log with events that occured
              const message = await Battle(battle.attacker, battle.defender, battle.attack);
              const logMessageData = {
                message,
                board: room,
                id: uuidv4(),
              };
              socket.emit('send_log_message', logMessageData);
              multiple -= 1;
            }
            if (battle.defender.currentHealth <= 0) {
              // my shoddy attempt to make sure each location is right
              // this def needs changing
              return Promise.resolve(
                (battle.defender.locationX * dimension) + battle.defender.locationY,
              );
            }
          }),
        )