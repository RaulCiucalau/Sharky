let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = true;

/**
 * Initializes the game, sets up canvas, orientation, joystick, and controls.
 */
function init() {
    canvas = document.getElementById('canvas');
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('load', checkOrientation);
}

/**
 * Starts the game by unpausing the world and game state.
 */
function startGame() {
    if (world) {
        world.paused = false;
    }
    gamePaused = false;
    setupJoystickEvents();
    setupBubbleBtnEvents();
    setupPoisonBtnEvents();
    setupKeyboardGlobal();
}

/**
 * Restarts the game state, resets world, character energy, and UI.
 */
function restartGameState() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new WorldCore(canvas, keyboard);
    if (world.character) {
        world.character.energy = 100;
    }
    const gameOverDialog = document.querySelector('.game-over-dialog');
    if (gameOverDialog) {
        gameOverDialog.classList.add('dp-none');
    }
    world.paused = false;
    gamePaused = false;
}

/**
 * Handles keydown events to update keyboard control states.
 * @param {KeyboardEvent} e
 */
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

/**
 * Handles keyup events to reset keyboard control states.
 * @param {KeyboardEvent} e
 */
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