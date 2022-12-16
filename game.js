const canvas = document.querySelector('#game')
const gameContext = canvas.getContext('2d')

function setCanvasSize() {

    let canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.75;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    let elementSize = canvasSize / 10;   

    gameContext.font = elementSize + 'px Verdana'
    gameContext.textAlign = 'end'

    currentLevel = 2 // 🌳
    currentMap = maps[currentLevel]
    currentRows = currentMap.split("\n")
        .map(element => element.trim())
        .filter(element => !!element.length)

    for(let x = 1; x <= 10; x++) {
        currentRow = currentRows[x-1]
        currentItems = currentRow.split("")
        for(let y = 1; y <= 10; y++) {
            currentItem = currentItems[y-1]
            gameContext.fillText(emojis[currentItem], elementSize * x, elementSize * y)
        }
    }
}

function startGame() {

    setCanvasSize();

}

window.addEventListener('load', startGame)
window.addEventListener('resize', setCanvasSize)