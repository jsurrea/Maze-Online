const canvas = document.querySelector('#game')
const gameContext = canvas.getContext('2d')

function startGame() {
    gameContext.fillRect(50,0,100,100)
    gameContext.clearRect(50,50,50,50)

    gameContext.font = '25px Verdana'
    gameContext.fillStyle = 'purple'
    gameContext.textAlign = 'start'
    gameContext.fillText('Platzi', 50, 50)
}

window.addEventListener('load', startGame)