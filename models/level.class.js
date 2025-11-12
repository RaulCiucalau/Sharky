/**
 * Represents a game level, containing all objects and configuration for the level.
 */
class Level {
    enemies;
    backgroundObjects;
    backgroundObjects;
    level_end_x = 3000;
    level_end_start_x = -720;

    /**
     * Creates a new Level instance.
     * @param {MovableObject[]} enemies - The enemies in the level.
     * @param {FinalEnemy} finalEnemy - The final enemy in the level.
     * @param {BackgroundObject[]} backgroundObjects - The background objects.
     * @param {Coin[]} coins - The coins in the level.
     * @param {Bottles[]} bottles - The bottles in the level.
     */
    constructor(enemies, finalEnemy, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.finalEnemy = finalEnemy || null;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles || [];
    }

    /**
     * Removes a coin or bottle object from the level.
     * @param {Coin|Bottles} object - The object to remove.
     */
    removeObject(object) {
        const coinIndex = this.coins.indexOf(object);
        const bottleIndex = this.bottles.indexOf(object);
        if (coinIndex > -1) this.coins.splice(coinIndex, 1);
        if (bottleIndex > -1) this.bottles.splice(bottleIndex, 1);
    }
}