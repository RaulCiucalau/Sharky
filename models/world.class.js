class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new JellyFish(),

    ]
    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 20, 0),

    ]
    light = [
        new Light()
    ];
    fondo = [
        new Fondo2(),
        new Fondo1()
    ]
    water = [
        new Water()
    ];
    floor = [
        new Floor(),
    ];
    canvas
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.water.forEach(water => {
            this.addToMap(water);
        });
        this.fondo.forEach(fondo => {
            this.addToMap(fondo);
        });
        this.floor.forEach(floor => {
            this.addToMap(floor);
        });
        this.addToMap(this.character);
        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });
        this.light.forEach(light => {
            this.addToMap(light);
        });
        
        requestAnimationFrame(() => this.draw());
    }

    addToMap(MovableObject) {
        this.ctx.drawImage(MovableObject.img, MovableObject.x, MovableObject.y, MovableObject.width, MovableObject.height);
    }
}