/**
 * Base class for all drawable game objects.
 * Handles image loading, drawing, and image caching.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 220;
    height = 150;
    width = 150;

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
    path = path ?? '';
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