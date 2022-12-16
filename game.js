// Canvas DOM constants
const canvas = document.querySelector('#game');
const gameContext = canvas.getContext('2d');

// Button DOM constants
const buttonUp = document.querySelector('#up');
const buttonLeft = document.querySelector('#left');
const buttonRight = document.querySelector('#right');
const buttonDown = document.querySelector('#down');

// Game Constants
const TOTAL_LEVELS = maps.length;
const TOTAL_LIVES = 3;

// View variables
let canvasSize;
let elementSize;

// Game variables
let map2DArray;
let playerPosition;
let numberOfLives;
let levelNumber;

function loadMap() {

    // Set current map to display
    currentMap = maps[levelNumber];

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

function renderElement(element, {posX, posY}) {

    // Set variables
    let emoji = emojis[element];
    let canvasPosX = elementSize * (posX + 1);
    let canvasPosY = elementSize * (posY + 1);

    // Render on Canvas
    gameContext.fillText(emoji, canvasPosX, canvasPosY);
}

function renderCanvas() {

    // Make it responsive
    canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.7;
    elementSize = canvasSize / 10;   
    
    // Set a square
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    // Set styles
    gameContext.font = elementSize + 'px Verdana';
    gameContext.textAlign = 'end';

    // Make a 10x10 grid
    map2DArray.forEach((row, posY) => row.forEach((element, posX) => {
        renderElement(element, {posX, posY});
    }));

    // Set player
    renderElement('PLAYER', playerPosition);
}

function startLevel() {
    map2DArray = loadMap();
    playerPosition = loadPlayer();
    renderCanvas();
}

function startGame() {
    levelNumber = 0;
    numberOfLives = 3;
    startLevel();
}

function changePosition(direction) {

    switch(direction) {
    
        case 'ArrowUp':
            playerPosition.posY = Math.max(playerPosition.posY - 1, 0);
            break;
    
        case 'ArrowLeft':
            playerPosition.posX = Math.max(playerPosition.posX - 1, 0);
            break;
    
        case 'ArrowRight':
            playerPosition.posX = Math.min(playerPosition.posX + 1, 9);
            break;
    
        case 'ArrowDown':
            playerPosition.posY = Math.min(playerPosition.posY + 1, 9);
            break;
    }
}

function handleWinCollision() {

    // Move to next level
    levelNumber += 1;

    // Check if game is not finished yet
    if(levelNumber < TOTAL_LEVELS) startLevel();

    else console.log("You WIN!");

}

function handleLoseCollision() {

    // Lose one life
    numberOfLives -= 1;
    console.log(numberOfLives);

    // Restart level
    if(numberOfLives > 0) startLevel();
    else startGame();
}

function checkCollision() {

    // Get which element I'm located at
    const currentPositionElement = map2DArray[playerPosition.posY][playerPosition.posX];

    switch(currentPositionElement) {

        // Collision with WIN element
        case 'I':
            handleWinCollision();
            break;

        // Collision with LOSE element
        case 'X':
            handleLoseCollision();
            break;
    }
}

function movePlayer(event) {

    // Control movement
    changePosition(event.key);

    // Collisions
    checkCollision();

    // Update Canvas
    renderCanvas();
}

// General event listeners
window.addEventListener('load', startGame);
window.addEventListener('resize', renderCanvas);
window.addEventListener('keydown', movePlayer);

// Keydown event listeners
buttonUp.addEventListener('click', movePlayer.bind(null, {key: 'ArrowUp'}));
buttonLeft.addEventListener('click', movePlayer.bind(null, {key: 'ArrowLeft'}));
buttonRight.addEventListener('click', movePlayer.bind(null, {key: 'ArrowRight'}));
buttonDown.addEventListener('click', movePlayer.bind(null, {key: 'ArrowDown'}));