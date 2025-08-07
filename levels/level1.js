const level1 = new Level(
    [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new FinalEnemy()
    ],

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
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 3, 400, 720),
    ],

    [
        new Coin(300, 300),
        new Coin(400, 300),
        new Coin(500, 300),

        new Coin(1100, 180),
        new Coin(1200, 180),

        new Coin(1800, 320),
        new Coin(1900, 320),
        new Coin(2000, 320),

        new Coin(2200, 200),
        new Coin(2300, 200)
    ]
);