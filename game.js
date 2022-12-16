// Canvas DOM variables
const canvas = document.querySelector('#game');
const gameContext = canvas.getContext('2d');

// Button DOM variables
const buttonUp = document.querySelector('#up');
const buttonLeft = document.querySelector('#left');
const buttonRight = document.querySelector('#right');
const buttonDown = document.querySelector('#down');

// View variables
let canvasSize;
let elementSize;

// Game variables
let map2DArray;
let playerPosition;

function loadMap(level) {

    // Set current map to display
    currentMap = maps[level];

    // Parse the config String
    return currentMap.split("\n")

    // Clean unwanted whitespaces
    .map(element => element.trim())

    // Remove unused elements
    .filter(element => !!element.length)

    // Get each item
    .map(row => row.split(""));
}

function loadPlayer() {

    // Find where is the player
    let rowContainsPlayer = map2DArray.map(row => row.indexOf('O'));

    return {
        posX: rowContainsPlayer.find(indexOf => indexOf != -1),
        posY: rowContainsPlayer.findIndex(indexOf => indexOf != -1),
    };
}

function renderCanvas() {

    // Make it responsive
    canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.75;
    elementSize = canvasSize / 10;   
    
    // Set a square
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    // Set styles
    gameContext.font = elementSize + 'px Verdana';
    gameContext.textAlign = 'end';

    // Make a 10x10 grid
    map2DArray.forEach((row, y) => row.forEach((item, x) => {

        // Current item
        let emoji = emojis[item];
        let posX = elementSize * (x + 1);
        let posY = elementSize * (y + 1);

        // Fill map
        gameContext.fillText(emoji, posX, posY);
    }));

    // Set player
    movePlayer();
}

function startGame() {

    map2DArray = loadMap(2);
    playerPosition = loadPlayer();
    renderCanvas();

}

function movePlayer() {
    // Set variables
    let emoji = emojis['PLAYER'];
    let posX = elementSize * (playerPosition.posX + 1);
    let posY = elementSize * (playerPosition.posY + 1);

    // Render on Canvas
    gameContext.fillText(emoji, posX, posY);
}

function moveUp() {
    playerPosition.posY -= 1;
    renderCanvas()
}

function moveLeft() {
    playerPosition.posX -= 1;
    renderCanvas()
}

function moveRight() {
    playerPosition.posX += 1;
    renderCanvas()
}

function moveDown() {
    playerPosition.posY += 1;
    renderCanvas()
}

function moveByKeys(event) {

    // Control keyboard movement
    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }

    //renderCanvas()
}

// General event listeners
window.addEventListener('load', startGame);
window.addEventListener('resize', renderCanvas);
window.addEventListener('keydown', moveByKeys);

// Keydown event listeners
buttonUp.addEventListener('click', moveUp);
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
buttonDown.addEventListener('click', moveDown);