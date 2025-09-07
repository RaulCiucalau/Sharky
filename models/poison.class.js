/**
 * Represents a poison bottle collectible in the game.
 * Handles animation and position.
 * @extends MovableObject
 */
class Bottles extends MovableObject {
    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 74;
    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 66;
    /**
     * Array of image paths for bottle animation.
     * @type {string[]}
     */
    imgs_poison = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png',
    ];
    /**
     * The offset for collision detection.
     * @type {{left: number, right: number, top: number, bottom: number}}
     */
    offset = {
        left: 10,
        right: 10,
        top: 1,
        bottom: 1
    };

    /**
     * Creates a new Bottles instance.
     * @param {number} x - The x position of the bottle.
     * @param {number} y - The y position of the bottle.
     */
    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.imgs_poison);
        if (typeof x === 'number') this.x = x;
        if (typeof y === 'number') this.y = y;
        this.animate();
    }

    /**
     * Starts the bottle animation loop.
     */
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.imgs_poison.length;
            let path = this.imgs_poison[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 240);
    }
}
