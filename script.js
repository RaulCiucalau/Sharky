// Set in-game music volume to 40% on page load
window.addEventListener('DOMContentLoaded', () => {
    const inGameMusic = document.getElementById('inGameMusic');
    if (inGameMusic) {
        inGameMusic.volume = 0.3;
    }
});
// Volume slider for main menu music
window.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('mainMenuVolume');
    const music = document.getElementById('mainMenuMusic');
    if (slider && music) {
        slider.value = music.volume;
        slider.addEventListener('input', (e) => {
            music.volume = e.target.value;
        });
    }
});
// Track if user has interacted with the document
let userInteracted = false;
window.addEventListener('click', () => { userInteracted = true; });
window.addEventListener('keydown', () => { userInteracted = true; });


// Simple sound manager for menu music
const soundManager = {
    music: null,
    isMusicPlaying() {
        if (!this.music) this.music = document.getElementById('mainMenuMusic');
        return this.music && !this.music.paused && !this.music.ended && this.music.currentTime > 0;
    },
    playMusic() {
        if (!this.music) this.music = document.getElementById('mainMenuMusic');
        if (this.music && !this.isMusicPlaying()) {
            this.music.currentTime = 0;
            this.music.play().catch(() => { });
        }
    },
    pauseMusic() {
        if (!this.music) this.music = document.getElementById('mainMenuMusic');
        if (this.music && !this.music.paused) {
            this.music.pause();
        }
    }
};

// Try to play music on page load (will be blocked by browser unless user interacts)
window.addEventListener('DOMContentLoaded', () => {
    soundManager.playMusic();
});

// Show controls tab and hide main menu
function showControlsTab() {
    document.querySelector('.controls-tab-container').style.display = 'block';
}

// Hide controls tab and show main menu
function hideControlsTab() {
    document.querySelector('.controls-tab-container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'flex';
    document.querySelector('.game-title').style.display = 'block';
}

// Back button event for controls tab
document.getElementById('backFromControlsBtn').addEventListener('click', hideControlsTab);
// Show impressum tab and hide main menu
function showImpressumTab() {
    document.querySelector('.impressum-tab-container').style.display = 'block';
}

// Hide impressum tab and show main menu
function hideImpressumTab() {
    document.querySelector('.impressum-tab-container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'flex';
    document.querySelector('.game-title').style.display = 'block';
}

// Back button event for impressum tab
document.getElementById('backFromImpressumBtn').addEventListener('click', hideImpressumTab);

// Impressum button event
document.getElementById('impressumBtn').addEventListener('click', showImpressumTab);

function startPlay() {
    soundManager.pauseMusic();
    document.getElementById('inGameMusic').play();
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
    startGame();
    restartGameState();
    showJoystickIfNeeded();
}

function restartGame() {
    let gameOverDialog = document.getElementById('gameOverDialog');
    gameOverDialog.classList.add('dp-none');
    userInteracted = false;
    restartGameState();
}

function dontshowJoystickIfNeeded() {
    const joystick = document.getElementById('joystick-base');
    if (joystick) joystick.style.display = 'none';
}

function showJoystickIfNeeded() {
    const joystick = document.getElementById('joystick-base');
    if (joystick) joystick.style.display = 'block';
}

function openMainMenu() {
    document.getElementById('mainMenuContainer').style.display = 'flex';
    // Hide game-over dialog
    document.querySelector('.game-over-dialog').classList.add('dp-none');
    document.getElementById('gameWinDialog').classList.add('dp-none-win');
    // Show main menu UI elements
    document.getElementById('gameMenu').classList.remove('overlay-fade-out');
    document.querySelector('.buttons-container').style.display = "flex";
    document.querySelector('.game-title').style.display = "block";
    document.getElementById('controlsBtn').style.display = "block";
    document.getElementById('impressumBtn').style.display = "block";
    document.getElementById('volumeSlider').style.display = "block";
    dontshowJoystickIfNeeded();

    // Play main menu music, pause in-game music
    const inGameMusic = document.getElementById('inGameMusic');
    if (inGameMusic) {
        inGameMusic.pause();
        inGameMusic.currentTime = 0;
        inGameMusic.src = inGameMusic.src;
    }
    if (!soundManager.isMusicPlaying()) {
        soundManager.playMusic();
    }
    if (typeof world !== 'undefined') {
        world.paused = true;
    }
}

function checkOrientation() {
    let landscapeMode = document.getElementById('landscapeMode');
    if (window.innerWidth < 720 && window.innerHeight > window.innerWidth) {
        landscapeMode.classList.remove('d-none');
    } else {
        landscapeMode.classList.add('d-none');
    }
}

// Joystick logic for touch devices
const joystick = document.getElementById('joystick');
const base = document.getElementById('joystick-base');
const knob = document.getElementById('joystick-knob');
let joystickActive = false;
let startX, startY;

function getDirection(dx, dy) {
    const threshold = 20; // Minimum movement to trigger
    let dir = { left: false, right: false, up: false, down: false };
    if (dx < -threshold) dir.left = true;
    if (dx > threshold) dir.right = true;
    if (dy < -threshold) dir.up = true;
    if (dy > threshold) dir.down = true;
    return dir;
}

if (joystick && base && knob) {
    base.addEventListener('touchstart', function (e) {
        joystickActive = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });

    base.addEventListener('touchmove', function (e) {
        if (!joystickActive) return;
        const touch = e.touches[0];
        let dx = touch.clientX - startX;
        let dy = touch.clientY - startY;
        // Limit knob movement
        const maxDist = 30;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDist) {
            dx = dx * maxDist / dist;
            dy = dy * maxDist / dist;
        }
        knob.style.left = (20 + dx) + 'px';
        knob.style.top = (20 + dy) + 'px';

        // Set movement direction on your keyboard object (lowercase)
        if (window.keyboard) {
            const dir = getDirection(dx, dy);
            keyboard.left = dir.left;
            keyboard.right = dir.right;
            keyboard.up = dir.up;
            keyboard.down = dir.down;
        }
        e.preventDefault();
    });

    base.addEventListener('touchend', function (e) {
        joystickActive = false;
        knob.style.left = '20px';
        knob.style.top = '20px';
        // Reset movement
        if (window.keyboard) {
            keyboard.left = false;
            keyboard.right = false;
            keyboard.up = false;
            keyboard.down = false;
        }
    });
}

// Joystick bubble and poison buttons for touch devices
const bubbleBtn = document.getElementById('bubbleBtn');
const poisonBtn = document.getElementById('poisonBtn');

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

// Make sure the joystick logic uses the same keyboard object as the game
if (typeof keyboard !== 'undefined') {
    window.keyboard = keyboard;
}
