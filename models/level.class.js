/**
 * Represents a game level, containing all objects and configuration for the level.
 */
class Level {
    /**
     * Array of enemy objects in the level.
     * @type {MovableObject[]}
     */
    enemies;
    /**
     * Array of background objects for the level.
     * @type {BackgroundObject[]}
     */
    backgroundObjects;
    /**
     * The x coordinate where the level ends.
     * @type {number}
     */
    level_end_x = 2150;
    /**
     * The x coordinate where the level starts.
     * @type {number}
     */
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
        this.finalEnemy = finalEnemy;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

    /**
     * Removes a coin or bottle object from the level.
     * @param {Coin|Bottles} object - The object to remove.
     */
    removeObject(object) {
        this.coins = this.coins.filter(c => c !== object);
        this.bottles = this.bottles.filter(b => b !== object);
    }
}