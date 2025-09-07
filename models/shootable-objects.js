/**
 * Represents a shootable object (bubble or poisoned bubble) in the game.
 * Handles movement and image selection based on type and direction.
 * @extends MovableObject
 */
class ShootableObjects extends MovableObject {
    /**
     * Path to the regular bubble image.
     * @type {string}
     */
    img_bubble = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    /**
     * Path to the poisoned bubble image.
     * @type {string}
     */
    img_poisoned_bubble = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';

    /**
     * Creates a new ShootableObjects instance.
     * @param {boolean} [isPoisoned=false] - Whether the bubble is poisoned.
     * @param {string} direction - The direction to move ('left' or 'right').
     */
    constructor(isPoisoned = false, direction) {
        super();
        if (isPoisoned) {
            this.loadImage(this.img_poisoned_bubble);
        } else {
            this.loadImage(this.img_bubble);
        }
        this.width = 50;
        this.height = 50;
        this.direction = direction;
        this.isPoisoned = isPoisoned;
    }

    /**
     * Starts moving the bubble in its set direction.
     */
    move() {
        setInterval(() => {
            if (this.direction === 'left') this.x -= 8;
            else this.x += 8;
        }, 1000 / 60);
    }
}