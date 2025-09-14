/**
 * Represents the main game world, managing all game objects, collisions, and rendering.
 */
class World {
    /**
     * The main character instance.
     * @type {Character}
     */
    character = new Character();
    /**
     * The current level data.
     * @type {Level}
     */
    level = World.createLevel();

    /**
     * Creates a new Level instance for a fresh start.
     * @returns {Level}
     */
    static createLevel() {
        // Copy the level1.js code here to always return a new Level instance
        return new Level(
            [
                new PufferFish(0), new PufferFish(1), new PufferFish(2), new PufferFish(3), new PufferFish(4), new PufferFish(5), new PufferFish(6),
                new JellyFish(0), new JellyFish(1), new JellyFish(2), new JellyFish(3), new JellyFish(4)
            ],
            [ new FinalEnemy() ],
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
    /**
     * The canvas element for rendering.
     * @type {HTMLCanvasElement}
     */
    canvas;
    /**
     * The 2D rendering context.
     * @type {CanvasRenderingContext2D}
     */
    ctx;
    /**
     * The keyboard input handler.
     * @type {Keyboard}
     */
    keyboard;
    /**
     * The camera x offset.
     * @type {number}
     */
    camera_x = 0;
    /**
     * The status bar UI element.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();
    /**
     * The bottles bar UI element.
     * @type {BottlesBar}
     */
    bottlesBar = new BottlesBar();
    /**
     * The endboss health bar UI element.
     * @type {HealthBarEndboss}
     */
    healthBarEndboss = new HealthBarEndboss();
    /**
     * The coins bar UI element.
     * @type {CoinsBar}
     */
    coinsBar = new CoinsBar();
    /**
     * Array of shootable objects (bubbles).
     * @type {ShootableObjects[]}
     */
    shootableObjects = [];
    /**
     * The final enemy instance.
     * @type {FinalEnemy}
     */
    finalEnemy = new FinalEnemy();
    /**
     * Whether the endboss health bar is visible.
     * @type {boolean}
     */
    endbossHealthBarVisible = false;
    /**
     * Whether the final enemy is visible.
     * @type {boolean}
     */
    finalEnemyVisible = false;

    /**
     * Creates a new World instance and initializes the game.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
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

    /**
     * Sets the world reference on the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Checks for collisions between poison bubbles and the final enemy.
     */
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
                    this.paused = true;
                }
            }
        });
    }

    /**
     * Checks for collisions between the character and the final enemy.
     */
    checkFinalEnemyCollision() {
        if (
            this.finalEnemy &&
            !this.finalEnemy.isDead &&
            this.character.isColliding(this.finalEnemy) &&
            this.finalEnemy.canHitCharacter
        ) {
            const prevEnergy = this.character.energy;
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            this.finalEnemy.hitCharacterCooldown();
            this._playHurtSoundIfNeeded(prevEnergy);
            this._handleGameOverIfNeeded();
        }

    }

    /**
     * Shows the endboss health bar when appropriate.
     */
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

    /**
     * Handles the introduction sequence for the final enemy.
     */
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

    /**
     * Checks for collisions between bubbles and enemies.
     */
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

    /**
     * Spawns a regular bubble at the character's position.
     * @param {number} x - The x position (unused).
     * @param {number} y - The y position (unused).
     */
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

    /**
     * Spawns a poison bubble if bottles are available.
     * @param {number} x - The x position (unused).
     * @param {number} y - The y position (unused).
     */
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



    /**
     * Handles collision logic between the character and an enemy.
     * @private
     * @param {MovableObject} enemy - The enemy object.
     */
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

    /**
     * Plays the hurt sound if the character lost energy and is hurt.
     * @private
     * @param {number} prevEnergy - The character's energy before hit.
     */
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

    /**
     * Handles game over logic if the character's energy reaches zero.
     * @private
     */
    _handleGameOverIfNeeded() {
        if (this.character.energy === 0 && !this.character.isItDead) {
            this.character.isItDead = true;
            document.querySelector('.game-over-dialog').classList.remove('dp-none');
            this.paused = true;
        }
    }

    /**
     * Checks for collisions between the character and bottles, and collects them.
     */
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

    /**
     * Checks for collisions between the character and coins, and collects them.
     */
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

    handleCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead) {
                this._handleCharacterEnemyCollision(enemy);
            }
        });
        this.checkFinalEnemyCollision();
        this.checkPoisonBubbleFinalEnemyCollision();
    }


    /**
     * Main game loop: draws all objects and handles game state updates.
     */
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
        this.checkPoisonBubbleFinalEnemyCollision();
        this.handleCollisions();
        requestAnimationFrame(() => this.draw());
    }
    /**
     * Adds an array of objects to the map for rendering.
     * @param {DrawableObject[]} objects - The objects to add.
     */
    addObjectToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a single object to the map for rendering.
     * @param {DrawableObject} obj - The object to add.
     */
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
    }

    /**
     * Draws an object flipped horizontally.
     * @param {DrawableObject} object - The object to flip and draw.
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.x + object.width, object.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(object.img, 0, 0, object.width, object.height);
        this.ctx.restore();
    }
}