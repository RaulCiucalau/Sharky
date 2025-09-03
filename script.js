// Track if user has interacted with the document
let userInteracted = false;
window.addEventListener('click', () => { userInteracted = true; });
window.addEventListener('keydown', () => { userInteracted = true; });
document.body.addEventListener('click', () => {
    const music = document.getElementById('mainMenuMusic');
    music.currentTime = 0;
    music.play();
}, { once: true });

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
    document.getElementById('mainMenuMusic').pause();
    document.getElementById('inGameMusic').play();
    let mainMenuImg = document.getElementById('gameMenu');
    let buttonsContainer = document.querySelector('.buttons-container');
    let gameTitle = document.querySelector('.game-title');
    let characterImg = document.getElementById('characterImg');

    if (mainMenuImg) {
        mainMenuImg.classList.add('overlay-fade-out');
        buttonsContainer.style.display = 'none';
        gameTitle.style.display = 'none';
        characterImg.style.display = 'none';
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
    // Show main menu UI elements
    document.getElementById('gameMenu').classList.remove('overlay-fade-out');
    document.querySelector('.buttons-container').style.display = "flex";
    document.querySelector('.game-title').style.display = "block";
    document.getElementById('characterImg').style.display = "block";
    document.getElementById('controlsBtn').style.display = "block";
    document.getElementById('impressumBtn').style.display = "block";

    // Play main menu music, pause in-game music
    const mainMenuMusic = document.getElementById('mainMenuMusic');
    const inGameMusic = document.getElementById('inGameMusic');
    if (inGameMusic) {
        inGameMusic.pause();
        inGameMusic.currentTime = 0;
        inGameMusic.src = inGameMusic.src; // Force reload if needed
    }
    if (mainMenuMusic) {
        mainMenuMusic.currentTime = 0;
        mainMenuMusic.play();
    }
    if (typeof restartGameState === 'function') {
        restartGameState();
    }
    if (typeof world !== 'undefined') {
        world.paused = true;
    }
    // Ensure main menu music always plays
    if (mainMenuMusic) {
        mainMenuMusic.currentTime = 0;
        try {
            mainMenuMusic.play();
        } catch (e) {
            // Suppress NotAllowedError if user hasn't interacted
        }
    }
}
