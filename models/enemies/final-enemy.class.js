class FinalEnemy extends MovableObject {
    x = 2480;
    y = -100;
    height = 500;
    width = 500;
    speed = 0.05;
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
        left: 80,
        right: 80,
        top: 260,
        bottom: 120
    };
    isIntroducing = false;
    introduceFrame = 0;
    hasIntroduced = false;
    attackTimer = 0;
    isDead = false;
    energy = 30;

    constructor() {
        super().loadImage(this.imgs_introduce[0]);
        this.loadImages(this.imgs_attack);
        this.loadImages(this.imgs_floating);
        this.loadImages(this.imgs_introduce);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isIntroducing && !this.hasIntroduced) {
                if (this.introduceFrame < this.imgs_introduce.length) {
                    let path = this.imgs_introduce[this.introduceFrame];
                    this.img = this.imageCache[path];
                    this.introduceFrame++;
                    this.moveLeft(); 
                } else {
                    this.isIntroducing = false;
                    this.hasIntroduced = true;
                    this.introduceFrame = 0;
                    this.currentImage = 0;
                }
            } else if (this.hasIntroduced) {
                this.attackTimer += 160;
                if (this.isAttacking) {
                    if (this.attackFrame < this.imgs_attack.length) {
                        let path = this.imgs_attack[this.attackFrame];
                        this.img = this.imageCache[path];
                        this.attackFrame++;
                    } else {
                        this.isAttacking = false;
                        this.attackFrame = 0;
                    }
                } else if (this.attackTimer >= 2000) {
                    this.isAttacking = true;
                    this.attackFrame = 0;
                    this.attackTimer = 0;
                } else {
                    this.playAnimation(this.imgs_floating);
                }
            }
        }, 160);
    }
}