/**
 * Represents the main game world, managing all game objects, collisions, and rendering.
 */
class World {
    character = new Character();
    level = World.createLevel();
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
     * Initializes the World instance, sets up canvas, keyboard, and starts game logic.
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
     * Sets the world reference for character and final enemy.
     */
    setWorld() {
        this.character.world = this;
        if (this.finalEnemy) {
            this.finalEnemy.world = this;
        }
    }

    /**
     * Checks for collisions between poison bubbles and the final enemy, applying damage if needed.
     */
    checkPoisonBubbleFinalEnemyCollision() {
        this.shootableObjects.forEach(bubble => {
            if (this._shouldDamageFinalEnemy(bubble)) {this._damageFinalEnemy(bubble);}
        });
    }

    /**
     * Determines if a bubble should damage the final enemy.
     * @param {ShootableObjects} bubble - The bubble to check.
     * @returns {boolean} True if the bubble should damage the final enemy.
     */
    _shouldDamageFinalEnemy(bubble) {
        return bubble.isPoisoned &&
            this.finalEnemy &&
            !this.finalEnemy.isDead &&
            bubble.isColliding(this.finalEnemy);
    }

    /**
     * Applies damage to the final enemy and handles win condition.
     * @param {ShootableObjects} bubble - The bubble causing damage.
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
     * Checks for collision between the character and the final enemy, handling hit logic.
     */
    checkFinalEnemyCollision() {
        if (this._shouldFinalEnemyHitCharacter()) {this._handleFinalEnemyHitCharacter();}
    }

    /**
     * Determines if the final enemy should hit the character.
     * @returns {boolean} True if the final enemy should hit the character.
     */
    _shouldFinalEnemyHitCharacter() {
        return this.finalEnemy &&
            !this.finalEnemy.isDead &&
            this.character.isColliding(this.finalEnemy) &&
            this.finalEnemy.canHitCharacter;
    }

    /**
     * Handles the logic when the final enemy hits the character.
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
     * Displays the endboss health bar when the character reaches a specific position.
     */
    showEndbossHealthBar() {
        if (this.character.x >= 2151) {this.endbossHealthBarVisible = true;}
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
        if (this._shouldIntroduceFinalEnemy()) {this._startFinalEnemyIntroduction(finalEnemySplashSound);}
        if (this._shouldShowFinalEnemy()) {this.addToMap(this.finalEnemy);}
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
        return this.finalEnemy && (this.finalEnemy.isIntroducing || this.finalEnemyVisible);
    }

    /**
     * Sets up interval to check for bubble collisions with enemies.
     */
    checkBubbleCollisions() {
        setInterval(() => {
            this.shootableObjects.forEach(bubble => {
                this.level.enemies.forEach(enemy => {
                    if (this._shouldBubbleKillEnemy(bubble, enemy)) {this._bubbleKillsEnemy(bubble, enemy);}
                });
            });
        }, 100);
    }

    /**
     * Determines if a bubble should kill an enemy.
     * @param {ShootableObjects} bubble - The bubble to check.
     * @param {JellyFish|PufferFish} enemy - The enemy to check.
     * @returns {boolean} True if the bubble should kill the enemy.
     */
    _shouldBubbleKillEnemy(bubble, enemy) {
        return (enemy instanceof JellyFish || enemy instanceof PufferFish) && bubble.isColliding(enemy) && !enemy.isDead;
    }

    /**
     * Handles logic for when a bubble kills an enemy.
     * @param {ShootableObjects} bubble - The bubble that kills the enemy.
     * @param {JellyFish|PufferFish} enemy - The enemy being killed.
     */
    _bubbleKillsEnemy(bubble, enemy) {
        enemy.dieAndRemove(this.level.enemies);
        this.shootableObjects.splice(this.shootableObjects.indexOf(bubble), 1);
    }

    /**
     * Spawns a regular bubble at the character's position.
     * @param {number} x - The x coordinate (unused).
     * @param {number} y - The y coordinate (unused).
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
     * @param {number} x - The x coordinate (unused).
     * @param {number} y - The y coordinate (unused).
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
     * Sets up interval to check for bottle collection by the character.
     */
    checkCollectBottle() {
        setInterval(() => {
            this.level.bottles.forEach(bottle => {
                if (this._shouldCollectBottle(bottle)) {this._collectBottle(bottle);}
            });
        }, 200);
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
     * Sets up interval to check for coin collection by the character.
     */
    checkCollectCoin() {
        setInterval(() => {
            this.level.coins.forEach(coin => {
                if (this._shouldCollectCoin(coin)) {this._collectCoin(coin);}
            });
        }, 200);
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

    /**
     * Handles all collision checks between the character, enemies, and bubbles.
     */
    handleCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead) {this._handleCharacterEnemyCollision(enemy);}
        });
        this.checkFinalEnemyCollision();
        this.checkPoisonBubbleFinalEnemyCollision();
    }
}

window.World = World;
