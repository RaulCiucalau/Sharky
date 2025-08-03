class Level {
    enemies;
    backgroundObjects;
    level_end_x = 2150;
    level_end_start_x = -720;

    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}