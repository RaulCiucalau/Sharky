class Bottles extends MovableObject {
    height = 74;
    width = 66;
    imgs_poison = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png',
    ];
    offset = {
        left: 10,
        right: 10,
        top: 1,
        bottom: 1
    };

    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.imgs_poison);
        if (typeof x === 'number') {
            this.x = x;
        };
        if (typeof y === 'number') {
            this.y = y;
        };
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.imgs_poison.length;
            let path = this.imgs_poison[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 240);
    }
}
