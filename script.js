/**
 * The joystick DOM element for mobile controls.
 * @type {HTMLElement}
 */
const joystick = document.getElementById('joystick');
/**
 * The joystick base DOM element.
 * @type {HTMLElement}
 */
const base = document.getElementById('joystick-base');
/**
 * The joystick knob DOM element.
 * @type {HTMLElement}
 */
const knob = document.getElementById('joystick-knob');
/**
 * Whether the joystick is currently active.
 * @type {boolean}
 */
let joystickActive = false;
/**
 * Starting X and Y positions for joystick movement.
 * @type {number}
 */
let startX, startY;
/**
 * Tracks if the user has interacted with the page (for sound).
 * @type {boolean}
 */
let userInteracted = false;
/**
 * The bubble button DOM element for mobile controls.
 * @type {HTMLElement}
 */
const bubbleBtn = document.getElementById('bubbleBtn');
/**
 * The poison button DOM element for mobile controls.
 * @type {HTMLElement}
 */
const poisonBtn = document.getElementById('poisonBtn');

/**
 * Manages main menu music playback and state.
 */
const soundManager = {
    /**
     * The music DOM element.
     * @type {HTMLAudioElement|null}
     */
    music: null,
    /**
     * Checks if the music is currently playing.
     * @returns {boolean}
     */
    isMusicPlaying() {
        if (!this.music) this.music = document.getElementById('mainMenuMusic');
        return this.music && !this.music.paused && !this.music.ended && this.music.currentTime > 0;
    },
    /**
     * Plays the main menu music from the start if not already playing.
     */
    playMusic() {
        if (!this.music) this.music = document.getElementById('mainMenuMusic');
        if (this.music && !this.isMusicPlaying()) {
            this.music.currentTime = 0;
            this.music.play().catch(() => { });
        }
    },
    /**
     * Pauses the main menu music if it is playing.
     */
    pauseMusic() {
        if (!this.music) this.music = document.getElementById('mainMenuMusic');
        if (this.music && !this.music.paused) {
            this.music.pause();
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const inGameMusic = document.getElementById('inGameMusic');
    if (inGameMusic) {
        inGameMusic.volume = 0.3;
    }
});


window.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('mainMenuVolume');
    const audioIds = [
        'mainMenuMusic',
        'inGameMusic',
        'coinCollectSound',
        'collectBottleSound',
        'hurtSound',
        'finalEnemySplash'
    ];
    const audios = audioIds.map(id => document.getElementById(id)).filter(Boolean);
    if (slider && audios.length) {
        slider.value = audios[0].volume;
        slider.addEventListener('input', (e) => {
            audios.forEach(audio => {
                audio.volume = e.target.value;
            });
        });
    }
});

window.addEventListener('click', () => { userInteracted = true; });
window.addEventListener('keydown', () => { userInteracted = true; });

window.addEventListener('DOMContentLoaded', () => {
    soundManager.playMusic();
});


/**
 * Shows the controls tab in the UI.
 */
function showControlsTab() {
    document.querySelector('.controls-tab-container').style.display = 'block';
}


/**
 * Hides the controls tab and shows main menu buttons and title.
 */
