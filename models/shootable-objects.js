class ShootableObjects extends MovableObject {
    img_bubble = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    img_poisoned_bubble = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';

    constructor(isPoisoned = false) {
        super();
        if (isPoisoned) {
            this.loadImage(this.img_poisoned_bubble);
        } else {
            this.loadImage(this.img_bubble);
        }
        this.width = 50;
        this.height = 50;
    }

    moveRight() {
        setInterval(() => {
            this.x += 8;
        }, 1000 / 60);
    }
}