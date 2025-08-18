class CoinsBar extends DrawableObject {
    IMAGES_COINS = [
        'img/4. Marcadores/green/Coin/0_copia 4.png',
        'img/4. Marcadores/green/Coin/20_copia 2.png',
        'img/4. Marcadores/green/Coin/40_copia 4.png',
        'img/4. Marcadores/green/Coin/60_copia 4.png',
        'img/4. Marcadores/green/Coin/80_copia 4.png',
        'img/4. Marcadores/green/Coin/100_copia 4.png',
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.width = 220;
        this.height = 60;
        this.x = 470;
        this.y = 0;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex(percentage)];
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