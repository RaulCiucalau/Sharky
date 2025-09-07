/**
 * Base class for all drawable game objects.
 * Handles image loading, drawing, and image caching.
 */
class DrawableObject {
    /**
     * The current image object.
     * @type {HTMLImageElement}
     */
    img;
    /**
     * Cache of loaded images by path.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};
    /**
     * The current image index for animation.
     * @type {number}
     */
    currentImage = 0;
    /**
     * The x position of the object.
     * @type {number}
     */
    x = 120;
    /**
     * The y position of the object.
     * @type {number}
     */
    y = 220;
    /**
     * The height of the object.
     * @type {number}
     */
    height = 150;
    /**
     * The width of the object.
     * @type {number}
     */
    width = 150;

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images and caches them by path.
     * @param {string[]} arr - Array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}