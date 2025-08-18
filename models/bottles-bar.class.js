class BottlesBar extends DrawableObject {
    bottlesCollected = 0;
    IMAGES_BOTTLES = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
    ];
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.width = 220;
        this.height = 60;
        this.x = 240;
        this.y = 0;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        percentage = Math.max(0, Math.min(percentage, 100));
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex(percentage)];
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

    collectBottle() {
        this.bottlesCollected++;
        this.setPercentage(this.bottlesCollected * 20);
    }
}
