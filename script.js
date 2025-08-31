document.getElementById('impressumBtn').addEventListener('click', () => {
    window.location.href = './impressum.html';
});

function startPlay() {
    let mainMenuImg = document.getElementById('gameMenu');
    let buttonsContainer = document.querySelector('.buttons-container');
    let gameTitle = document.querySelector('.game-title');

    if (mainMenuImg) {
        mainMenuImg.classList.add('overlay-fade-out');
        buttonsContainer.remove();
        gameTitle.remove();
    }
}

