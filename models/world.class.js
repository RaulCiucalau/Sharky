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
        if (MovableObject.rotation && MovableObject.rotation !== 0) {
            this.ctx.save();
            this.ctx.translate(MovableObject.x + MovableObject.width / 2, MovableObject.y + MovableObject.height / 2);
            this.ctx.rotate((MovableObject.rotation * Math.PI) / 180);
            this.ctx.drawImage(MovableObject.img, -MovableObject.width / 2, -MovableObject.height / 2, MovableObject.width, MovableObject.height);
            this.ctx.restore();
        } else if (MovableObject.isFacingLeft) {
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