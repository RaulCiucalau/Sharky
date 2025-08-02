let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
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
})

window.addEventListener("keyup", (e) => {
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
})