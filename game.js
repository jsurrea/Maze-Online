'use strict'
// Canvas DOM constants
const canvas = document.querySelector('#game');
const gameContext = canvas.getContext('2d');

// Button DOM constants
const buttonsContainer = document.querySelector('.buttons-container');
const buttonUp = document.querySelector('#up');
const buttonLeft = document.querySelector('#left');
const buttonRight = document.querySelector('#right');
const buttonDown = document.querySelector('#down');

// Messages DOM constants
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanBest = document.querySelector('#best');

// Modal DOM constants 
const modalRules = document.querySelector('.modal-rules');
const modalWin = document.querySelector('.modal-win');
const modalLose = document.querySelector('.modal-lose');

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
let timeStart;
let timeInterval;
let impactPositions;

function loadMap() {

    // Set current map to display
    const currentMap = maps[levelNumber];

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

    // Show buttons if mobile
    if(window.innerHeight > window.innerWidth) buttonsContainer.classList.remove('inactive');
    else buttonsContainer.classList.add('inactive');

    // Make it responsive
    const topContainerHeight = 130;
    const buttonsContainerHeight = buttonsContainer.classList.contains('inactive') || 250;
    canvasSize = Math.min(window.innerHeight - topContainerHeight - buttonsContainerHeight, window.innerWidth) * 0.9;
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

    // Render impact
    for(let position of impactPositions) {
        renderElement('IMPACT', position);
    }
}

function renderLives() {
    const hearts = Array(numberOfLives).fill(emojis['HEART']).join("");
    spanLives.textContent = hearts;
}

function renderTime() {
    let time = ((Date.now() - timeStart) / 1000).toFixed(3);
    spanTime.textContent = time;
    document.querySelector('#modal-your-score').textContent = time;
}

function startLevel() {
    map2DArray = loadMap();
    playerPosition = loadPlayer();
    renderCanvas();
}

function startGame() {

    // Modals
    modalRules.classList.add('inactive');
    modalWin.classList.add('inactive');
    modalLose.classList.add('inactive');

    levelNumber = 0;
    numberOfLives = 3;
    impactPositions = [];
    timeStart = Date.now();

    startLevel();

    renderLives();

    timeInterval = setInterval(renderTime, 100);
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
    levelNumber++;

    // Check if game is not finished yet
    if(levelNumber < TOTAL_LEVELS) {
        impactPositions = [];
        startLevel();
    }

    else {
        let newTime = (Date.now() - timeStart) / 1000;
        clearInterval(timeInterval);
        
        let recordTime = localStorage.getItem('best');

        if(!recordTime || recordTime > newTime) {
            localStorage.setItem('best', newTime);
            spanBest.textContent = 'YOURS!';
        }

        else {
            spanBest.textContent = recordTime;
        }
        
        modalWin.classList.remove('inactive');
    }
}

function handleLoseCollision() {

    // Lose one life
    numberOfLives--;
    renderLives(numberOfLives);
    impactPositions.push(playerPosition);

    // Restart level
    if(numberOfLives > 0) {
        startLevel();
    }
    else {
        // Player time
        clearInterval(timeInterval);

        // Game Over Animation
        let totalAnimationTime = 1000;
        let maxRadius = Math.max(
            playerPosition.posX,
            playerPosition.posY,
            9 - playerPosition.posX,
            9 - playerPosition.posY,
        );

        let animationTime = totalAnimationTime / (maxRadius + 1);
        for(let radius = 0; radius <= maxRadius; radius++) {
            setTimeout(renderGameOver, animationTime * radius, radius);
        }

        // Game Over Modal
        setTimeout(showModalLose, totalAnimationTime);
    }
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

    // Enter to restart the game
    if(!numberOfLives) {
        if(event.key == 'Enter') startGame();
        return;
    }

    // Control movement
    changePosition(event.key);

    // Collisions
    checkCollision();

    // Update Canvas
    renderCanvas();
}

function renderGameOver(radius) {

    // Grid positions at radius distance
    let upperPosition = Math.max(playerPosition.posY - radius, 0);
    let leftPosition = Math.max(playerPosition.posX - radius, 0);
    let rightPosition = Math.min(playerPosition.posX + radius, 9);
    let lowerPosition = Math.min(playerPosition.posY + radius, 9);

    // Upper line
    for(let posX = leftPosition; posX <= rightPosition; posX++)
        if(map2DArray[upperPosition][posX] == 'X')
            renderElement('BURN', {posX, posY: upperPosition});

    // Left line
    for(let posY = upperPosition; posY <= lowerPosition; posY++)
        if(map2DArray[posY][leftPosition] == 'X')
            renderElement('BURN', {posX: leftPosition, posY});

    // Right line
    for(let posY = upperPosition; posY <= lowerPosition; posY++)
        if(map2DArray[posY][rightPosition] == 'X')
            renderElement('BURN', {posX: rightPosition, posY});

    // Lower line
    for(let posX = leftPosition; posX <= rightPosition; posX++)
        if(map2DArray[lowerPosition][posX] == 'X')
            renderElement('BURN', {posX, posY: lowerPosition});
}

function showModalLose() {
    modalLose.classList.remove('inactive');
    document.querySelector('#modal-current-level').textContent = levelNumber + 1;
    document.querySelector('#modal-total-levels').textContent = TOTAL_LEVELS;
}

// General event listeners
window.addEventListener('resize', renderCanvas);
window.addEventListener('keydown', movePlayer);

// Keydown event listeners
buttonUp.addEventListener('click', movePlayer.bind(null, {key: 'ArrowUp'}));
buttonLeft.addEventListener('click', movePlayer.bind(null, {key: 'ArrowLeft'}));
buttonRight.addEventListener('click', movePlayer.bind(null, {key: 'ArrowRight'}));
buttonDown.addEventListener('click', movePlayer.bind(null, {key: 'ArrowDown'}));

// Modal event listeners
modalRules.addEventListener('click', startGame);
modalWin.addEventListener('click', startGame);
modalLose.addEventListener('click', startGame);