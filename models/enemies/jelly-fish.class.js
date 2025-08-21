class JellyFish extends MovableObject {
    isDead = false;
    y = 300;
    height = 96;
    width = 96;
    imgs_regular_damage = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
    imgs_dead = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];
    offset = {
        left: 80,
        right: 80,
        top: 80,
        bottom: 80
    };
    speed = 0.6 + Math.random() * 0.5;

    constructor(i) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.imgs_regular_damage);
        this.loadImages(this.imgs_dead);
        this.speed = 1 + Math.random() * 0.5;
        this.y = 300 + Math.random() * 100;
        this.x = 300 + i * 300 + Math.random() * 200;
        this.animate();
    }

    animate() {
        this.moveUpAndDown();
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.imgs_dead);
            } else {
                let i = this.currentImage % this.imgs_regular_damage.length;
                let path = this.imgs_regular_damage[i];
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
    }, this.imgs_dead.length * 240);
}
}