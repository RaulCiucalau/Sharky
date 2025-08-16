class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    this.character.energy -= 10;
                    console.log("colliding", this.character.energy);
                }
            });
        }, 1000);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.poison);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    addObjectToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(obj) {
        if (obj.isFacingLeft) {
            obj.drawFlipped(this.ctx);
        } else if (obj.rotation && obj.rotation !== 0) {
            obj.drawRotated(this.ctx);
        } else {
            obj.draw(this.ctx);
        }
        const drawRectTypes = [
            'Character', 'PufferFish', 'JellyFish', 'FinalEnemy', 'Coin', 'Poison'
        ];
        if (
            typeof obj.drawRedRectangle === 'function' &&
            drawRectTypes.includes(obj.constructor.name)
        ) {
            obj.drawRedRectangle(this.ctx);
            obj.drawOffsetRectangleBlue(this.ctx);
        }
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.x + object.width, object.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(object.img, 0, 0, object.width, object.height);
        this.ctx.restore();
    }
}