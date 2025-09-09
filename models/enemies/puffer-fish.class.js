/**
 * Represents a puffer fish enemy in the game.
 * Handles movement, animation, and death/removal logic.
 * @extends MovableObject
 */
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

    /**
     * Creates a new PufferFish instance.
     * @param {number} i - Index used to determine initial position.
     */
    constructor(i) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.imgs_fish_swim);
        this.loadImages(this.imgs_dead);
        this.speed = 0.4 + Math.random() * 0.25;
        this.y = 100 + i * 20 + Math.random() * 40;
        this.x = 700 + i * 300 + Math.random() * 200;
        this.animate();
        this.offset = {
            left: 20,
            right: 20,
            top: 20,
            bottom: 35
        };
    }

    /**
     * Starts the movement and animation loop for the puffer fish.
     */
    animate() {
        this.moveLeft();
        this.startRandomVerticalMovement();
        this.startSwimOrDeadAnimation();
    }

    /**
     * Handles random vertical movement for the puffer fish.
     */
    startRandomVerticalMovement() {
        setInterval(() => {
            if (Math.random() < 0.05) this.y += (Math.random() - 0.5) * 4;
        }, 1000 / 60);
    }

    /**
     * Handles the swim animation or dead animation.
     */
    startSwimOrDeadAnimation() {
        setInterval(() => {
            if (this.isDead) this.playDeadAnimation();
            else this.playSwimAnimation();
        }, 240);
    }

    /**
     * Plays the dead animation and moves the puffer fish up.
     */
    playDeadAnimation() {
        this.playAnimation(this.imgs_dead);
        this.moveUp();
    }

    /**
     * Plays the swim animation for the puffer fish.
     */
    playSwimAnimation() {
        let i = this.currentImage % this.imgs_fish_swim.length;
        let path = this.imgs_fish_swim[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Marks the puffer fish as dead and removes it from the given enemies array after the death animation.
     * @param {Array} enemiesArray - The array of enemies to remove this puffer fish from.
     */
    dieAndRemove(enemiesArray) {
        this.isDead = true;
        setTimeout(() => {
            const idx = enemiesArray.indexOf(this);
            if (idx > -1) enemiesArray.splice(idx, 1);
        }, this.imgs_dead.length * 340);
    }
}