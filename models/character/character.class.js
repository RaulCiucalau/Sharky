class Character extends MovableObject {
    rotation = 0;
    x = 0;
    y = 100;
    height = 280;
    width = 280;
    speed = 12;
    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
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
    energy = 100;
    offset = {
        left: 70,
        right: 70,
        top: 150,
        bottom: 80
    };

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT_ELECTRIC);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.animate();
    }

    animate() {
        const moveLoop = () => {
            if (this.world && this.world.keyboard) {
                if (this.world.keyboard.up && this.y > -120) {
                    this.y -= this.speed;
                    this.rotation = -15;
                }
                if (this.world.keyboard.down && this.y < 260) {
                    this.y += this.speed;
                    this.rotation = 15;
                }
                if (this.world.keyboard.left && this.x > 0) {
                    this.x -= this.speed;
                    this.isFacingLeft = true;
                }
                if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                    this.x += this.speed;
                    this.isFacingLeft = false;
                }
                this.world.camera_x = -this.x;
            }
            if (this.rotation !== 0) {
                if (this.rotation > 0) this.rotation -= 1;
                if (this.rotation < 0) this.rotation += 1;
                if (this.rotation === 1 || this.rotation === -1) this.rotation = 0;
            }
            requestAnimationFrame(moveLoop);
        };
        moveLoop();
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_POISONED);
            } else if (this.world && this.world.keyboard && (this.world.keyboard.right || this.world.keyboard.left)) {
                this.playAnimation(this.IMAGES_SWIM);
            } else {
                this.img = this.imageCache[this.IMAGES_SWIM[0]];
                this.currentImage = 0;
            }
        }, 140);
    }
}