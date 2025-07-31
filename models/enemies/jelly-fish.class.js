class JellyFish extends MovableObject {


    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');

        this.x = 300 + Math.random() * 500;
        this.y = 300;
        this.height = 100;
        this.width = 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.y -= 0.2
        }, 1000 / 60);
    }
}