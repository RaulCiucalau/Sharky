class HealthBarEndboss extends DrawableObject {
    IMAGES = [
       'img/4. Marcadores/Purple/health_0.png', // 0%
        'img/4. Marcadores/Purple/health_20.png', // 20%
        'img/4. Marcadores/Purple/health_40.png', // 40%
        'img/4. Marcadores/Purple/health_60.png', // 60%
        'img/4. Marcadores/Purple/health_80.png', // 80%
        'img/4. Marcadores/Purple/health_100.png', // 100%
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 200;
        this.y = 400;
        this.width = 300;
        this.height = 80;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) return 5;
        if (percentage >= 30) return 2;
        if (percentage >= 20) return 3;
        if (percentage >= 10) return 2;
        return 0;
    }
}
