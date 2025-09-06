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
            this.music.play().catch(() => {});
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
    if (mainMenuImg) {
        mainMenuImg.classList.add('overlay-fade-out');
        buttonsContainer.style.display = 'none';
        gameTitle.style.display = 'none';
    }
    startGame();
    restartGameState();
}

function restartGame() {
    let gameOverDialog = document.getElementById('gameOverDialog');
    gameOverDialog.classList.add('dp-none');
    userInteracted = false;
    restartGameState();
}

function openMainMenu() {
    document.getElementById('mainMenuContainer').style.display = 'block';
    // Hide game-over dialog
    document.querySelector('.game-over-dialog').classList.add('dp-none');
    document.getElementById('gameWinDialog').classList.add('dp-none-win');
    // Show main menu UI elements
    document.getElementById('gameMenu').classList.remove('overlay-fade-out');
    document.querySelector('.buttons-container').style.display = "flex";
    document.querySelector('.game-title').style.display = "block";
    document.getElementById('characterImg').style.display = "block";
    document.getElementById('controlsBtn').style.display = "block";
    document.getElementById('impressumBtn').style.display = "block";

    // Play main menu music, pause in-game music
    const inGameMusic = document.getElementById('inGameMusic');
    if (inGameMusic) {
        inGameMusic.pause();
        inGameMusic.currentTime = 0;
        inGameMusic.src = inGameMusic.src; // Force reload if needed
    }
    if (!soundManager.isMusicPlaying()) {
        soundManager.playMusic();
    }
    if (typeof restartGameState === 'function') {
        restartGameState();
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
