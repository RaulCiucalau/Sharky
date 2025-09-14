/**
 * Character class for the Sharky game. Handles movement, animation, and attack logic.
 * @extends MovableObject
 */
class Character extends MovableObject {
    attackBubbleActive = false;
    attackBubbleFrame = 0;
    attackBubblePoisonActive = false;
    attackBubblePoisonFrame = 0;
    idleTime = 0;
    rotation = 0;
    x = 0;
    y = 100;
    height = 250;
    width = 250;
    speed = 3;
    isItDead = false;
    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/i2.png',
        'img/1.Sharkie/2.Long_IDLE/i3.png',
        'img/1.Sharkie/2.Long_IDLE/i4.png',
        'img/1.Sharkie/2.Long_IDLE/i5.png',
        'img/1.Sharkie/2.Long_IDLE/i6.png',
        'img/1.Sharkie/2.Long_IDLE/i7.png',
        'img/1.Sharkie/2.Long_IDLE/i8.png',
        'img/1.Sharkie/2.Long_IDLE/i9.png',
        'img/1.Sharkie/2.Long_IDLE/i10.png',
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png',
        'img/1.Sharkie/2.Long_IDLE/i13.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png'
    ];
    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_ATTACK_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];
    IMAGES_ATTACK_BUBBLE_POISON = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
    ];
    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
    IMAGES_HURT_POISONED = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    IMAGES_HURT_ELECTRIC = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ]
    world;

    /**
     * Initializes the character and loads all images.
     */
    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE_POISON);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT_ELECTRIC);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.animate();
        this.offset = {
            left: 40,
            right: 50,
            top: 122,
            bottom: 65
        };

    }

    /**
     * Plays the long idle animation.
     * @param {string[]} images - Array of image paths.
     */
    playLongIdleAnimation(images) {
        if (this.currentImage < images.length - 4) {
            this.img = this.imageCache[images[this.currentImage]];
            this.currentImage++;
        } else {
            let loopStart = images.length - 4;
            let loopIndex = ((this.currentImage - loopStart) % 4) + loopStart;
            this.img = this.imageCache[images[loopIndex]];
            this.currentImage++;
        }
    }

    /**
     * Moves the character up.
     * @returns {boolean}
     */
    moveUp() {
        if (this.world.keyboard.up && this.y > -120) {
            this.y -= this.speed;
            this.rotation = -15;
            return true;
        }
        return false;
    }

    /**
     * Moves the character down.
     * @returns {boolean}
     */
    moveDown() {
        if (this.world.keyboard.down && this.y < 260) {
            this.y += this.speed;
            this.rotation = 15;
            return true;
        }
        return false;
    }

    /**
     * Moves the character left.
     * @returns {boolean}
     */
    moveLeft() {
        if (this.world.keyboard.left && this.x > 0) {
            this.x -= this.speed;
            this.isFacingLeft = true;
            return true;
        }
        return false;
    }

    /**
     * Moves the character right.
     * @returns {boolean}
     */
    moveRight() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.isFacingLeft = false;
            return true;
        }
        return false;
    }

    /**
     * Updates the camera position.
     */
    updateCamera() {
        this.world.camera_x = -this.x;
    }

    /**
     * Updates idle time based on movement.
     * @param {boolean} moved
     */
    updateIdleTime(moved) {
        if (moved) {
            this.idleTime = 0;
        } else {
            this.idleTime += 5;
        }
    }

    /**
     * Updates the character's rotation.
     */
    updateRotation() {
        if (this.rotation !== 0) {
            if (this.rotation > 0) this.rotation -= 1;
            if (this.rotation < 0) this.rotation += 1;
            if (this.rotation === 1 || this.rotation === -1) this.rotation = 0;
        }
    }

    /**
     * Starts the animation and movement loops.
     */
    animate() {
        let deadFrame = 0;
        this.startMoveLoop();
        this.startAnimationInterval(deadFrame);
    }

    /**
     * Starts the movement loop.
     */
    startMoveLoop() {
        this.moveLoop();
    }

    /**
     * Handles a single movement frame and schedules the next.
     */
    moveLoop() {
        let moved = false;
        if (this.world && this.world.keyboard) {
            moved = this.moveUp() || moved;
            moved = this.moveDown() || moved;
            moved = this.moveLeft() || moved;
            moved = this.moveRight() || moved;
            this.updateCamera();
        }
        this.updateIdleTime(moved);
        this.updateRotation();
        setTimeout(() => this.moveLoop(), 1000 / 60);
    }

    /**
     * Starts the animation interval for state changes.
     * @param {number} deadFrame
     */
    startAnimationInterval(deadFrame) {
        setInterval(() => {
            if (this.isDead()) return this.handleDeadAnimation(deadFrame++);
            if (this.isHurt()) return this.handleHurtAnimation();
            if (this.attackBubbleActive) return this.handleAttackBubbleAnimation();
            if (this.attackBubblePoisonActive) return this.handleAttackBubblePoisonAnimation();
            if (this.world && this.world.keyboard && this.world.keyboard.E) return this.handleStartAttackBubble();
            if (this.world && this.world.keyboard && this.world.keyboard.Q) return this.handleStartAttackBubblePoison();
            if (this.idleTime >= 10000) return this.handleLongIdleAnimation();
            if (
                this.world && this.world.keyboard &&
                (this.world.keyboard.right || this.world.keyboard.left || this.world.keyboard.up || this.world.keyboard.down)
            ) return this.handleSwimAnimation();
        }, 140);
    }

    /**
     * Handles dead animation state.
     * @param {number} deadFrame
     */
    handleDeadAnimation(deadFrame) {
        if (deadFrame < this.IMAGES_DEAD.length) {
            this.img = this.imageCache[this.IMAGES_DEAD[deadFrame]];
        } else {
            this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        }
    }

    /**
     * Handles hurt animation state.
     */
    handleHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT_POISONED);
    }

    /**
     * Handles normal attack bubble animation.
     */
    handleAttackBubbleAnimation() {
        let i = this.attackBubbleFrame;
        if (i < this.IMAGES_ATTACK_BUBBLE.length) {
            this.img = this.imageCache[this.IMAGES_ATTACK_BUBBLE[i]];
            this.attackBubbleFrame++;
        } else {
            this.attackBubbleActive = false;
            this.attackBubbleFrame = 0;
            if (this.world && typeof this.world.spawnBubble === 'function') {
                this.world.spawnBubble(this.x + this.width, this.y + this.height / 2);
            }
        }
    }

    /**
     * Handles poison attack bubble animation.
     */
    handleAttackBubblePoisonAnimation() {
        let i = this.attackBubblePoisonFrame;
        if (i < this.IMAGES_ATTACK_BUBBLE_POISON.length) {
            this.img = this.imageCache[this.IMAGES_ATTACK_BUBBLE_POISON[i]];
            this.attackBubblePoisonFrame++;
        } else {
            this.attackBubblePoisonActive = false;
            this.attackBubblePoisonFrame = 0;
            if (this.world && typeof this.world.spawnPoisonBubble === 'function') {
                this.world.spawnPoisonBubble(this.x + this.width, this.y + this.height / 2);
            }
        }
    }

    /**
     * Starts normal attack bubble.
     */
    handleStartAttackBubble() {
        this.attackBubbleActive = true;
        this.attackBubbleFrame = 0;
        this.img = this.imageCache[this.IMAGES_ATTACK_BUBBLE[0]];
    }

    /**
     * Starts poison attack bubble if available.
     */
    handleStartAttackBubblePoison() {
        if (this.world.bottlesBar.bottlesCollected > 0) {
            this.attackBubblePoisonActive = true;
            this.attackBubblePoisonFrame = 0;
            this.img = this.imageCache[this.IMAGES_ATTACK_BUBBLE_POISON[0]];
        }
    }

    /**
     * Handles long idle animation.
     */
    handleLongIdleAnimation() {
        this.playLongIdleAnimation(this.IMAGES_LONG_IDLE);
    }

    /**
     * Handles swim animation.
     */
    handleSwimAnimation() {
        this.playAnimation(this.IMAGES_SWIM);
    }
}