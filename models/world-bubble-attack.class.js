class WorldBubbleAttack {
    checkBubbleCollisions(world) {
        setInterval(() => {
            world.shootableObjects.forEach(bubble => {
                world.level.enemies.forEach(enemy => {
                    if (world._shouldBubbleKillEnemy(bubble, enemy)) {
                        world._bubbleKillsEnemy(bubble, enemy);
                    }
                });
            });
        }, 100);
    }
    spawnBubble(world, x, y) {
        const direction = world.character.isFacingLeft ? 'left' : 'right';
        const spawnX = direction === 'left' ? world.character.x - 30 : world.character.x + world.character.width - 65;
        const spawnY = world.character.y + world.character.height / 2;
        const bubble = new ShootableObjects(false, direction);
        bubble.x = spawnX;
        bubble.y = spawnY;
        bubble.move();
        world.shootableObjects.push(bubble);
    }
    spawnPoisonBubble(world, x, y) {
        if (world.bottlesBar.bottlesCollected > 0) {
            const direction = world.character.isFacingLeft ? 'left' : 'right';
            const spawnX = direction === 'left' ? world.character.x : world.character.x + world.character.width - 65;
            const spawnY = world.character.y + world.character.height / 2;
            const bubble = new ShootableObjects(true, direction);
            bubble.x = spawnX;
            bubble.y = spawnY;
            bubble.move();
            world.shootableObjects.push(bubble);
            world.bottlesBar.bottlesCollected--;
            let percent = Math.round((world.bottlesBar.bottlesCollected / 6) * 100);
            world.bottlesBar.setPercentage(percent);
        }
    }
}
window.WorldBubbleAttack = WorldBubbleAttack;
