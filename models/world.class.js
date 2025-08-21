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
    shootableObjects = [new ShootableObjects()];

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

    checkBubbleCollisions() {
        setInterval(() => {
            this.shootableObjects.forEach((bubble) => {
                this.level.enemies.forEach((enemy, enemyIdx) => {
                    if (enemy instanceof JellyFish && bubble.isColliding(enemy) && !enemy.isDead) {
                        enemy.dieAndRemove(this.level.enemies);
                        this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
                    }
                });
            });
        }, 100);
    }

    spawnBubble(x, y) {
        const bubble = new ShootableObjects();
        bubble.x = x;
        bubble.y = y;
        bubble.moveRight();
        this.shootableObjects.push(bubble);
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