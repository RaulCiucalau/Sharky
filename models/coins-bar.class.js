/**
 * Represents the coins bar UI element, showing collected coins as a percentage.
 * @extends DrawableObject
 */
class CoinsBar extends DrawableObject {
    /**
     * Number of coins collected.
     * @type {number}
     */
    coinsCollected = 0;
    /**
     * Array of image paths for each coins bar state.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'img/4. Marcadores/green/Coin/0_copia 4.png',
        'img/4. Marcadores/green/Coin/20_copia 2.png',
        'img/4. Marcadores/green/Coin/40_copia 4.png',
        'img/4. Marcadores/green/Coin/60_copia 4.png',
        'img/4. Marcadores/green/Coin/80_copia 4.png',
        'img/4. Marcadores/green/Coin/100_copia 4.png',
    ];
    /**
     * Current percentage of coins collected (0-100).
     * @type {number}
     */
    percentage = 0;

    /**
     * Creates a new CoinsBar instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.width = 220;
        this.height = 60;
        this.x = 470;
        this.y = 0;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of coins collected and updates the bar image.
     * @param {number} percentage - The percentage to set (0-100).
     */
    setPercentage(percentage) {
        percentage = Math.max(0, Math.min(percentage, 100));
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex(percentage)];
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

    /**
     * Increments the number of coins collected and updates the bar.
     */
    collectCoin() {
        this.coinsCollected++;
        let percent = Math.round((this.coinsCollected / 10) * 100);
        percent = Math.round(percent / 20) * 20;
        this.setPercentage(percent);
    }
}