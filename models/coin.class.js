/**
 * Represents a collectible coin in the game.
 * Handles coin animation and position.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    height = 50;
    width = 50;
    imgs_coin = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];
    offset = {
        left: 1,
        right: 1,
        top: 1,
        bottom: 1
    };

    /**
     * Creates a new Coin instance.
     * @param {number} x - The x position of the coin.
     * @param {number} y - The y position of the coin.
     */
    constructor(x, y) {
    super().loadImage('img/4. Marcadores/1. Coins/1.png');
    this.loadImages(this.imgs_coin);
    if (typeof x === 'number') this.x = x;
    this.y = typeof y === 'number' ? y : 0;
    this.animate();
    }

    /**
     * Starts the coin animation loop.
     */
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.imgs_coin.length;
            let path = this.imgs_coin[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 240);
    }
}
