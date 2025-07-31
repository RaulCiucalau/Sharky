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

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectToMap(this.backgroundObjects);

        this.addToMap(this.character);

        this.addObjectToMap(this.enemies);

        requestAnimationFrame(() => this.draw());
    }

    addObjectToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }
    addToMap(MovableObject) {
        this.ctx.drawImage(MovableObject.img, MovableObject.x, MovableObject.y, MovableObject.width, MovableObject.height);
    }
}