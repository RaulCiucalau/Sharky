/**
 * Represents the main game world, managing all game objects, collisions, and rendering.
 */
class World {
    character = new Character();
    level = World.createLevel();

    static createLevel() {
        return new Level(
            [
                new PufferFish(0), new PufferFish(1), new PufferFish(2), new PufferFish(3),
                new PufferFish(4), new PufferFish(5), new PufferFish(6),
                new JellyFish(0), new JellyFish(1), new JellyFish(2), new JellyFish(3), new JellyFish(4)
            ],
            [new FinalEnemy()],
            [
                new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/2.png', -720, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0, 400, 720),
                new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 2, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 720 * 2, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 2, 400, 720),
                new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 3, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720 * 3, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 3, 400, 720)
            ],
            [
                new Coin(300, 300), new Coin(400, 300), new Coin(500, 300),
                new Coin(1100, 180), new Coin(1200, 180),
                new Coin(1800, 320), new Coin(1900, 320), new Coin(2000, 320),
                new Coin(2200, 200), new Coin(2300, 200)
            ],
            [
                new Bottles(150, 120), new Bottles(600, 300), new Bottles(900, 200),
                new Bottles(1200, 350), new Bottles(1500, 10), new Bottles(1700, 100)
            ]
        );
    }

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
        this.checkCollectBottle();
        this.checkCollectCoin();
        this.checkBubbleCollisions();
        this.showEndbossHealthBar();
    }

    setWorld() {
        this.character.world = this;
        if (this.finalEnemy) {
            this.finalEnemy.world = this;
        }
    }

    checkPoisonBubbleFinalEnemyCollision() {
        this.shootableObjects.forEach(bubble => {
            if (this._shouldDamageFinalEnemy(bubble)) {
                this._damageFinalEnemy(bubble);
            }
        });
    }

    _shouldDamageFinalEnemy(bubble) {
        return bubble.isPoisoned &&
            this.finalEnemy &&
            !this.finalEnemy.isDead &&
            bubble.isColliding(this.finalEnemy);
    }

    _damageFinalEnemy(bubble) {
        this.finalEnemy.energy = Math.max(0, this.finalEnemy.energy - 10);
        this.finalEnemy.isHurt = true;
        this.finalEnemy.hurtFrame = 0;
        this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
        this.healthBarEndboss.setPercentage(this.finalEnemy.energy);
        if (this.finalEnemy.energy === 0) {
            document.getElementById('gameWinDialog').classList.remove('dp-none-win');
            this.paused = true;
        }
    }

    checkFinalEnemyCollision() {
        if (this._shouldFinalEnemyHitCharacter()) {
            this._handleFinalEnemyHitCharacter();
        }
    }

    _shouldFinalEnemyHitCharacter() {
        return this.finalEnemy &&
            !this.finalEnemy.isDead &&
            this.character.isColliding(this.finalEnemy) &&
            this.finalEnemy.canHitCharacter;
    }

    _handleFinalEnemyHitCharacter() {
        const prevEnergy = this.character.energy;
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        this.finalEnemy.hitCharacterCooldown();
        this.character.hitFinalEnemy();
        this.statusBar.setPercentage(this.character.energy);
        this.finalEnemy.hitCharacterCooldown();
        this._playHurtSoundIfNeeded(prevEnergy);
        this._handleGameOverIfNeeded();
    }

    showEndbossHealthBar() {
        if (this.character.x === 2151) {
            this.endbossHealthBarVisible = true;
        }
        if (this.endbossHealthBarVisible) {
            if (this.finalEnemy.energy === 0) {
                document.getElementById('gameWinDialog').classList.remove('dp-none-win');
                this.paused = true;
            }
            this.addToMap(this.healthBarEndboss);
        }
    }

    checkFinalEnemyIntroduce() {
        const finalEnemySplashSound = document.getElementById('finalEnemySplash');
        if (this._shouldIntroduceFinalEnemy()) {
            this._startFinalEnemyIntroduction(finalEnemySplashSound);
        }
        if (this._shouldShowFinalEnemy()) {
            this.addToMap(this.finalEnemy);
        }
    }

    _shouldIntroduceFinalEnemy() {
        return this.finalEnemy &&
            !this.finalEnemy.isIntroducing &&
            (this.character.x === 2151);
    }

    _startFinalEnemyIntroduction(finalEnemySplashSound) {
        this.finalEnemy.isIntroducing = true;
        this.finalEnemy.introduceFrame = 0;
        this.finalEnemyVisible = true;
        finalEnemySplashSound.play();
    }

    _shouldShowFinalEnemy() {
        return this.finalEnemy &&
            (this.finalEnemy.isIntroducing || this.finalEnemyVisible);
    }

    checkBubbleCollisions() {
        setInterval(() => {
            this.shootableObjects.forEach(bubble => {
                this.level.enemies.forEach(enemy => {
                    if (this._shouldBubbleKillEnemy(bubble, enemy)) {
                        this._bubbleKillsEnemy(bubble, enemy);
                    }
                });
            });
        }, 100);
    }

    _shouldBubbleKillEnemy(bubble, enemy) {
        return (enemy instanceof JellyFish || enemy instanceof PufferFish) &&
            bubble.isColliding(enemy) &&
            !enemy.isDead;
    }

    _bubbleKillsEnemy(bubble, enemy) {
        enemy.dieAndRemove(this.level.enemies);
        this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
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

    _handleCharacterEnemyCollision(enemy) {
        if (!this.character.isHurt() &&
            this.character.isColliding(enemy) &&
            enemy.canHitCharacter
        ) {
            const prevEnergy = this.character.energy;
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            enemy.hitCharacterCooldown();
            this._playHurtSoundIfNeeded(prevEnergy);
            this._handleGameOverIfNeeded();
        }
    }

    _playHurtSoundIfNeeded(prevEnergy) {
        const hurtSound = document.getElementById('hurtSound');
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
                    console.error('Error playing sound:', e);
                }
            }
        }
    }

    _handleGameOverIfNeeded() {
        if (this.character.energy === 0 && !this.character.isItDead) {
            this.character.isItDead = true;
            document.querySelector('.game-over-dialog').classList.remove('dp-none');
            this.paused = true;
        }
    }

    checkCollectBottle() {
        setInterval(() => {
            this.level.bottles.forEach(bottle => {
                if (this._shouldCollectBottle(bottle)) {
                    this._collectBottle(bottle);
                }
            });
        }, 200);
    }

    _shouldCollectBottle(bottle) {
        return this.character.isColliding(bottle);
    }

    _collectBottle(bottle) {
        this.bottlesBar.collectBottle();
        this.level.removeObject(bottle);
        const bottleSound = document.getElementById('collectBottleSound');
        bottleSound.currentTime = 0;
        bottleSound.play();
    }

    checkCollectCoin() {
        setInterval(() => {
            this.level.coins.forEach(coin => {
                if (this._shouldCollectCoin(coin)) {
                    this._collectCoin(coin);
                }
            });
        }, 200);
    }

    _shouldCollectCoin(coin) {
        return this.character.isColliding(coin);
    }

    _collectCoin(coin) {
        this.coinsBar.collectCoin();
        this.level.removeObject(coin);
        const coinSound = document.getElementById('coinCollectSound');
        coinSound.currentTime = 0;
        coinSound.play();
    }

    handleCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead) {
                this._handleCharacterEnemyCollision(enemy);
            }
        });
        this.checkFinalEnemyCollision();
        this.checkPoisonBubbleFinalEnemyCollision();
    }
}

window.World = World;
