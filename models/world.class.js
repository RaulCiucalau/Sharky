/**
 * Represents the main game world, managing all game objects, collisions, and rendering.
 */
class World {
    character = new Character();
    level = World.createLevel();
    static createLevel() {
        return new Level(
            [
                new PufferFish(0), new PufferFish(1), new PufferFish(2), new PufferFish(3), new PufferFish(4), new PufferFish(5), new PufferFish(6),
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
        if (this.finalEnemy) {
            this.finalEnemy.world = this;
        }
    }

    /**
     * Checks for collisions between poison bubbles and the final enemy.
     */
    checkPoisonBubbleFinalEnemyCollision() {
        this.shootableObjects.forEach(bubble => {
            if (this._shouldDamageFinalEnemy(bubble)) {
                this._damageFinalEnemy(bubble);
            }
        });
    }

    /**
     * Determines if a poison bubble should damage the final enemy.
     * @param {ShootableObjects} bubble - The bubble to check for collision and poison status.
     * @returns {boolean} True if the bubble is poisoned, collides with the final enemy, and the final enemy is alive.
     */
    _shouldDamageFinalEnemy(bubble) {
        return bubble.isPoisoned &&
            this.finalEnemy &&
            !this.finalEnemy.isDead &&
            bubble.isColliding(this.finalEnemy);
    }

    /**
     * Damages the final enemy when hit by a poison bubble, updates health bar, and handles win condition.
     * @param {ShootableObjects} bubble - The poison bubble that hit the final enemy.
     */
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

    /**
     * Checks for collisions between the character and the final enemy.
     */
    checkFinalEnemyCollision() {
        if (this._shouldFinalEnemyHitCharacter()) {
            this._handleFinalEnemyHitCharacter();
        }
    }

    /**
     * Determines if the final enemy should hit the character.
     * @returns {boolean} True if the final enemy can hit the character and they are colliding.
     */
    _shouldFinalEnemyHitCharacter() {
        return this.finalEnemy &&
            !this.finalEnemy.isDead &&
            this.character.isColliding(this.finalEnemy) &&
            this.finalEnemy.canHitCharacter;
    }

    /**
     * Handles the logic when the final enemy hits the character, including updating energy, status bar, and sound.
     */
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
        if (this._shouldIntroduceFinalEnemy()) {
            this._startFinalEnemyIntroduction(finalEnemySplashSound);
        }
        if (this._shouldShowFinalEnemy()) {
            this.addToMap(this.finalEnemy);
        }
    }

    /**
     * Determines if the final enemy should be introduced.
     * @returns {boolean}
     */
    _shouldIntroduceFinalEnemy() {
        return this.finalEnemy &&
            !this.finalEnemy.isIntroducing &&
            (this.character.x === 2151);
    }

    /**
     * Starts the final enemy introduction sequence.
     * @param {HTMLAudioElement} finalEnemySplashSound
     */
    _startFinalEnemyIntroduction(finalEnemySplashSound) {
        this.finalEnemy.isIntroducing = true;
        this.finalEnemy.introduceFrame = 0;
        this.finalEnemyVisible = true;
        finalEnemySplashSound.play();
    }

    /**
     * Determines if the final enemy should be shown.
     * @returns {boolean}
     */
    _shouldShowFinalEnemy() {
        return this.finalEnemy &&
            (this.finalEnemy.isIntroducing || this.finalEnemyVisible);
    }

    /**
     * Checks for collisions between bubbles and enemies.
     */
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

    /**
     * Determines if a bubble should kill an enemy.
     * @param {ShootableObjects} bubble
     * @param {MovableObject} enemy
     * @returns {boolean}
     */
    _shouldBubbleKillEnemy(bubble, enemy) {
        return (enemy instanceof JellyFish || enemy instanceof PufferFish) &&
            bubble.isColliding(enemy) &&
            !enemy.isDead;
    }

    /**
    * Handles the logic when a bubble kills an enemy.
    * @param {ShootableObjects} bubble
    * @param {MovableObject} enemy
    */
    _bubbleKillsEnemy(bubble, enemy) {
        enemy.dieAndRemove(this.level.enemies);
        this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
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
                if (this._shouldCollectBottle(bottle)) {
                    this._collectBottle(bottle);
                }
            });
        }, 200);
    }

    /**
    * Determines if the character should collect a bottle.
    * @param {Bottles} bottle
    * @returns {boolean}
    */
    _shouldCollectBottle(bottle) {
        return this.character.isColliding(bottle);
    }

    /**
    * Handles the logic for collecting a bottle.
    * @param {Bottles} bottle
    */
    _collectBottle(bottle) {
        this.bottlesBar.collectBottle();
        this.level.removeObject(bottle);
        const bottleSound = document.getElementById('collectBottleSound');
        bottleSound.currentTime = 0;
        bottleSound.play();
    }

    /**
     * Checks for collisions between the character and coins, and collects them.
     */
    checkCollectCoin() {
        setInterval(() => {
            this.level.coins.forEach(coin => {
                if (this._shouldCollectCoin(coin)) {
                    this._collectCoin(coin);
                }
            });
        }, 200);
    }

    /**
    * Determines if the character should collect a coin.
    * @param {Coin} coin
    * @returns {boolean}
    */
    _shouldCollectCoin(coin) {
        return this.character.isColliding(coin);
    }

    /**
    * Handles the logic for collecting a coin.
    * @param {Coin} coin
    */
    _collectCoin(coin) {
        this.coinsBar.collectCoin();
        this.level.removeObject(coin);
        const coinSound = document.getElementById('coinCollectSound');
        coinSound.currentTime = 0;
        coinSound.play();
    }

    /**
     * Handles all collision checks between the character, enemies, and bubbles in the game world.
     */
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
        this._clearAndTranslate();
        this._drawGameObjects();
        this._drawUI();
        this._handleGameLogic();
        requestAnimationFrame(() => this.draw());
    }


    /**
     * Clears the entire canvas and applies the camera translation.
     * Prepares the drawing context for rendering the game world at the correct camera position.
     * @private
     */
    _clearAndTranslate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Draws all main game objects to the canvas, including background, enemies, collectibles, and the player character.
     * Also handles the introduction and rendering of the final enemy.
     * @private
     */
    _drawGameObjects() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.checkFinalEnemyIntroduce();
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.shootableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Draws the user interface elements such as status bars and the endboss health bar.
     * Ensures UI is rendered above the game world and at the correct position.
     * @private
     */
    _drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.coinsBar);
        this.showEndbossHealthBar();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Handles core game logic such as checking collisions and updating game state each frame.
     */
    _handleGameLogic() {
        this.checkPoisonBubbleFinalEnemyCollision();
        this.handleCollisions();
        if (this.finalEnemyVisible && this.finalEnemy && !this.finalEnemy.isDead && this.character && this.finalEnemy.hasIntroduced) {
            const dx = this.character.x - this.finalEnemy.x;
            const dy = this.character.y - this.finalEnemy.y;
            if (typeof FinalEnemy.approachCharacter === 'function') {
                FinalEnemy.approachCharacter(this.finalEnemy, dx, dy, 4);
            }
        }
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
        this._translateToObjectCenter(obj);
        this._applyObjectTransforms(obj);
        this._drawObjectImage(obj);
        this.ctx.restore();
    }

    /**
         * Translates the context to the center of the object.
         * @param {DrawableObject} obj
         */
    _translateToObjectCenter(obj) {
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
    }

    /**
    * Applies transforms (flip/rotation) to the context for the object.
    * @param {DrawableObject} obj
    */
    _applyObjectTransforms(obj) {
        if (obj.isFacingLeft) {
            this.ctx.scale(-1, 1);
        }
        if (obj.rotation && obj.rotation !== 0) {
            this.ctx.rotate((obj.rotation * Math.PI) / 180);
        }
    }

    /**
     * Draws the object's image to the context.
     * @param {DrawableObject} obj
     */
    _drawObjectImage(obj) {
        this.ctx.drawImage(
            obj.img,
            -obj.width / 2,
            -obj.height / 2,
            obj.width,
            obj.height
        );
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