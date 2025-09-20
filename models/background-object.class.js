/**
 * Represents a background object in the game world.
 * Used for rendering static or scrolling backgrounds.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new BackgroundObject.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - The x position of the background object.
     * @param {number} [height] - Optional custom height.
     * @param {number} [width] - Optional custom width.
     */
    constructor(imagePath, x, height, width) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}