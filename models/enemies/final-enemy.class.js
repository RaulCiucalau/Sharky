/**
 * FinalEnemy class for the Sharky game. Controls the boss enemy's state, animation, and attack logic.
 * @extends MovableObject
 */
class FinalEnemy extends MovableObject {
    /**
     * Guides the boss to approach the character position with a smooth step.
     * @param {FinalEnemy} boss - The boss instance.
     * @param {number} dx - Horizontal distance to character.
     * @param {number} dy - Vertical distance to character.
     * @param {number} deltaTime - Frame time for movement calculation.
     */
    static approachCharacter(boss, dx, dy, deltaTime) {
        if (!boss.world || !boss.world.character) return;
        const character = boss.world.character;
        const bossCenterX = boss.x + boss.width / 2;
        const bossCenterY = boss.y + boss.height / 2;
        const charCenterX = character.x + character.width / 2;
        const charCenterY = character.y + character.height / 2;
        const dxCenter = charCenterX - bossCenterX;
        const dyCenter = charCenterY - bossCenterY;
        const isTouching = boss.isColliding(character);
        if (!isTouching) {
            const distance = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
            if (distance > 0.5) {
                const step = boss.speed * deltaTime;
                boss.x += (dxCenter / distance) * step;
                boss.y += (dyCenter / distance) * step;
                boss.isFacingLeft = dxCenter > 0;
            }
        }
    }
    x = 2480;
    y = -70;
    height = 400;
    width = 400;
    speed = 0.25;
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
        left: 40,
        right: 40,
        top: 200,
        bottom: 100
    };
    isIntroducing = false;
    introduceFrame = 0;
    hasIntroduced = false;
    attackTimer = 0;
    isDead = false;
    isHurt = false;
    energy = 50;

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
 * Handles attack or floating state logic, and follows the character vertically in real time.
 * @override
 */
    handleAttackOrFloatState() {
        this.attackTimer += 160;
        if (this.world?.character) {
            const char = this.world.character;
            const dx = (char.x + char.width / 2) - (this.x + this.width / 2);
            const dy = char.y - (this.y + this.height / 2);
            FinalEnemy.approachCharacter(this, dx, dy, 1);
        }
        if (this.isAttacking) return this.handleAttackState();
        if (this.shouldStartAttack()) return this.startAttack();
        return this.handleFloatState();
    }

    shouldStartAttack() {
        return this.attackTimer >= 2000;
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