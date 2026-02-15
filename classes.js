// Definig classes

const { _getRandomIntInclusive, colors } = require("./helperFunctions");

class Character {
    constructor(name,hp = 100, maxHp = 100, attack = 1, defense = 1, speed = 1, isAlive = true) {
        this.name = name;
        this.hp = hp;
        this.maxHp = maxHp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.isAlive = isAlive;
    }

    restoreHealth(value) {
        console.log(this.name, `${colors.green}restored ${value}HP${colors.reset}`);
        if((this.hp + value) > this.maxHp) {
            this.hp = this.maxHp;
        } else {
            this.hp += value; 
        }
        this.checkHealth();
    }

    takeDamage(value) {
        this.hp -= value;
        console.log(this.name, `took ${colors.red}${value}HP of damage ${colors.reset}`);
        this.checkHealth();
    }

    checkHealth() {
        console.log(this.name,"HP:", this.hp);
        console.log('\n');
        if(this.hp <= 0) {
            console.log(`${this.name}${colors.red} run out of HP!!!${colors.reset}`);
            this.isAlive = false;
        }
    }
}

class Player extends Character {
    constructor(name, hp, maxHp, attack, defense, speed, level = 1, exp = 0, isAlive) {
        super(name,hp, maxHp, attack, defense, speed, isAlive);
        this.level = level;
        this.exp = exp;
    }

    getRequiredExp() {
        return Math.floor(25 * Math.pow(this.level, 1.5));
    }

    increaseStat(attribute,value) {
        this[attribute] += value; 
    }

    increaseExp(newExp) {
        this.exp += newExp;

        while (this.exp >= this.getRequiredExp()) {
            this.exp -= this.getRequiredExp();
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        console.log(`${this.name} leveled up to ${colors.yellow}${this.level}${colors.reset} !`);

        const hpGain = _getRandomIntInclusive(15, 10);
        const attackGain = _getRandomIntInclusive(5, 3);
        const defenseGain = _getRandomIntInclusive(4, 2);
        const speedGain = _getRandomIntInclusive(4, 2);

        this.maxHp += hpGain;
        this.attack += attackGain;
        this.defense += defenseGain;
        this.speed += speedGain;

        const levelUpHeal = Math.floor(this.maxHp * .25); 
        this.hp = (levelUpHeal + this.hp) > this.maxHp ? this.maxHp : levelUpHeal + this.hp // full heal on level up

        console.log(`
            Stats increased:
            HP ${colors.yellow}+${hpGain}${colors.reset}
            ATK ${colors.yellow}+${attackGain}${colors.reset}
            DEF ${colors.yellow}+${defenseGain}${colors.reset}
            SPD ${colors.yellow}+${speedGain}${colors.reset}
        `);
    }

    showStats() {
        console.log(`
        ${this.name}
        Level: ${this.level}
        HP: ${colors.yellow} ${this.hp}${colors.reset}/${colors.green}${this.maxHp}${colors.reset}
        Attack: ${colors.yellow}${this.attack}${colors.reset}
        Defense:${colors.yellow}${this.defense}${colors.reset}
        Speed:${colors.yellow}${this.speed}${colors.reset}
        EXP:${colors.yellow}${this.exp}${colors.reset}
        `);
    }

    giveUp() {
        this.isAlive = false;
    }
}

class EnemyMob extends Character {
    constructor(config) {
        super(
            config.name,
            config.hp,
            config.maxHp,
            config.attack,
            config.defense,
            config.speed,
            config.isAlive
        );

        this.expReward = config.expReward;
        this.mobBattleCry = config.mobBattleCry;
        this.mobType = config.mobType;
    }

    getMobBattleCry() {
        console.log(`${colors.blue}${this.mobBattleCry}${colors.reset}`);
    }
}

module.exports = { Player, EnemyMob };