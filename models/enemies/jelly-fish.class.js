class JellyFish extends MovableObject {
    y = 300;
    height = 96;
    width = 96;
    imgs_regular_damage = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ]

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.imgs_regular_damage);
        this.speed = 0.6 + Math.random() * 0.5;
        this.y = 300 + Math.random() * 100;
        this.x = 300 + Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
        this.speed = 0.2 + Math.random() * 0.3;
        this.moveUp();

        setInterval(() => {
            let i = this.currentImage % this.imgs_regular_damage.length;
            let path = this.imgs_regular_damage[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 240)
    }
}