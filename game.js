const canvas = document.querySelector('#game')
const gameContext = canvas.getContext('2d')

function setCanvasSize() {

    let canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.75;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    let elementSize = canvasSize / 10;   

    gameContext.font = elementSize + 'px Verdana'
    gameContext.textAlign = 'end'

    for(let x = 1; x <= 10; x++) {
        for(let y = 1; y <= 10; y++) {
            gameContext.fillText('🌳', elementSize * x, elementSize * y)
        }
    }
}

function startGame() {

    setCanvasSize();

}

window.addEventListener('load', startGame)
window.addEventListener('resize', setCanvasSize)