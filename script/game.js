export const GameBoard = (() => {
    const cell = () => {
        let value = '0'
        let addMark = (player) => {value = player}
        let getValue = () => value
        return{addMark, getValue}
    }
    const Board = []
    for(let i = 0; i < 7; i++){
        Board[i] =  []
        for (let j = 0; j < 6; j++) {
            Board[i].push(cell())
        }
    }

    const checkRow = (col) => {
        for(let i = 5; i < 0; i--){
            if(GameBoard.getBoard()[i][col].getValue() === '0') return i
        }
        return 5
    }

    const markCell = (col,token) =>{
        let availableRow = checkRow(col)
        if(Board[availableRow][col].getValue() !== '0') return
        Board[availableRow][col].addMark(token)
    }
    const getBoard = () => Board
    const resetBoard = () => {
        for(let i = 0; i < 7; i++){
            for (let j = 0; j < 6; j++) {
                Board[i][j].addMark('0')
            }
        }
    }
    return{markCell,getBoard,resetBoard}
})()

export const GameController = (() => {
    const getPlayer = () => [
        {
            player: TitleScreenController.gameData.player1,
            color: TitleScreenController.gameData.color[0],
            token: 'O'
        },
        {
            player: TitleScreenController.gameData.player2,
            color: TitleScreenController.gameData.color[1],
            token: 'X'
        },
    ]

    let getPlayerTurn = (Player) => {let playerTurn = Player[0]}
    const changeTurn = (playerTurn, Player) => {playerTurn = playerTurn === Player[0] ? Player[1] : Player[0]}

    const Game = (col) => {
        const Player = getPlayer()
        let playerTurn = getPlayerTurn(Player)
        const Play = () => {
            GameBoard.markCell(col,playerTurn.token)
            changeTurn(playerTurn, Player)
        }
    }
    return {Game}
})()
