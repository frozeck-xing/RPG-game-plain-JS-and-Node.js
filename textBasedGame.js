// Import Clases and Mob Data
const { Player } = require('./classes.js');
const { _getRandomIntInclusive, _displayBattleMenu, _getPlayerInput, _evaluateInput, colors } = require('./helperFunctions.js');
const { generateNewEnemy } = require('./enemyMobs.js');
const { DATA_STRINGS } = require('./strings.js');

// Battle Functions
function _attack(attk, def) {
    let attkModifier = _getRandomIntInclusive(5);
    const defModifier = _getRandomIntInclusive(3);
    let finalDamage;
    
    if(attkModifier > 4) {
        console.log(DATA_STRINGS.CRITICAL_HIT);
        attkModifier *= 2;
    }

    finalDamage = (attk + attkModifier) - (def + defModifier);
    return finalDamage >= 0 ? finalDamage : 0;
}

function _battle(attacker, defender) {
    console.log('\n');
    console.log(attacker.name, DATA_STRINGS.ATTACK_COMMAND);

    const attack = _attack(attacker.attack, defender.defense);
    defender.takeDamage(attack);
    
}

function _recoverHealth(player) {
    const chanceOfRecovery = player.maxHp == player.hp ? 0 : _getRandomIntInclusive(10);

    if(chanceOfRecovery >= 3) {
        const regenValue  = _getRandomIntInclusive(9) + 1;
        player.restoreHealth(regenValue);
    } else {
        console.log(player.name, DATA_STRINGS.FAILED_TO_RECOVER);
    }
}

async function _giveUpConfirm(player) {
    const playerGiveUp = await _getPlayerInput(DATA_STRINGS.CONFIRM_INPUT);
    
    if(playerGiveUp === 'Y' || playerGiveUp === 'YES') player.giveUp();
}

function _turnHandler(player, mob, playerHeal = false) {
    let attacker, defender;

    // If player heals then mob attacks
    // Check speeds
    if (!playerHeal && player.speed >= mob.speed) {
        attacker = player;
        defender = mob;
    } else {
        attacker =  mob;
        defender = player;
    }

    _battle(attacker, defender);
    if(defender.isAlive && !playerHeal){
        _battle(defender,attacker);
    }
}

async function main() {
    console.log('************************************************');
    console.log('Welcome brave hero to your text based adventure!');
    console.log('************************************************');
    
    const playerName = await _getPlayerInput(DATA_STRINGS.PROMPT_PLAYER_NAME);
    const player = new Player(playerName,100,100,3,1,1,1,0);
    
    let gameState = true;
    let mob = generateNewEnemy(player.level);

    console.log(`Hello, ${player.name}!, welcome to your adventure`);
    player.showStats();
    console.log('\n');
    mob.getMobBattleCry();
    console.log('\n');
    console.log(DATA_STRINGS.MENU_HELP);

    while(gameState) {
        _displayBattleMenu();
        let userInput = await _getPlayerInput(DATA_STRINGS.PROMPT_PLAYER_MOVE);
        switch(_evaluateInput(userInput)) {
            case '1':
                _turnHandler(player, mob);
                break;
            case '2':
                _recoverHealth(player);
                _turnHandler(player, mob, true);
                break;
            case '3':
                player.showStats();
                break
            case '4':
                await _giveUpConfirm(player);
                break;
            case '5':
                _displayBattleMenu();
                break;
            default:
                console.log(DATA_STRINGS.WRONG_INPUT);
        }

        if(!player.isAlive) {
            gameState = false;
        }

        if(!mob.isAlive) {
            console.log(`${mob.name} defeated, ${player.name} gained ${colors.yellow}${mob.expReward}${colors.reset} EXP.`);
            player.increaseExp(mob.expReward);
            if(mob.mobType === DATA_STRINGS.MOB_TYPE_BOSS){
                gameState = false;
            } else {
                mob = generateNewEnemy(player.level);
                mob.getMobBattleCry();
            }
        }

    }
    
    const finalMessage = player.isAlive ? `${player.name} ${colors.yellow}${DATA_STRINGS.MESSAGE_PLAYER_WON}` : `${colors.red}${player.name} ${DATA_STRINGS.MESSAGE_PLAYER_LOST}`;
    console.log('*****************************');
    console.log('\n');
    console.log(`${finalMessage}${colors.reset}`);

}

// Game start
main();