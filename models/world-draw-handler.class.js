class WorldDrawHandler {
    draw(world) {
        if (world.paused) {
            requestAnimationFrame(() => this.draw(world));
            return;
        }
        this._clearAndTranslate(world);
        this._drawGameObjects(world);
        this._drawUI(world);
        this._handleGameLogic(world);
        requestAnimationFrame(() => this.draw(world));
    }
    _clearAndTranslate(world) {
        world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
        world.ctx.translate(world.camera_x, 0);
    }
    _drawGameObjects(world) {
        world.addObjectToMap(world.level.backgroundObjects);
        world.checkFinalEnemyIntroduce();
        world.addObjectToMap(world.level.enemies);
        world.addObjectToMap(world.level.coins);
        world.addObjectToMap(world.level.bottles);
        world.addObjectToMap(world.shootableObjects);
        world.addToMap(world.character);
        world.ctx.translate(-world.camera_x, 0);
    }
    _drawUI(world) {
        world.addToMap(world.statusBar);
        world.addToMap(world.bottlesBar);
        world.addToMap(world.coinsBar);
        world.showEndbossHealthBar();
        world.ctx.translate(world.camera_x, 0);
        world.ctx.translate(-world.camera_x, 0);
    }
    _handleGameLogic(world) {
        world.checkPoisonBubbleFinalEnemyCollision();
        world.handleCollisions();
        if (world.finalEnemyVisible && world.finalEnemy && !world.finalEnemy.isDead && world.character && world.finalEnemy.hasIntroduced) {
            const dx = world.character.x - world.finalEnemy.x;
            const dy = world.character.y - world.finalEnemy.y;
            if (typeof FinalEnemy.approachCharacter === 'function') {
                FinalEnemy.approachCharacter(world.finalEnemy, dx, dy, 5);
            }
        }
    }
}
window.WorldDrawHandler = WorldDrawHandler;
