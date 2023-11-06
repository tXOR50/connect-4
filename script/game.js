const ROWS = 6
const COLS = 7
export const GameBoard = (() => {
    const cell = () => {
        let value = '0'
        let addMark = (player) => {value = player}
        let getValue = () => value
        return{addMark, getValue}
    }
    const Board = []
    for(let i = 0; i < ROWS; i++){
        Board[i] =  []
        for (let j = 0; j < COLS; j++) {
            Board[i].push(cell())
        }
    }

    const checkRow = (col) => {
        for(let i = 5; i >= 0; i--){
            if(GameBoard.getBoard()[i][col].getValue() === '0') {
                return i
            }
        }
        return -1
    }

    const markCell = (col,token) =>{
        let availableRow = checkRow(col)
        if(availableRow <= -1) return 'stop'
        Board[availableRow][col].addMark(token)
        return availableRow
    }
    const getBoard = () => Board
    const resetBoard = () => {
        for(let i = 0; i < ROWS; i++){
            for (let j = 0; j < COLS; j++) {
                Board[i][j].addMark('0')
            }
        }
    }
    return{markCell,getBoard,resetBoard}
})()

export const GameController = (() => {
    const getPlayer = (gameData) => [
        {
            player: gameData.player1,
            color: gameData.color[0],
            token: 'O'
        },
        {
            player: gameData.player2,
            color: gameData.color[1],
            token: 'X'
        },
    ]

    let getPlayerTurn = (Player) => Player[0]
    const changeTurn = (playerTurn, Player) => {
        playerTurn = playerTurn === Player[0] ? Player[1] : Player[0]
        return playerTurn
    }
    const checkWin = () => {
        // Check for Horizontal win
        for(let row = 0; row < ROWS; row++){
            for(let col = 0; col < COLS - 3; col++){
                if (GameBoard.getBoard()[row][col].getValue() !== '0' && 
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row][col + 1].getValue() && 
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row][col + 2].getValue() &&
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row][col + 3].getValue()) {
                        return {
                            rows: [row, row, row, row],
                            cols: [col, col+1, col+2, col+3]
                        }
                    }
            }
        }

        // Check for Vertical win
        for(let col = 0; col < COLS; col++){
            for(let row = 0; row < ROWS - 3; row++){
                if (GameBoard.getBoard()[row][col].getValue() !== '0' && 
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row + 1][col].getValue() && 
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row + 2][col].getValue() &&
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row + 3][col].getValue()) {
                        return {
                            rows: [row, row+1, row+2, row+3],
                            cols: [col, col, col, col]
                        }
                    }
            }
        }

        // Check for Diagonal Bleft - Tright win
        for(let row = 0; row < ROWS - 3; row++){
            for(let col = 0; col <= COLS - 3; col++){
                if (GameBoard.getBoard()[row][col].getValue() !== '0' && 
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row + 1][col + 1].getValue() && 
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row + 2][col + 2].getValue() &&
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row + 3][col + 3].getValue()) {
                        return {
                            rows: [row, row+1, row+2, row+3],
                            cols: [col, col+1, col+2, col+3]
                        }
                    }
            }
        }

        // Check for Diagonal Bright - Tleft win
        for(let row = 3; row < ROWS; row++){
            for(let col = 0; col < COLS - 3; col++){
                if (GameBoard.getBoard()[row][col].getValue() !== '0' && 
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row - 1][col + 1].getValue() && 
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row - 2][col + 2].getValue() &&
                    GameBoard.getBoard()[row][col].getValue() === GameBoard.getBoard()[row - 3][col + 3].getValue()) {
                        return {
                            rows: [row, row-1, row-2, row-3],
                            cols: [col, col+1, col+2, col+3]
                        }
                    }
            }
        }

        return 0
    }
    const game = (gameData) => {
        const Player = getPlayer(gameData)
        let playerTurn = getPlayerTurn(Player)
        const play = (col) => {
            let row = GameBoard.markCell(col,playerTurn.token)
            if (row === 'stop') { return {unavailRow: true}}
            playerTurn = changeTurn(playerTurn, Player)
            let winCell = checkWin()
            if (winCell) {
                return {row, playerTurn, winCell}
            }
            return {row, playerTurn}
        }
        return{play}
    }
    return {game}
})()

