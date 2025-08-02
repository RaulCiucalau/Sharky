class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new JellyFish(),

    ]
    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0, 480, 720),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0, 400, 720),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 400, 720),
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 20, 450, 700),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0, 400, 720),
    ]
    canvas
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);
        requestAnimationFrame(() => this.draw());
    }

    addObjectToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }
    
    addToMap(MovableObject) {
        if (MovableObject.otherDirection) {
            this.flipImage(MovableObject);
        } else {
            this.ctx.drawImage(MovableObject.img, MovableObject.x, MovableObject.y, MovableObject.width, MovableObject.height);
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