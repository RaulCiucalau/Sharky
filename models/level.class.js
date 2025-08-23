class Level {
    enemies;
    backgroundObjects;
    level_end_x = 2150;
    level_end_start_x = -720;

    constructor(enemies, finalEnemy, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.finalEnemy = finalEnemy;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

    removeObject(object) {
        this.coins = this.coins.filter(c => c !== object);
        this.bottles = this.bottles.filter(b => b !== object);
    }
}