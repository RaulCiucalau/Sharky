class Character extends MovableObject {
    x = 20;
    y = 100;
    height = 280;
    width = 280;
    speed = 1;
    imgs_swim = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    world;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.imgs_swim);
        this.animate();
    }

    animate() {
        let lastMoving = false;
        const move = () => {
            let moving = false;
            if (this.world && this.world.keyboard) {
                if (this.world.keyboard.right) {
                    this.x += this.speed;
                    this.otherDirection = false;
                    moving = true;
                }
                if (this.world.keyboard.left) {
                    this.x -= this.speed;
                    this.otherDirection = true;
                    moving = true;
                }
            }
            if (moving && !lastMoving) {
                let i = this.currentImage % this.imgs_swim.length;
                let path = this.imgs_swim[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
            lastMoving = moving;
            requestAnimationFrame(move);
        };
        move();

        setInterval(() => {
            if (this.world && this.world.keyboard && (this.world.keyboard.right || this.world.keyboard.left)) {
                let i = this.currentImage % this.imgs_swim.length;
                let path = this.imgs_swim[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                this.img = this.imageCache[this.imgs_swim[0]];
                this.currentImage = 0;
            }
        }, 140);
    }
}



