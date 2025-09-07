/**
 * Base class for all movable game objects.
 * Handles movement, collision, animation, and drawing logic.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * The movement speed of the object.
     * @type {number}
     */
    speed = 0.4;
    /**
     * Whether the object is facing left.
     * @type {boolean}
     */
    isFacingLeft = false;
    /**
     * The offset for collision detection.
     * @type {{left: number, right: number, top: number, bottom: number}}
     */
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    /**
     * Timestamp of the last hit.
     * @type {number}
     */
    lastHit = 0;

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x &&
            this.y + this.height - this.offset.bottom > mo.y &&
            this.x + this.offset.left < mo.x + mo.width &&
            this.y + this.offset.top < mo.y + mo.height
        );
    }

    /**
     * Reduces energy when hit and updates lastHit timestamp.
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt (within 0.5s of last hit).
     * @returns {boolean}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation from the given image array.
     * @param {string[]} imageArray - Array of image paths.
     */
    playAnimation(imageArray) {
        let i = this.currentImage % imageArray.length;
        let path = imageArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Draws the object with transformations (flip/rotation).
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    drawTransformed(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        if (this.isFacingLeft) {
            ctx.scale(-1, 1);
        }
        if (this.rotation && this.rotation !== 0) {
            ctx.rotate((this.rotation * Math.PI) / 180);
        }
        ctx.drawImage(
            this.img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
    }

    /**
     * Draws the object flipped horizontally.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    drawFlipped(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    /**
     * Draws the object rotated by its rotation property.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    drawRotated(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    /**
     * Draws the object's collision rectangle using its offset.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    drawOffsetRectangle(ctx) {
        const left = this.offset.left || 0;
        const top = this.offset.top || 0;
        const right = this.offset.right || 0;
        const bottom = this.offset.bottom || 0;
        const x = this.x + left;
        const y = this.y + top;
        const w = this.width - left - right;
        const h = this.height - top - bottom;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.rect(x, y, w, h);
        ctx.stroke();
        ctx.restore();
    }

    /**
     * Starts moving the object to the right.
     */
    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }

    /**
     * Starts moving the object to the left if not dead.
     */
    moveLeft() {
        setInterval(() => {
            if (!this.isDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
    }

    /**
     * Starts moving the object upward.
     */
    moveUp() {
        setInterval(() => {
            this.y -= this.speed;
        }, 1000 / 60);
    }

    /**
     * Moves the object up and down in a loop for a given distance and speed.
     * @param {number} [distance=300] - The distance to move up and down.
     * @param {number} [speed=this.speed] - The speed of movement.
     */
    moveUpAndDown(distance = 300, speed = this.speed) {
        const startY = this.y;
        let goingUp = true;
        let moved = 0;
        const interval = setInterval(() => {
            if (goingUp) this._moveUpStep(speed, distance, () => goingUp = false, () => moved += speed, moved);
            else this._moveDownStep(speed, () => goingUp = true, () => moved -= speed, moved, () => {
                clearInterval(interval);
                this.y = startY;
                this.moveUpAndDown();
            });
        }, 1000 / 60);
    }

    /**
     * Handles a single upward movement step for moveUpAndDown.
     * @private
     * @param {number} speed - The speed of movement.
     * @param {number} distance - The distance to move up.
     * @param {Function} onSwitch - Callback when switching direction.
     * @param {Function} onMove - Callback after moving.
     * @param {number} moved - The amount moved so far.
     */
    _moveUpStep(speed, distance, onSwitch, onMove, moved) {
        this.y -= speed;
        onMove();
        if (moved >= distance) onSwitch();
    }

    /**
     * Handles a single downward movement step for moveUpAndDown.
     * @private
     * @param {number} speed - The speed of movement.
     * @param {Function} onSwitch - Callback when switching direction.
     * @param {Function} onMove - Callback after moving.
     * @param {number} moved - The amount moved so far.
     * @param {Function} onEnd - Callback when movement ends.
     */
    _moveDownStep(speed, onSwitch, onMove, moved, onEnd) {
        this.y += speed;
        onMove();
        if (moved <= 0) onEnd();
    }
}