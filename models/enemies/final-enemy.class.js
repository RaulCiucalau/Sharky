/**
 * FinalEnemy class for the Sharky game. Controls the boss enemy's state, animation, and attack logic.
 * @extends MovableObject
 */
class FinalEnemy extends MovableObject {
    x = 2480;
    y = -100;
    height = 500;
    width = 500;
    speed = 0.05;
    imgs_dead = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];
    imgs_hurt = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];
    imgs_attack = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];
    imgs_introduce = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];
    imgs_floating = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png'
    ];
    offset = {
        left: 55,
        right: 80,
        top: 260,
        bottom: 120
    };
    isIntroducing = false;
    introduceFrame = 0;
    hasIntroduced = false;
    attackTimer = 0;
    isDead = false;
    isHurt = false;
    energy = 30;

    /**
     * Initializes the final enemy and loads all images.
     */
    constructor() {
        super().loadImage(this.imgs_introduce[0]);
        this.loadImages(this.imgs_dead);
        this.loadImages(this.imgs_hurt);
        this.loadImages(this.imgs_attack);
        this.loadImages(this.imgs_floating);
        this.loadImages(this.imgs_introduce);
        this.animate();
    }

    /**
     * Reduces energy and triggers hurt or death state.
     * @param {number} amount
     */
    takeDamage(amount) {
        this.energy = Math.max(0, this.energy - amount);
        if (this.energy === 0) {
            this.isDead = true;
        } else {
            this.isHurt = true;
            this.hurtFrame = 0;
        }
    }

    /**
     * Starts the animation interval for the enemy's state machine.
     */
    animate() {
        let deadFrame = 0;
        setInterval(() => {
            if (this.energy === 0) this.isDead = true;
            if (this.isDead) return this.handleDeadState(deadFrame++);
            if (this.isIntroducing && !this.hasIntroduced) return this.handleIntroduceState();
            if (this.isHurt) return this.handleHurtState();
            if (this.hasIntroduced) return this.handleAttackOrFloatState();
        }, 160);
    }

    /**
     * Handles the dead animation state.
     * @param {number} deadFrame
     */
    handleDeadState(deadFrame) {
        if (deadFrame < this.imgs_dead.length) {
            let path = this.imgs_dead[deadFrame];
            this.img = this.imageCache[path];
        } else {
            this.img = this.imageCache[this.imgs_dead[this.imgs_dead.length - 1]];
        }
    }

    /**
     * Handles the introduction animation state.
     */
    handleIntroduceState() {
        this.isHurt = false;
        this.hurtFrame = 0;
        if (this.introduceFrame < this.imgs_introduce.length) {
            let path = this.imgs_introduce[this.introduceFrame];
            this.img = this.imageCache[path];
            this.introduceFrame++;
            if (!this.isDead) this.moveLeft();
        } else {
            this.isIntroducing = false;
            this.hasIntroduced = true;
            this.introduceFrame = 0;
            this.currentImage = 0;
        }
    }

    /**
     * Handles the hurt animation state.
     */
    handleHurtState() {
        if (this.hurtFrame === undefined) this.hurtFrame = 0;
        if (this.hurtFrame < this.imgs_hurt.length) {
            let path = this.imgs_hurt[this.hurtFrame];
            this.img = this.imageCache[path];
            this.hurtFrame++;
        } else {
            this.isHurt = false;
            this.hurtFrame = 0;
        }
    }

    /**
     * Handles attack or floating state logic.
     */
    handleAttackOrFloatState() {
        this.attackTimer += 160;
        if (this.isAttacking) {
            return this.handleAttackState();
        } else if (this.attackTimer >= 2000) {
            return this.startAttack();
        } else {
            return this.handleFloatState();
        }
    }

    /**
     * Handles the attack animation state.
     */
    handleAttackState() {
        if (this.attackFrame < this.imgs_attack.length) {
            let path = this.imgs_attack[this.attackFrame];
            this.img = this.imageCache[path];
            this.attackFrame++;
        } else {
            this.isAttacking = false;
            this.attackFrame = 0;
        }
    }

    /**
     * Starts the attack sequence.
     */
    startAttack() {
        this.isAttacking = true;
        this.attackFrame = 0;
        this.attackTimer = 0;
    }

    /**
     * Handles the floating animation state.
     */
    handleFloatState() {
        this.playAnimation(this.imgs_floating);
    }
}