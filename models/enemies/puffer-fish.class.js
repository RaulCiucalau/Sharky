class PufferFish extends MovableObject {
    height = 100;
    width = 100;
    imgs_fish_swim = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png'
    ];
    offset = {
        left: 90,
        right: 96,
        top: 70,
        bottom: 90
    };

    constructor(i) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.imgs_fish_swim);
        this.speed = 0.4 + Math.random() * 0.25;
        this.y = 100 + i * 20 + Math.random() * 40;
        this.x = 700 + i * 300 + Math.random() * 200;
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