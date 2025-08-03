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
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); 
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
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