/**
 * Represents the main game world, managing all game objects, collisions, and rendering.
 */
class World {
    character = new Character();
    level = World.createLevel();
    static createLevel() {
        return new Level(
            [
                new PufferFish(0), new PufferFish(1), new PufferFish(2), new PufferFish(3), new PufferFish(4), new PufferFish(5), new PufferFish(6),
                new JellyFish(0), new JellyFish(1), new JellyFish(2), new JellyFish(3), new JellyFish(4)
            ],
            [new FinalEnemy()],
            [
                new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/2.png', -720, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0, 400, 720),
                new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720, 400, 720),
                new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 2, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 720 * 2, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 2, 400, 720),
                new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 3, 480, 720),
                new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3, 400, 720),
                new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3, 400, 720),
                new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720 * 3, 450, 700),
                new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 3, 400, 720)
            ],
            [
                new Coin(300, 300), new Coin(400, 300), new Coin(500, 300),
                new Coin(1100, 180), new Coin(1200, 180),
                new Coin(1800, 320), new Coin(1900, 320), new Coin(2000, 320),
                new Coin(2200, 200), new Coin(2300, 200)
            ],
            [
                new Bottles(150, 120), new Bottles(600, 300), new Bottles(900, 200),
                new Bottles(1200, 350), new Bottles(1500, 10), new Bottles(1700, 100)
            ]
        );
    }
}