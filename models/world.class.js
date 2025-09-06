class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottlesBar = new BottlesBar();
    healthBarEndboss = new HealthBarEndboss();
    coinsBar = new CoinsBar();
    shootableObjects = [];
    finalEnemy = new FinalEnemy();
    endbossHealthBarVisible = false;
    finalEnemyVisible = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.paused = false;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkCollectBottle();
        this.checkCollectCoin();
        this.checkBubbleCollisions();
        this.showEndbossHealthBar();
    }

    setWorld() {
        this.character.world = this;
    }

    checkPoisonBubbleFinalEnemyCollision() {
        this.shootableObjects.forEach(bubble => {
            if (
                bubble.isPoisoned &&
                this.finalEnemy &&
                !this.finalEnemy.isDead &&
                bubble.isColliding(this.finalEnemy)
            ) {
                this.finalEnemy.energy = Math.max(0, this.finalEnemy.energy - 10);
                this.finalEnemy.isHurt = true;
                this.finalEnemy.hurtFrame = 0;
                this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
                this.healthBarEndboss.setPercentage(this.finalEnemy.energy);
                if (this.finalEnemy.energy === 0) {
                    document.getElementById('gameWinDialog').classList.remove('dp-none-win');
                }
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
            if (this.finalEnemy.energy === 0) {
                document.getElementById('gameWinDialog').classList.remove('dp-none-win');
            }
        }
    }

    showEndbossHealthBar() {
        if (this.character.x === 2151) {
            this.endbossHealthBarVisible = true;
        }
        if (this.endbossHealthBarVisible) {
            this.addToMap(this.healthBarEndboss);
        }
    }

    checkFinalEnemyIntroduce() {
            const finalEnemySplashSound = document.getElementById('finalEnemySplash');
        if (
            this.finalEnemy &&
            (this.finalEnemy.isIntroducing || this.character.x === 2151 || this.finalEnemyVisible)
        ) {
            if (!this.finalEnemy.isIntroducing && this.character.x === 2151) {
                this.finalEnemy.isIntroducing = true;
                this.finalEnemy.introduceFrame = 0;
                this.finalEnemyVisible = true;
                finalEnemySplashSound.play();
            }
            if (this.finalEnemy.isIntroducing || this.finalEnemyVisible) {
                this.addToMap(this.finalEnemy);
            }
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
                    // Only allow hit if not recently hurt
                    if (!this.character.isHurt()) {
                        const prevEnergy = this.character.energy;
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                        const hurtSound = document.getElementById('hurtSound');
                        // Only play hurt sound if energy actually decreased, not dead, and isHurt() is true
                        if (
                            this.character.energy < prevEnergy &&
                            this.character.energy > 0 &&
                            this.character.isHurt()
                        ) {
                            if (typeof userInteracted !== 'undefined' && userInteracted) {
                                hurtSound.currentTime = 0;
                                try {
                                    hurtSound.play();
                                } catch (e) {
                                    // Suppress AbortError from play/pause race
                                }
                            }
                        }
                        if (this.character.energy === 0) {
                            if (!this.paused) {
                                this.paused = true;
                                document.querySelector('.game-over-dialog').classList.remove('dp-none');
                                this.character.stopMovement();
                            }
                        }
                    }
                }
            });
        }, 100);
    }

    checkCollectBottle() {
        setInterval(() => {
            this.level.bottles.forEach(bottle => {
                if (this.character.isColliding(bottle)) {
                    this.bottlesBar.collectBottle();
                    this.level.removeObject(bottle);
                    const bottleSound = document.getElementById('collectBottleSound');
                    bottleSound.currentTime = 0;
                    bottleSound.play();
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
                    const coinSound = document.getElementById('coinCollectSound');
                    coinSound.currentTime = 0;
                    coinSound.play();
                }
            });
        }, 200);
    }

    draw() {
        if (this.paused) {
            requestAnimationFrame(() => this.draw());
            return;
        }
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
        this.showEndbossHealthBar();
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
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        if (obj.isFacingLeft) {
            this.ctx.scale(-1, 1);
        }
        if (obj.rotation && obj.rotation !== 0) {
            this.ctx.rotate((obj.rotation * Math.PI) / 180);
        }
        this.ctx.drawImage(
            obj.img,
            -obj.width / 2,
            -obj.height / 2,
            obj.width,
            obj.height
        );
        this.ctx.restore();
        if (typeof obj.drawOffsetRectangle === 'function') {
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