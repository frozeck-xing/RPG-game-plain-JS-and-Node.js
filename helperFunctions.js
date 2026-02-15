// Required imports to show a prompt line in console
const readline = require('node:readline');
const { DATA_STRINGS } = require('./strings');

function _getRandomIntInclusive(max, min = 0) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};


function _displayBattleMenu() {
    console.log('\n');
    console.log('*************************');
    console.log('*      COMMAND LIST     *');
    console.log('* 1 - ATTACK - A        *');
    console.log('* 2 - RESTORE HP - R    *');
    console.log('* 3 - PLAYER DATA - P   *');
    console.log('* 4 - GIVE UP - G       *');
    console.log('*************************');
    console.log('\n');
}

// Helper to get player's input
function _getPlayerInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        const question = ()=> {
            rl.question(prompt, (name) => {
                    if(name.trim() === "") {
                        console.log(DATA_STRINGS.PLAYER_NO_INPUT);
                        console.log('\n');
                        question();
                    } else {
                        rl.close();
                        resolve(name.trim().toLocaleUpperCase());
                    }
                });
        }
        question();
    });
}

function _evaluateInput(input) {
    const attackInput = ['A', 'AT', 'ATT', 'ATTA', 'ATTAC', 'ATTACK', '1'];
    const restoreHpInput = ['R', 'RH', 'RESTORE', 'RESTOREHP', 'HP', 'RES', 'RESTOREH', '2'];
    const showDataInput = ['P', 'PLAYER', 'PLAYERDATA', 'PD', 'PLAYERDAT', 'PLAYEDATA', 'PDATA', '3']
    const giveUpInput = ['G', 'GU', 'GIVEU', 'GIVEUP', 'GIVE', '4'];
    const helpInput = ['H', 'HE','HEL', 'HELP'];
    
    if(helpInput.includes(input)) return '5';
    if(attackInput.includes(input)) return '1'
    if(restoreHpInput.includes(input)) return '2'
    if(showDataInput.includes(input)) return '3'
    if(giveUpInput.includes(input)) return '4'
    
    return ''
}

module.exports = {_getRandomIntInclusive, _displayBattleMenu, _getPlayerInput, _evaluateInput, colors}