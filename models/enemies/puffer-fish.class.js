class PufferFish extends MovableObject {
    isDead = false;
    height = 100;
    width = 100;
    imgs_fish_swim = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png'
    ];
    imgs_dead = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png'
    ];
    offset = {
        left: 90,
        right: 96,
        top: 70,
        bottom: 90
    };

    constructor(i) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.imgs_fish_swim);
        this.loadImages(this.imgs_dead);
        this.speed = 0.4 + Math.random() * 0.25;
        this.y = 100 + i * 20 + Math.random() * 40;
        this.x = 700 + i * 300 + Math.random() * 200;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            if (Math.random() < 0.05) {
                this.y += (Math.random() - 0.5) * 4;
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.imgs_dead);
                this.moveUp();
            } else {
                let i = this.currentImage % this.imgs_fish_swim.length;
                let path = this.imgs_fish_swim[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 240);
    }

    dieAndRemove(enemiesArray) {
        this.isDead = true;
        setTimeout(() => {
            const idx = enemiesArray.indexOf(this);
            if (idx > -1) {
                enemiesArray.splice(idx, 1);
            }
        }, this.imgs_dead.length * 340);
    }
}