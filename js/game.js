let canvas;
let ctx;
let character = new Character();
let enemies = [
    new PufferFish(),
    new JellyFish()
]

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    console.log('My charcater is', character);
    
}