class MovableObject extends DrawableObject {
    speed = 0.4;
    isFacingLeft = false;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    lastHit = 0;

    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width + mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height + mo.offset.bottom
        );
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(imageArray) {
        let i = this.currentImage % imageArray.length;
        let path = imageArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

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

    drawFlipped(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    drawRotated(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    drawOffsetRectangleBlue(ctx) {
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
        ctx.strokeStyle = 'blue';
        ctx.rect(x, y, w, h);
        ctx.stroke();
        ctx.restore();
    }

    drawRedRectangle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.restore();
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    moveUp() {
        setInterval(() => {
            this.y -= this.speed;
        }, 1000 / 60);
    }
}