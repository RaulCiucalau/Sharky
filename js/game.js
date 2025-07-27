let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    character.src = '../img/1.Sharkie/1.IDLE/1.png';
    ctx.drawImage(character, 150, 150, 100, 150);
}