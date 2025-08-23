class FinalEnemy extends MovableObject {
    x = 2480;
    y = -100;
    height = 500;
    width = 500;
    speed = 0.08;
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
        left: 56,
        right: 57,
        top: 150,
        bottom: 70
    };
    isIntroducing = false;
    introduceFrame = 0;
    hasIntroduced = false;

    constructor() {
        super().loadImage(this.imgs_introduce[0]);
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
                this.playAnimation(this.imgs_floating);
            }
        }, 160);
    }
}