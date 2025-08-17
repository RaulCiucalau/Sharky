class StatusBar extends DrawableObject {
    IMAGES_LIFE = [
        'img/4. Marcadores/green/Life/0_copia.png', // 0%
        'img/4. Marcadores/green/Life/20_copia.png', // 20%
        'img/4. Marcadores/green/Life/40_copia.png', // 40%
        'img/4. Marcadores/green/Life/60_copia.png', // 60%
        'img/4. Marcadores/green/Life/80_copia.png', // 80%
        'img/4. Marcadores/green/Life/100_copia.png', // 100%
    ];
    IMAGES_BOTTLES = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
    ];
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
        this.loadImages(this.IMAGES_LIFE);
        this.loadImages(this.IMAGES_BOTTLES);
        this.loadImages(this.IMAGES_COINS);
        this.width = 220;
        this.height = 60;
        this.x = 0;
        this.y = 30;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFE[this.resolveImageIndex(percentage)];
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

    drawBottleBar(ctx, percentage, x = 0, y = 0) {
        let index = this.resolveImageIndex(percentage);
        let path = this.IMAGES_BOTTLES[0];
        let img = this.imageCache[path];
        ctx.drawImage(img, x, y, this.width, this.height);
    }

    drawCoinBar(ctx, percentage, x = 0, y = 0) {
        let index = this.resolveImageIndex(percentage);
        let path = this.IMAGES_COINS[0];
        let img = this.imageCache[path];
        ctx.drawImage(img, x, y, this.width, this.height);
    }
}