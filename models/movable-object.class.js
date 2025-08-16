
class MovableObject {

    x = 120;
    y = 220;
    img;
    height = 150;
    width = 150;
    imageCache = {};
    speed = 0.4;
    currentImage = 0;
    isFacingLeft = false;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width + mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height + mo.offset.bottom
        );
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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
        const offCanvas = document.createElement('canvas');
        offCanvas.width = this.width;
        offCanvas.height = this.height;
        const offCtx = offCanvas.getContext('2d');
        offCtx.drawImage(this.img, 0, 0, this.width, this.height);
        const imageData = offCtx.getImageData(0, 0, this.width, this.height);
        let minX = this.width, minY = this.height, maxX = 0, maxY = 0;
        let found = false;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const idx = (y * this.width + x) * 4;
                if (imageData.data[idx + 3] > 10) {
                    found = true;
                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                }
            }
        }
        if (found) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + minX, this.y + minY, maxX - minX, maxY - minY);
            ctx.stroke();
            ctx.restore();
        }
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