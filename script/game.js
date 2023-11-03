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
        let fragment = document.createDocumentFragment()
        for(let i = 0; i < 42; i++){
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.setAttribute('data-col', Math.floor(i % 7))
            cell.setAttribute('data-row', Math.floor(i / 7))
            fragment.append(cell)
        }
        document.querySelector('.board').append(fragment)
    }

    const init = (titleCont, getCells, gameData) => {
        displayGame(titleCont)
        createBoard()
        const cellEventHandler = (() => {
            const cells = getCells()
            const Game = GameController.game(gameData)
            const turnDisplay = document.querySelector('.board-container > h1')

            const endGame = () => {console.log('WON')}
            const changeTurnDis = () => {

            }

            const cellClickHandler = (e) => {
                let col = e.target.dataset.col
                let game = Game.play(col)
                let cell = document.querySelector(`[data-col="${col}"][data-row="${game.row}"]`)
                cell.classList.add(`cell-${game.playerTurn.color}`)
                let boardy = []
                for (let i = 0; i < 6; i++) {
                    boardy[i] = []
                    for (let j = 0; j < 7; j++) {
                        boardy[i].push(GameBoard.getBoard()[i][j].getValue())
                    }
                }
                console.log(boardy)
                if(game.isWin){
                    endGame()
                }
            }
            cells.forEach(cell => {
                cell.addEventListener('click', (e => cellClickHandler(e)))
            });
        })()
    }
    return{init}
})()
