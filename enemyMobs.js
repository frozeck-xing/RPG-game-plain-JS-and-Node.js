const { EnemyMob } = require('./classes.js');
const { _getRandomIntInclusive, colors } = require('./helperFunctions.js');
const { DATA_STRINGS } = require('./strings.js');

const enemyData = {
    1: {
        name: DATA_STRINGS.MOB_NAME_SLIME,
        hp: 25,
        maxHp: 25,
        attack: 2,
        defense: 1,
        speed: 0,
        expReward: 25,
        mobBattleCry: DATA_STRINGS.MOB_SLIME_CRY,
        mobType: DATA_STRINGS.MOB_TYPE_MINION,
    },
    3: {
        name: DATA_STRINGS.MOB_NAME_GOBLIN,
        hp: 50,
        maxHp: 50,
        attack: 10,
        defense: 7,
        speed: 7,
        expReward: 50,
        mobBattleCry: DATA_STRINGS.MOB_GOBLIN_CRY,
        mobType: DATA_STRINGS.MOB_TYPE_MINION,
    },
    5: {
        name: DATA_STRINGS.MOB_NAME_TROLL,
        hp: 250,
        maxHp: 250,
        attack: 20,
        defense: 15,
        speed: 11,
        expReward: 250,
        mobBattleCry: `${colors.red}${DATA_STRINGS.MOB_TROLL_CRY}${colors.reset}`,
        mobType: DATA_STRINGS.MOB_TYPE_BOSS,
    }
}

function generateNewEnemy(playerLvl) {
    const levels = Object.keys(enemyData)
        .map(Number)
        .sort((a, b) => a - b);

    const matchedLevel = levels
        .filter(lvl => playerLvl >= lvl)
        .pop() || levels[0];

    const template = enemyData[matchedLevel];
    const newMob = { ...template };

    // Generates random extra values for every new mob
    newMob.attack += _getRandomIntInclusive(playerLvl);
    newMob.defense += _getRandomIntInclusive(playerLvl);
    newMob.speed += _getRandomIntInclusive(playerLvl);

    return new EnemyMob(newMob);
}

module.exports = { generateNewEnemy };