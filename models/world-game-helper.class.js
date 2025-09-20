class WorldGameHelper {
    /**
     * Handles all collision checks between the character, enemies, and bubbles in the world.
     * @param {World} world - The game world instance.
     */
    handleCollisions(world) {
        world.level.enemies.forEach(enemy => {
            if (!enemy.isDead) world._handleCharacterEnemyCollision(enemy);
        });
        world.checkFinalEnemyCollision();
        world.checkPoisonBubbleFinalEnemyCollision();
    }
    /**
     * Sets up interval to check for bottle collection by the character in the world.
     * @param {World} world - The game world instance.
     */
    checkCollectBottle(world) {
        setInterval(() => {
            world.level.bottles.forEach(bottle => {
                if (world._shouldCollectBottle(bottle)) world._collectBottle(bottle);
            });
        }, 200);
    }
    /**
     * Sets up interval to check for coin collection by the character in the world.
     * @param {World} world - The game world instance.
     */
    checkCollectCoin(world) {
        setInterval(() => {
            world.level.coins.forEach(coin => {
                if (world._shouldCollectCoin(coin)) world._collectCoin(coin);
            });
        }, 200);
    }
}
window.WorldGameHelper = WorldGameHelper;
