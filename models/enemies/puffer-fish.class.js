class PufferFish extends MovableObject {
    x = 300 + Math.random() * 500 + 100;
    y = 300;
    height = 100;
    width = 100;
    imgs_fish_swim = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png'
    ];

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.imgs_fish_swim);
        this.speed = 0.4 + Math.random() * 0.25;
        this.y = 100 + Math.random() * 100;
        this.x = 300 + Math.random() * 500 + 100;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            if (Math.random() < 0.05) {
                this.y += (Math.random() - 0.5) * 4;
            }
        }, 1000 / 60);
        setInterval(() => {
            let i = this.currentImage % this.imgs_fish_swim.length;
            let path = this.imgs_fish_swim[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 240);
    }
}