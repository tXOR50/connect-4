export const GameBoard = (() => {
    const cell = () => {
        let value = '0'
        let addMark = (player) => {value = player}
        let getValue = () => value
        return{addMark, getValue}
    }
    const Board = []
    for(let i = 0; i < 6; i++){
        Board[i] =  []
        for (let j = 0; j < 7; j++) {
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
        if(Board[availableRow][col].getValue() !== '0') return
        Board[availableRow][col].addMark(token)
        return availableRow
    }
    const getBoard = () => Board
    const resetBoard = () => {
        for(let i = 0; i < 6; i++){
            for (let j = 0; j < 7; j++) {
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
        for(let i = 0; i < 6; i++){
            for(let j = 0; j < 4; j++){
                if (GameBoard.getBoard()[i][j].getValue() !== '0' && 
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i][j + 1].getValue() && 
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i][j + 2].getValue() &&
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i][j + 3].getValue()) {
                        return GameBoard.getBoard()[i][j].getValue()
                    }
            }
        }

        // Check for Vertical win
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 6; j++){
                if (GameBoard.getBoard()[i][j].getValue() !== '0' && 
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i + 1][j].getValue() && 
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i + 2][j].getValue() &&
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i + 3][j].getValue()) {
                        return GameBoard.getBoard()[i][j].getValue()
                    }
            }
        }

        // Check for Diagonal left - right win
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if (GameBoard.getBoard()[i][j].getValue() !== '0' && 
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i + 1][j + 1].getValue() && 
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i + 2][j + 2].getValue() &&
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i + 3][j + 3].getValue()) {
                        return GameBoard.getBoard()[i][j].getValue()
                    }
            }
        }

        // Check for Diagonal right - left win
        for(let i = 3; i < 6; i++){
            for(let j = 0; j < 3; j++){
                if (GameBoard.getBoard()[i][j].getValue() !== '0' && 
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i - 1][j + 1].getValue() && 
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i - 2][j + 2].getValue() &&
                    GameBoard.getBoard()[i][j].getValue() === GameBoard.getBoard()[i - 3][j + 3].getValue()) {
                        return GameBoard.getBoard()[i][j].getValue()
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
            playerTurn = changeTurn(playerTurn, Player)
            let isWin = checkWin()
            if (isWin) {
                return {row, playerTurn, isWin}
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
    const timerDisplay = () => {
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
    }

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
    
    const gameNav = (cells, Time) => {
        const homes = document.querySelector('.home-s')
        const resets = document.querySelector('.reset-s')
        const pauses = document.querySelector('.pause-s')
        const home = document.querySelector('.home')
        const reset = document.querySelector('.reset')
        const pause = document.querySelector('.pause')

        const resetScreenBoard = () => {
            Time.pauseTimer()
            Time.startTimer().resetTimer()
            GameBoard.resetBoard()
            playerTurnDis().fClearUnderline('player2')
            playerTurnDis().fClearUnderline('player1')
            playerTurnDis().displayUnderline('player1')
            cells.forEach(cell => {
                cell.classList.remove('cell-Red')
                cell.classList.remove('cell-Yellow')
            })
        }
        const backHome = () => {
            const mainGame = document.querySelector('.main-game')
            const mainHome = document.querySelector('.main-home')
            mainGame.style.display = 'none'
            mainHome.style.display = 'grid'
            terminateBoard()
        }
        const pauseScreenSide = () => {
            if(pauses.classList.contains('fa-pause')){
                disableBoard()
                Time.pauseTimer()
            }else if(pauses.classList.contains('fa-play')){
                enableBoard()
                Time.startTimer()
            }
            pauses.classList.toggle('fa-pause')
            pauses.classList.toggle('fa-play')
        }
        const pauseScreen = () => {
            const dropContent = document.querySelector('.drop-content')
            if (dropContent.style.display === 'flex') {
                dropContent.style.display = 'none'
                Time.startTimer()
                enableBoard()
                return
            }
            dropContent.style.display = 'flex'
            disableBoard()
            Time.pauseTimer()
        }

        home.addEventListener('click', backHome)
        reset.addEventListener('click', resetScreenBoard)
        pause.addEventListener('click', pauseScreen)
        homes.addEventListener('click', backHome)
        resets.addEventListener('click', resetScreenBoard)
        pauses.addEventListener('click', pauseScreenSide)
    }

    const init = (titleCont, getCells, gameData) => {
        displayGame(titleCont)
        createBoard()
        const cellEventHandler = (() => {
            const cells = getCells()
            const Game = GameController.game(gameData)
            const Time = timerDisplay()
            const playerTurnAnimation = playerTurnDis()
            const GameNav = gameNav(cells, Time, disableBoard, enableBoard)
            
            playerTurnAnimation.displayUnderline('player1')
            Time.startTimer()
            
            const endGame = () => {console.log('WON')}
            const addColor = (col, game) => {
                let cell = document.querySelector(`[data-col="${col}"][data-row="${game.row}"]`)
                cell.classList.add(`cell-${game.playerTurn.color}`)
            }
            const turnAnimation = (game) => {
                let playerTurnBefore = game.playerTurn.player === 'player1' ? 'player2' : 'player1'
                playerTurnAnimation.clearUnderline(playerTurnBefore)
                playerTurnAnimation.displayUnderline(game.playerTurn.player)
                Time.pauseTimer()
                Time.startTimer().resetTimer()
            }
            const timeOutHandler = (() => {
                const timeOutInterval = setInterval(() => {
                    if (Time.getTime() === '00:00') {
                        const col = Math.floor(Math.random() * 7);
                        const game = Game.play(col);
                        addColor(col,game);
                        if(game.isWin){
                            endGame();
                        }
                        turnAnimation(game);
                    }
                }, 1000);
                return{timeOutInterval}
            })()
            const cellClickHandler = (e) => {
                const col = e.target.dataset.col
                const game = Game.play(col)
                addColor(col,game)
                if(game.isWin){
                    endGame()
                }
                turnAnimation(game)
            }
            cells.forEach(cell => {
                cell.addEventListener('click', (e => cellClickHandler(e)))
            });
        })()
    }
    return{init}
})()