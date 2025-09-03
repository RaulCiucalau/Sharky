let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = true;

function init() {
    canvas = document.getElementById('canvas');
    // Only create World instance, but do not start game loop
    world = new World(canvas, keyboard);
    world.paused = true;
}

function startGame() {
    if (world) {
        world.paused = false;
    }
    gamePaused = false;
}

function restartGameState() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    world.paused = false;
    gamePaused = false;
}

window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "W") {
        keyboard.up = true;
    }
    if (e.key === "s" || e.key === "S") {
        keyboard.down = true;
    }
    if (e.key === "a" || e.key === "A") {
        keyboard.left = true;
    }
    if (e.key === "d" || e.key === "D") {
        keyboard.right = true;
    }
    if (e.code == "ArrowRight") {
        keyboard.right = true;
    }
    if (e.code == "ArrowLeft") {
        keyboard.left = true;
    }
    if (e.code == "ArrowUp") {
        keyboard.up = true;
    }
    if (e.code == "ArrowDown") {
        keyboard.down = true;
    }
    if (e.code == "Space") {
        keyboard.space = true;
    }
    if (e.key === "e" || e.key === "E") {
        keyboard.E = true;
    }
    if (e.key === "q" || e.key === "Q") {
        keyboard.Q = true;
    }
})

window.addEventListener("keyup", (e) => {
    if (e.key === "w" || e.key === "W") {
        keyboard.up = false;
    }
    if (e.key === "s" || e.key === "S") {
        keyboard.down = false;
    }
    if (e.key === "a" || e.key === "A") {
        keyboard.left = false;
    }
    if (e.key === "d" || e.key === "D") {
        keyboard.right = false;
    }
    if (e.code == "ArrowRight") {
        keyboard.right = false;
    }
    if (e.code == "ArrowLeft") {
        keyboard.left = false;
    }
    if (e.code == "ArrowUp") {
        keyboard.up = false;
    }
    if (e.code == "ArrowDown") {
        keyboard.down = false;
    }
    if (e.code == "Space") {
        keyboard.space = false;
    }
    if (e.key === "e" || e.key === "E") {
        keyboard.E = false;
    }
    if (e.key === "q" || e.key === "Q") {
        keyboard.Q = false;
    }
})