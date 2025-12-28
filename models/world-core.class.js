class WorldCore {
    character = new Character();
    level = WorldCore.createLevel();
    camera_x = 0;
    statusBar = new StatusBar();
    bottlesBar = new BottlesBar();
    healthBarEndboss = new HealthBarEndboss();
    coinsBar = new CoinsBar();
    shootableObjects = [];
    finalEnemy = new FinalEnemy();
    endbossHealthBarVisible = false;
    finalEnemyVisible = false;
    paused = false;
    drawHandler = new WorldDrawHandler();
    gameHelper = new WorldGameHelper();
    bubbleAttack = new WorldBubbleAttack();

    /**
     * Initializes the WorldCore instance, sets up canvas, keyboard, and starts game logic.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.drawHandler.draw(this);
        this.gameHelper.checkCollectBottle(this);
        this.gameHelper.checkCollectCoin(this);
        this.bubbleAttack.checkBubbleCollisions(this);
        this.showEndbossHealthBar();
    }

    /**
     * Creates and returns a new Level instance with enemies, background objects, coins, and bottles.
     * @returns {Level} The created level object.
     */
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

    /**
     * Returns true if bubble should kill enemy (collision and not dead).
     */
    _shouldBubbleKillEnemy(bubble, enemy) {
        return bubble.isColliding(enemy) && !enemy.isDead;
    }

    /**
     * Handles bubble killing enemy (sets dead, removes bubble).
     */
    _bubbleKillsEnemy(bubble, enemy) {
        enemy.isDead = true;
        this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
        const floatInterval = setInterval(() => { enemy.y -= 5; }, 30);
        setTimeout(() => {
            clearInterval(floatInterval);
            if (this.level && Array.isArray(this.level.enemies)) {
                const idx = this.level.enemies.indexOf(enemy);
                if (idx !== -1) this.level.enemies.splice(idx, 1);
            }
            if (this.level && typeof this.level.removeObject === 'function') this.level.removeObject(enemy);
        }, 1000);
    }

    /**
     * Spawns a normal bubble at the given position.
     */
    spawnBubble(x, y) {
        this.bubbleAttack.spawnBubble(this, x, y);
    }

    /**
     * Spawns a poison bubble at the given position.
     */
    spawnPoisonBubble(x, y) {
        this.bubbleAttack.spawnPoisonBubble(this, x, y);
    }

    /**
     * Sets the world reference for character and final enemy.
     */
    setWorld() {
        this.character.world = this;
        if (this.finalEnemy) this.finalEnemy.world = this;
    }

    /**
     * Adds multiple objects to the map for rendering.
     * @param {Array} objects - The objects to add to the map.
     */
    addObjectToMap(objects) {
        objects.forEach(object => { this.addToMap(object); });
    }

    /**
     * Adds a single object to the map and applies transforms.
     * @param {Object} obj - The object to add to the map.
     */
    addToMap(obj) {
        this.ctx.save();
        this._translateToObjectCenter(obj);
        this._applyObjectTransforms(obj);
        this._drawObjectImage(obj);
        this.ctx.restore();
    }

    /**
     * Translates the canvas context to the center of the object.
     * @param {Object} obj - The object to translate to.
     */
    _translateToObjectCenter(obj) {
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
    }

    /**
     * Applies transforms (scale, rotate) to the object on the canvas context.
     * @param {Object} obj - The object to transform.
     */
    _applyObjectTransforms(obj) {
        if (obj.isFacingLeft) this.ctx.scale(-1, 1);
        if (obj.rotation && obj.rotation !== 0) this.ctx.rotate((obj.rotation * Math.PI) / 180);
    }

    /**
     * Draws the object's image on the canvas context.
     * @param {Object} obj - The object to draw.
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
     * Handles the introduction sequence for the final enemy.
     */
    checkFinalEnemyIntroduce() {
        const finalEnemySplashSound = document.getElementById('finalEnemySplash');
        if (this._shouldIntroduceFinalEnemy()) this._startFinalEnemyIntroduction(finalEnemySplashSound);
        if (this._shouldShowFinalEnemy()) this.addToMap(this.finalEnemy);
    }

    /**
     * Determines if the final enemy should be introduced.
     * @returns {boolean} True if the final enemy should be introduced.
     */
    _shouldIntroduceFinalEnemy() {
        return this.finalEnemy &&
            !this.finalEnemy.isIntroducing &&
            !this.finalEnemyVisible &&
            (this.character.x >= 2151);
    }

    /**
     * Starts the final enemy introduction sequence and plays splash sound.
     * @param {HTMLAudioElement} finalEnemySplashSound - The splash sound element.
     */
    _startFinalEnemyIntroduction(finalEnemySplashSound) {
        this.finalEnemy.isIntroducing = true;
        this.finalEnemy.introduceFrame = 0;
        this.finalEnemyVisible = true;
        finalEnemySplashSound.play();
    }

    /**
     * Determines if the final enemy should be shown on the map.
     * @returns {boolean} True if the final enemy should be shown.
     */
    _shouldShowFinalEnemy() {
        return this.finalEnemy &&
            (this.finalEnemy.isIntroducing || this.finalEnemyVisible);
    }

    /**
     * Displays the endboss health bar when the character reaches a specific position.
     */
    showEndbossHealthBar() {
        if (this.character.x >= 2151) this.endbossHealthBarVisible = true;
        if (this.endbossHealthBarVisible) {
            if (this.finalEnemy.energy === 0) {
                document.getElementById('gameWinDialog').classList.remove('dp-none-win');
                this.paused = true;
            }
            this.addToMap(this.healthBarEndboss);
        }
    }

    /**
     * Checks for collisions between poison bubbles and the final enemy, applying damage if needed.
     */
    checkPoisonBubbleFinalEnemyCollision() {
        this.shootableObjects.forEach(bubble => {
            if (bubble.isPoisoned && this.finalEnemy && !this.finalEnemy.isDead && bubble.isColliding(this.finalEnemy)) {
                this.damageFinalEnemyWithPoisonBubble(bubble);
                if (this.finalEnemy.energy === 0) {
                    document.getElementById('gameWinDialog').classList.remove('dp-none-win');
                    this.paused = true;
                }
            }
        });
    }

    /**
     * Applies damage to the final enemy when hit by a poison bubble.
     * @param {ShootableObjects} bubble - The bubble causing damage.
     */
    damageFinalEnemyWithPoisonBubble(bubble) {
        this.finalEnemy.energy = Math.max(0, this.finalEnemy.energy - 10);
        this.finalEnemy.isHurt = true;
        this.finalEnemy.hurtFrame = 0;
        this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
        this.healthBarEndboss.setPercentage(this.finalEnemy.energy);
    }

    /**
     * Handles all collision checks between the character, enemies, and bubbles.
     */
    handleCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead) this._handleCharacterEnemyCollision(enemy);
        });
        this.checkFinalEnemyCollision();
        this.checkPoisonBubbleFinalEnemyCollision();
    }

    /**
     * Handles collision logic between the character and an enemy.
     * @param {JellyFish|PufferFish|FinalEnemy} enemy - The enemy involved in the collision.
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
     * Plays the hurt sound if the character's energy decreased and is hurt.
     * @param {number} prevEnergy - The character's previous energy value.
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
     */
    _handleGameOverIfNeeded() {
        if (this.character.energy === 0 && !this.character.isItDead) {
            this.character.isItDead = true;
            document.querySelector('.game-over-dialog').classList.remove('dp-none');
            this.paused = true;
        }
    }
    /**
     * Checks for collision between the character and the final enemy, handling hit logic.
     */
    checkFinalEnemyCollision() {
        if (this.finalEnemy &&
            !this.finalEnemy.isDead &&
            this.character.isColliding(this.finalEnemy) &&
            this.finalEnemy.canHitCharacter) {
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
    }

    /**
     * Determines if the character should collect a coin.
     * @param {Coin} coin - The coin to check.
     * @returns {boolean} True if the coin should be collected.
     */
    _shouldCollectCoin(coin) {
        return this.character.isColliding(coin);
    }

    /**
     * Determines if the character should collect a bottle.
     * @param {Bottles} bottle - The bottle to check.
     * @returns {boolean} True if the bottle should be collected.
     */
    _shouldCollectBottle(bottle) {
        return this.character.isColliding(bottle);
    }

    /**
     * Handles logic for collecting a bottle.
     * @param {Bottles} bottle - The bottle being collected.
     */
    _collectBottle(bottle) {
        this.bottlesBar.collectBottle();
        this.level.removeObject(bottle);
        const bottleSound = document.getElementById('collectBottleSound');
        bottleSound.currentTime = 0;
        bottleSound.play();
    }

    /**
     * Handles logic for collecting a coin.
     * @param {Coin} coin - The coin being collected.
     */
    _collectCoin(coin) {
        this.coinsBar.collectCoin();
        this.level.removeObject(coin);
        const coinSound = document.getElementById('coinCollectSound');
        coinSound.currentTime = 0;
        coinSound.play();
    }
}
window.WorldCore = WorldCore;
