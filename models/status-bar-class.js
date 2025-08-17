class StatusBar extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/green/Life/0_copia.png', // 0%
        'img/4. Marcadores/green/Life/20_copia.png', // 20%
        'img/4. Marcadores/green/Life/40_copia.png', // 40%
        'img/4. Marcadores/green/Life/60_copia.png', // 60%
        'img/4. Marcadores/green/Life/80_copia.png', // 80%
        'img/4. Marcadores/green/Life/100_copia.png', // 100%
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 220;
        this.height = 60;
        this.x = 0;
        this.y = 0;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) return 5;
        if (percentage >= 80) return 4;
        if (percentage >= 60) return 3;
        if (percentage >= 40) return 2;
        if (percentage >= 20) return 1;
        return 0;
    }
}