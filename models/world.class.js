class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottlesBar = new BottlesBar();
    coinsBar = new CoinsBar();
    shootableObjects = [];
    finalEnemy = new FinalEnemy();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkCollectBottle();
        this.checkCollectCoin();
        this.checkBubbleCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkPoisonBubbleFinalEnemyCollision() {
    this.shootableObjects.forEach(bubble => {
        // Check only poison bubbles
        if (bubble.isPoisoned && this.finalEnemy && !this.finalEnemy.isDead && bubble.isColliding(this.finalEnemy)) {
            this.finalEnemy.energy = (this.finalEnemy.energy - 10);
            // Optionally remove bubble after hit:
            this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
        }
    });
}

    checkFinalEnemyCollision() {
    if (
        this.finalEnemy &&
        !this.finalEnemy.isDead &&
        this.character.isColliding(this.finalEnemy)
    ) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }
}

    checkFinalEnemyIntroduce() {
        if (
            this.finalEnemy &&
            (this.finalEnemy.isIntroducing || this.character.x === 2160)
        ) {
            if (!this.finalEnemy.isIntroducing && this.character.x === 2160) {
                this.finalEnemy.isIntroducing = true;
                this.finalEnemy.introduceFrame = 0;
            }
            this.addToMap(this.finalEnemy);
        }
    }

    checkBubbleCollisions() {
        setInterval(() => {
            this.shootableObjects.forEach(bubble => {
                this.level.enemies.forEach(enemy => {
                    if (
                        (enemy instanceof JellyFish || enemy instanceof PufferFish) &&
                        bubble.isColliding(enemy) &&
                        !enemy.isDead
                    ) {
                        enemy.dieAndRemove(this.level.enemies);
                        this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
                    }
                });
            });
        }, 100);
    }

    spawnBubble(x, y) {
        const direction = this.character.isFacingLeft ? 'left' : 'right';
        const spawnX = direction === 'left' ? this.character.x - 30 : this.character.x + this.character.width + 10;
        const spawnY = this.character.y + this.character.height / 2;
        const bubble = new ShootableObjects(false, direction);
        bubble.x = spawnX;
        bubble.y = spawnY;
        bubble.move();
        this.shootableObjects.push(bubble);
    }

    spawnPoisonBubble(x, y) {
        if (this.bottlesBar.bottlesCollected > 0) {
            const direction = this.character.isFacingLeft ? 'left' : 'right';
            const spawnX = direction === 'left' ? this.character.x - 30 : this.character.x + this.character.width + 10;
            const spawnY = this.character.y + this.character.height / 2 - 25;
            const bubble = new ShootableObjects(true, direction);
            bubble.x = spawnX;
            bubble.y = spawnY;
            bubble.move();
            this.shootableObjects.push(bubble);
            this.bottlesBar.bottlesCollected--;
            let percent = Math.round((this.bottlesBar.bottlesCollected / 6) * 100);
            this.bottlesBar.setPercentage(percent);
        }
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (!enemy.isDead && this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }, 500);
    }

    checkCollectBottle() {
        setInterval(() => {
            this.level.bottles.forEach(bottle => {
                if (this.character.isColliding(bottle)) {
                    this.bottlesBar.collectBottle();
                    this.level.removeObject(bottle);
                }
            });
        }, 200);
    }

    checkCollectCoin() {
        setInterval(() => {
            this.level.coins.forEach(coin => {
                if (this.character.isColliding(coin)) {
                    this.coinsBar.collectCoin();
                    this.level.removeObject(coin);
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.checkFinalEnemyIntroduce();
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.shootableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.coinsBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        this.checkFinalEnemyCollision();
        this.checkPoisonBubbleFinalEnemyCollision();
        requestAnimationFrame(() => this.draw());
    }

    addObjectToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(obj) {
        if (obj.isFacingLeft) {
            obj.drawFlipped(this.ctx);
        } else if (obj.rotation && obj.rotation !== 0) {
            obj.drawRotated(this.ctx);
        } else {
            obj.draw(this.ctx);
        }
        if (typeof obj.drawOffsetRectangle === 'function') {
            obj.drawOffsetRectangle(this.ctx);
        }
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.x + object.width, object.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(object.img, 0, 0, object.width, object.height);
        this.ctx.restore();
    }
}