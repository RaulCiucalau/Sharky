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
        buttonsContainer.remove();
        gameTitle.remove();
        characterImg.remove();
    }
}

