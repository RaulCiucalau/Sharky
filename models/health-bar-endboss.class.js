/**
 * Represents the endboss health bar UI element.
 * Handles updating and displaying the endboss's health percentage.
 * @extends DrawableObject
 */
class HealthBarEndboss extends DrawableObject {
    /**
     * Array of image paths for each health state (0% to 100%).
     * @type {string[]}
     */
    IMAGES = [
       'img/4. Marcadores/Purple/health_0.png',
        'img/4. Marcadores/Purple/health_20.png',
        'img/4. Marcadores/Purple/health_40.png',
        'img/4. Marcadores/Purple/health_60.png',
        'img/4. Marcadores/Purple/health_80.png',
        'img/4. Marcadores/Purple/health_100.png',
    ];
    /**
     * Current health percentage (0-100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new HealthBarEndboss instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 200;
        this.y = 400;
        this.width = 300;
        this.height = 80;
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage and updates the bar image.
     * @param {number} percentage - The health percentage to set (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the given percentage.
     * @param {number} percentage - The percentage to resolve.
     * @returns {number} The index of the image to use.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) return 5;
        if (percentage >= 30) return 2;
        if (percentage >= 20) return 3;
        if (percentage >= 10) return 2;
        return 0;
    }
}