function hideControlsTab() {
    document.querySelector('.controls-tab-container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'flex';
    document.querySelector('.game-title').style.display = 'block';
}

document.getElementById('backFromControlsBtn').addEventListener('click', hideControlsTab);
/**
 * Shows the impressum tab in the UI.
 */
function showImpressumTab() {
    document.querySelector('.impressum-tab-container').style.display = 'block';
}

/**
 * Hides the impressum tab and shows main menu buttons and title.
 */
function hideImpressumTab() {
    document.querySelector('.impressum-tab-container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'flex';
    document.querySelector('.game-title').style.display = 'block';
}

document.getElementById('backFromImpressumBtn').addEventListener('click', hideImpressumTab);
document.getElementById('impressumBtn').addEventListener('click', showImpressumTab);

/**
 * Starts the game, hides the main menu, and shows the joystick if needed.
 */
function startPlay() {
    soundManager.pauseMusic();
    document.getElementById('inGameMusic').play();
    hideMainMenuUI();
    startGame();
    restartGameState();
    showJoystickIfNeeded();
}

/**
 * Hides the main menu UI elements.
 */
function hideMainMenuUI() {
    let mainMenuImg = document.getElementById('gameMenu');
    let buttonsContainer = document.querySelector('.buttons-container');
    let gameTitle = document.querySelector('.game-title');
    let volumeSlider = document.getElementById('volumeSlider');
    if (mainMenuImg) {
        mainMenuImg.classList.add('overlay-fade-out');
        buttonsContainer.style.display = 'none';
        gameTitle.style.display = 'none';
        volumeSlider.style.display = 'none';
    }
}

/**
 * Restarts the game and hides the game over dialog.
 */
function restartGame() {
    let gameOverDialog = document.getElementById('gameOverDialog');
    gameOverDialog.classList.add('dp-none');
    userInteracted = false;
    restartGameState();
}

/** Restarts the game and hides the game win dialog.
 */
function playAgain() {
    let gameWinDialog = document.getElementById('gameWinDialog');
    gameWinDialog.classList.add('dp-none-win');
    userInteracted = false;
    restartGameState();
}

/**
 * Shows the joystick for mobile/touch devices and hides it for desktop/large screens.
 */
function showJoystickIfNeeded() {
    const joystick = document.getElementById('joystick');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && window.innerWidth < 1024) {
        joystick.classList.remove('dp-none-joystick');
    } else {
        joystick.classList.add('dp-none-joystick');
    }
}

/**
 * Opens the main menu and resets music and world state.
 */
function openMainMenu() {
    showMainMenuUI();
    resetInGameMusic();
    playMenuMusicIfNeeded();
    pauseWorldIfExists();
}

/**
 * Shows the main menu UI elements.
 */
function showMainMenuUI() {
    document.getElementById('mainMenuContainer').style.display = 'flex';
    document.querySelector('.game-over-dialog').classList.add('dp-none');
    document.getElementById('gameWinDialog').classList.add('dp-none-win');
    document.getElementById('gameMenu').classList.remove('overlay-fade-out');
    document.querySelector('.buttons-container').style.display = "flex";
    document.querySelector('.game-title').style.display = "block";
    document.getElementById('controlsBtn').style.display = "block";
    document.getElementById('impressumBtn').style.display = "block";
    document.getElementById('volumeSlider').style.display = "block";
    document.getElementById('joystick').classList.add('dp-none-joystick');
}

/**
 * Resets the in-game music to the beginning and pauses it.
 */
function resetInGameMusic() {
    const inGameMusic = document.getElementById('inGameMusic');
    if (inGameMusic) {
        inGameMusic.pause();
        inGameMusic.currentTime = 0;
        inGameMusic.src = inGameMusic.src;
    }
}

/**
 * Plays the menu music if it is not already playing.
 */
function playMenuMusicIfNeeded() {
    if (!soundManager.isMusicPlaying()) {
        soundManager.playMusic();
    }
}

/**
 * Pauses the world if it exists.
 */
function pauseWorldIfExists() {
    if (typeof world !== 'undefined') {
        world.paused = true;
    }
}

/**
 * Checks the device orientation and shows/hides the landscape mode warning.
 */
function checkOrientation() {
    let landscapeMode = document.getElementById('landscapeMode');
    if (window.innerWidth < 720 && window.innerHeight > window.innerWidth) {
        landscapeMode.classList.remove('d-none');
    } else {
        landscapeMode.classList.add('d-none');
    }
}

/**
 * Returns the direction object based on joystick movement deltas.
 * @param {number} dx - The change in x position.
 * @param {number} dy - The change in y position.
 * @returns {{left: boolean, right: boolean, up: boolean, down: boolean}}
 */
function getDirection(dx, dy) {
    const threshold = 20;
    let dir = { left: false, right: false, up: false, down: false };
    if (dx < -threshold) dir.left = true;
    if (dx > threshold) dir.right = true;
    if (dy < -threshold) dir.up = true;
    if (dy > threshold) dir.down = true;
    return dir;
}


/**
 * Sets up joystick event listeners for touch controls.
 */
function setupJoystickEvents() {
    if (joystick && base && knob) {
        base.addEventListener('touchstart', handleJoystickTouchStart);
        base.addEventListener('touchmove', handleJoystickTouchMove);
        base.addEventListener('touchend', handleJoystickTouchEnd);
    }
}

/**
 * Handles the start of a joystick touch event.
 * @param {TouchEvent} e
 */
function handleJoystickTouchStart(e) {
    joystickActive = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
}

/**
 * Handles joystick movement during a touch event.
 * @param {TouchEvent} e
 */
function handleJoystickTouchMove(e) {
    if (!joystickActive) return;
    const touch = e.touches[0];
    let dx = touch.clientX - startX;
    let dy = touch.clientY - startY;
    const maxDist = 30;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxDist) {
        dx = dx * maxDist / dist;
        dy = dy * maxDist / dist;
    }
    knob.style.left = (20 + dx) + 'px';
    knob.style.top = (20 + dy) + 'px';

    if (window.keyboard) {
        const dir = getDirection(dx, dy);
        keyboard.left = dir.left;
        keyboard.right = dir.right;
        keyboard.up = dir.up;
        keyboard.down = dir.down;
    }
    e.preventDefault();
}

/**
 * Handles the end of a joystick touch event.
 * @param {TouchEvent} e
 */
function handleJoystickTouchEnd(e) {
    joystickActive = false;
    knob.style.left = '20px';
    knob.style.top = '20px';
    if (window.keyboard) {
        keyboard.left = false;
        keyboard.right = false;
        keyboard.up = false;
        keyboard.down = false;
    }
}


/**
 * Sets up event listeners for the bubble button on mobile.
 */
function setupBubbleBtnEvents() {
    if (bubbleBtn) {
        bubbleBtn.addEventListener('touchstart', function(e) {
            if (window.keyboard) keyboard.E = true;
            e.preventDefault();
        });
        bubbleBtn.addEventListener('touchend', function(e) {
            if (window.keyboard) keyboard.E = false;
            e.preventDefault();
        });
    }
}

/**
 * Sets up event listeners for the poison button on mobile.
 */
function setupPoisonBtnEvents() {
    if (poisonBtn) {
        poisonBtn.addEventListener('touchstart', function(e) {
            if (window.keyboard) keyboard.Q = true;
            e.preventDefault();
        });
        poisonBtn.addEventListener('touchend', function(e) {
            if (window.keyboard) keyboard.Q = false;
            e.preventDefault();
        });
    }
}


/**
 * Sets up the global keyboard object if it exists.
 */
function setupKeyboardGlobal() {
    if (typeof keyboard !== 'undefined') {
        window.keyboard = keyboard;
    }
}

window.addEventListener('DOMContentLoaded', init);