export const GameScreen = (() => {
    const displayGame = (titleCont) => {
        titleCont.style.display = 'none'
        document.querySelector('.main-game').style.display = 'grid'
    }
    const createBoard = () => {
        let fragment = document.createElement('div')
        fragment.classList.add('board')
        for(let i = 0; i < 42; i++){
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.setAttribute('data-col', Math.floor(i % 7))
            cell.setAttribute('data-row', Math.floor(i / 7))
            fragment.append(cell)
        }
        document.querySelector('.board-cont').append(fragment)
    }
    const terminateBoard = () => {
        const board = () => document.querySelector('.board')
        if (board()) {
            board().remove()
        }
    }
    const Time = (() => {
        let countDown = 19
        const clock = document.querySelector('.clock')
        const getTime = () => document.querySelector('.clock').textContent
        let clockInterval
        const startTimer = () => {
            const resetTimer = () => {
                clock.textContent = '00:20'
                countDown = 19
            }
            clockInterval = setInterval(() => {
                clock.textContent = countDown > 9 ? `00:${countDown}` : `00:0${countDown}` 
                if (!countDown) {
                    clearInterval(clockInterval)
                }
                countDown--
            }, 1000);
            return {resetTimer}
        }
        const pauseTimer = () => {
            clearInterval(clockInterval)
        }
        return{startTimer, pauseTimer, getTime}
    })()

    const playerTurnDis = () => {
        const displayUnderline = (turn) => {
            let underline = document.querySelector(`.${turn}-cont > .underline`)
            underline.classList.add('right-a')
            let count = 0
            let interval = setInterval(() => {
                underline.style.width = `${count}px`
                count += 5
                if (count > 120) {
                    clearInterval(interval)
                }
            }, 10);
        }
        const clearUnderline = (turn) => {
            let underline = document.querySelector(`.${turn}-cont > .underline`)
            underline.classList.remove('right-a')
            let count = 120
            let interval = setInterval(() => {
                underline.style.width = `${count}px`
                count -= 5
                if (count < 0) {
                    clearInterval(interval)
                }
            }, 10);
        }
        const fClearUnderline = (turn) => {
            let underline = document.querySelector(`.${turn}-cont > .underline`)
            underline.style.width = '0px'
        }
        return{displayUnderline, clearUnderline, fClearUnderline}
    }

    const disableBoard = () => {
        document.querySelector('.board').classList.add('disabled')
    }
    const enableBoard = () => {
        document.querySelector('.board').classList.remove('disabled')
    }
    
    const gameNav = (() => {
        const pauses = document.querySelector('.pause-s')
        const homesCont = document.querySelector('.n-home-s')
        const resetsCont = document.querySelector('.n-reset-s')
        const pausesCont = document.querySelector('.n-pause-s')
        const home = document.querySelector('.home')
        const reset = document.querySelector('.reset')
        const pause = document.querySelector('.pause')
        const cells = () => document.querySelectorAll('.cell')

        const togglePause = () => {
            pauses.classList.toggle('fa-pause')
            pauses.classList.toggle('fa-play')
        }

        const pauseScreen = () => {
            const dropContent = document.querySelector('.drop-content')
            if (dropContent.classList.contains('display-flex')) {
                dropContent.classList.add('display-none')
                dropContent.classList.remove('display-flex')
                Time.startTimer()
                enableBoard()
            }
            else{
                dropContent.classList.add('display-flex')
                dropContent.classList.remove('display-none')
                Time.pauseTimer()
                disableBoard()
            }

        }

        const resetScreenBoard = (popUp) => {
            enableBoard()
            if (popUp) {
                Time.startTimer().resetTimer()
                Time.pauseTimer()
                pauseScreen()
            }else{
                if (pauses.classList.contains('fa-play')) {
                    togglePause()
                }
                Time.pauseTimer()
                Time.startTimer().resetTimer()
            }
            GameBoard.resetBoard()
            playerTurnDis().fClearUnderline('player2')
            playerTurnDis().fClearUnderline('player1')
            playerTurnDis().displayUnderline('player1')
            cells().forEach(cell => {
                cell.classList.remove('cell-Red')
                cell.classList.remove('cell-Green')
            })
        }
        const backHome = () => {
            if (pauses.classList.contains('fa-play')) {
                togglePause()
            }
            const mainGame = document.querySelector('.main-game')
            const mainHome = document.querySelector('.main-home')
            const dropContent = document.querySelector('.drop-content')
            mainGame.style.display = 'none'
            dropContent.classList.add('display-none')
            dropContent.classList.remove('display-flex')
            mainHome.style.display = 'grid'
            Time.pauseTimer()
            terminateBoard()
            GameBoard.resetBoard()
        }
        const pauseScreenSide = () => {
            if(pauses.classList.contains('fa-pause')){
                Time.pauseTimer()
                disableBoard()
            }else if(pauses.classList.contains('fa-play')){
                Time.startTimer()
                enableBoard()
            }
            togglePause()
        }
        
        home.addEventListener('click', backHome)
        reset.addEventListener('click', () => resetScreenBoard(true))
        pause.addEventListener('click', pauseScreen)
        homesCont.addEventListener('click', backHome)
        resetsCont.addEventListener('click', () => resetScreenBoard(false))
        pausesCont.addEventListener('click', pauseScreenSide)
    })()

    const init = (titleCont, getCells, gameData) => {
        displayGame(titleCont)
        createBoard()
        const cellEventHandler = (() => {
            const cells = getCells()
            const Game = GameController.game(gameData)
            const playerTurnAnimation = playerTurnDis()
            
            playerTurnAnimation.displayUnderline('player1')
            Time.startTimer().resetTimer()
            
            const endGame = (cells) => {
                for (let i = 0; i < 4; i++) {
                    let cell = document.querySelector(`[data-col="${cells.cols[i]}"][data-row="${cells.rows[i]}"]`)
                    cell.classList.add('cell-win')
                }
                disableBoard()
                Time.pauseTimer()
            }
            const addColor = (col, game) => {
                let cell = document.querySelector(`[data-col="${col}"][data-row="${game.row}"]`)
                let playerColorBefore = game.playerTurn.color === 'Red' ? 'Green' : 'Red'
                cell.classList.add(`cell-${playerColorBefore}`)
            }
            const turnAnimation = (game) => {
                let playerTurnBefore = game.playerTurn.player === 'player1' ? 'player2' : 'player1'
                playerTurnAnimation.clearUnderline(playerTurnBefore)
                playerTurnAnimation.displayUnderline(game.playerTurn.player)
            }
            const timeOutHandler = (() => {
                const timeOutInterval = setInterval(() => {
                    if (Time.getTime() === '00:00') {
                        const col = Math.floor(Math.random() * 7);
                        const game = Game.play(col);
                        if (game.unavailRow) {
                            return 0
                        }
                        addColor(col,game);
                        if(game.winCell){
                            return endGame(game.winCell)
                        }
                        turnAnimation(game);
                        Time.pauseTimer()
                        Time.startTimer().resetTimer()
                    }
                }, 1000);
                return{timeOutInterval}
            })()
            const cellClickHandler = (e) => {
                const col = e.target.dataset.col
                const game = Game.play(col)
                if (game.unavailRow) {
                    return 0
                }
                addColor(col,game)
                if(game.winCell){
                    return endGame(game.winCell)
                }
                turnAnimation(game)
                Time.pauseTimer()
                Time.startTimer().resetTimer()
            }
            cells.forEach(cell => {
                cell.addEventListener('click', (e => cellClickHandler(e)))
            });
        })()
    }
    return{init}
})()