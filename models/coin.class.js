class Coin extends MovableObject {
    height = 50;
    width = 50;
    imgs_coin = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];


    constructor(x, y) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.imgs_coin);
        if (typeof x === 'number') {
            this.x = x;
        }
        if (typeof y === 'number') {
            this.y = y;
        }
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.imgs_coin.length;
            let path = this.imgs_coin[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 240);
    }
}
