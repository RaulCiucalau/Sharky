class Character extends MovableObject {
    rotation = 0;
    x = 0;
    y = 100;
    height = 280;
    width = 280;
    speed = 5;
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
        const moveDown = () => {
            if (this.world && this.world.keyboard && this.world.keyboard.down && this.y < 260) {
                this.y += this.speed;
            }
            requestAnimationFrame(moveDown);
        };

        const moveUp = () => {
            if (this.world && this.world.keyboard && this.world.keyboard.up && this.y > -120) {
                this.y -= this.speed;
            }
            requestAnimationFrame(moveUp);
        };

        const move = () => {
            if (this.world && this.world.keyboard) {
                if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                    this.x += this.speed;
                    this.isFacingLeft = false;
                }
                if (this.world.keyboard.left && this.x > 0) {
                    this.x -= this.speed;
                    this.isFacingLeft = true;
                }
                this.world.camera_x = -this.x;
            }
            requestAnimationFrame(move);
        };

        move();
        moveUp();
        moveDown();

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
