/**
 * Represents the status bar UI element for player life.
 * Handles updating and displaying the player's life percentage.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Array of image paths for each life state (0% to 100%).
     * @type {string[]}
     */
    IMAGES_LIFE = [
        'img/4. Marcadores/green/Life/0_copia.png',
        'img/4. Marcadores/green/Life/20_copia.png',
        'img/4. Marcadores/green/Life/40_copia.png',
        'img/4. Marcadores/green/Life/60_copia.png',
        'img/4. Marcadores/green/Life/80_copia.png',
        'img/4. Marcadores/green/Life/100_copia.png',
    ];
    /**
     * Current life percentage (0-100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new StatusBar instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFE);
        this.width = 220;
        this.height = 60;
        this.x = 0;
        this.y = 0;
        this.setPercentage(100);
    }

    /**
     * Sets the life percentage and updates the bar image.
     * @param {number} percentage - The life percentage to set (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFE[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the given percentage.
     * @param {number} percentage - The percentage to resolve.
     * @returns {number} The index of the image to use.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) return 5;
        if (percentage >= 80) return 4;
        if (percentage >= 60) return 3;
        if (percentage >= 40) return 2;
        if (percentage >= 20) return 1;
        return 0;
    }
}