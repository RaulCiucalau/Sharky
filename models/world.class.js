class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottlesBar = new StatusBar();
    coinsBar = new StatusBar();

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
                    this.character.hit();
                    console.log("colliding", this.character.energy);
                }
            });
        }, 500);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.poison);
        this.addToMap(this.character);
        this.ctx.restore();
        this.statusBar.x = 20;
        this.statusBar.y = 0;
        this.statusBar.draw(this.ctx);
        this.bottlesBar.x = 240;
        this.bottlesBar.y = 0;
        let bottlePercent = this.character.bottlePercentage !== undefined ? this.character.bottlePercentage : 0;
        let bottlePath = this.bottlesBar.IMAGES_BOTTLES[this.bottlesBar.resolveImageIndex(bottlePercent)];
        this.bottlesBar.img = this.bottlesBar.imageCache[bottlePath];
        this.bottlesBar.draw(this.ctx);
        this.coinsBar.x = 470;
        this.coinsBar.y = 0;
        let coinPercent = this.character.coinPercentage !== undefined ? this.character.coinPercentage : 0;
        let coinPath = this.coinsBar.IMAGES_COINS[this.coinsBar.resolveImageIndex(coinPercent)];
        this.coinsBar.img = this.coinsBar.imageCache[coinPath];
        this.coinsBar.draw(this.ctx);
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