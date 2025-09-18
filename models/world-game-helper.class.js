class WorldGameHelper {
    handleCollisions(world) {
        world.level.enemies.forEach(enemy => {
            if (!enemy.isDead) {
                world._handleCharacterEnemyCollision(enemy);
            }
        });
        world.checkFinalEnemyCollision();
        world.checkPoisonBubbleFinalEnemyCollision();
    }
    checkCollectBottle(world) {
        setInterval(() => {
            world.level.bottles.forEach(bottle => {
                if (world._shouldCollectBottle(bottle)) {
                    world._collectBottle(bottle);
                }
            });
        }, 200);
    }
    checkCollectCoin(world) {
        setInterval(() => {
            world.level.coins.forEach(coin => {
                if (world._shouldCollectCoin(coin)) {
                    world._collectCoin(coin);
                }
            });
        }, 200);
    }
}
window.WorldGameHelper = WorldGameHelper;
