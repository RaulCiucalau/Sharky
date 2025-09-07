window.addEventListener('DOMContentLoaded', () => {
    const inGameMusic = document.getElementById('inGameMusic');
    if (inGameMusic) {
        inGameMusic.volume = 0.3;
    }
});

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

let userInteracted = false;
window.addEventListener('click', () => { userInteracted = true; });
window.addEventListener('keydown', () => { userInteracted = true; });

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

window.addEventListener('DOMContentLoaded', () => {
    soundManager.playMusic();
});

function showControlsTab() {
    document.querySelector('.controls-tab-container').style.display = 'block';
}

function hideControlsTab() {
    document.querySelector('.controls-tab-container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'flex';
    document.querySelector('.game-title').style.display = 'block';
}

document.getElementById('backFromControlsBtn').addEventListener('click', hideControlsTab);
function showImpressumTab() {
    document.querySelector('.impressum-tab-container').style.display = 'block';
}

function hideImpressumTab() {
    document.querySelector('.impressum-tab-container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'flex';
    document.querySelector('.game-title').style.display = 'block';
}

document.getElementById('backFromImpressumBtn').addEventListener('click', hideImpressumTab);
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

function showJoystickIfNeeded() {
    let joystick = document.getElementById('joystick');
    if (window.innerWidth < 720)
        joystick.classList.remove('dp-none-joystick');

}

function openMainMenu() {
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

const joystick = document.getElementById('joystick');
const base = document.getElementById('joystick-base');
const knob = document.getElementById('joystick-knob');
let joystickActive = false;
let startX, startY;

function getDirection(dx, dy) {
    const threshold = 20;
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
    });

    base.addEventListener('touchend', function (e) {
        joystickActive = false;
        knob.style.left = '20px';
        knob.style.top = '20px';
        if (window.keyboard) {
            keyboard.left = false;
            keyboard.right = false;
            keyboard.up = false;
            keyboard.down = false;
        }
    });
}

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

if (typeof keyboard !== 'undefined') {
    window.keyboard = keyboard;
}
