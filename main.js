import Title from './script/title.js'

const DOMtitle = () => {
    return{
        mulBtn: document.querySelector('.mul-btn'),
        aiBtn: document.querySelector('.ai-btn'),
        dialog:  document.querySelector('dialog'),
        closeDialBtn:  document.querySelector('.close-btn'),
        submitBtn:  document.querySelector('#sbt-btn'),
        player2ColCont:  document.querySelector('#t-s-cont-p2'),
        difCont:  document.querySelector('.difficulty-switch'),
        dialTitle:  document.querySelector('.comp-modal-title'),
        player2Col:  () => document.querySelector('#p2col'),
        player1Col: () => document.querySelector('#p1col'),
        player1ColDis: () => document.querySelector('[for="p1col"]'),
        player2ColDis: () => document.querySelector('[for="p2col"]'),
        difficulty: () => document.querySelectorAll('[name="dif"]'),
    }
}

const TitleScreenController = (() => {
    const {aiBtn, mulBtn, dialog, closeDialBtn, submitBtn, player2ColCont, difCont, dialTitle, player2Col, player1Col, player1ColDis, player2ColDis, difficulty} = DOMtitle()
    let gameData

    aiBtn.addEventListener('click', () => Title.openDialog(dialog, true, difCont, player2ColCont, dialTitle))
    mulBtn.addEventListener('click', () => Title.openDialog(dialog, false, difCont, player2ColCont, dialTitle))
    closeDialBtn.addEventListener('click', () => Title.closeDialog(dialog))
    player1Col().addEventListener('click', () => Title.changeDis(player1Col, player2Col, player1ColDis, player2ColDis, true))
    player2Col().addEventListener('click', () => Title.changeDis(player1Col, player2Col, player1ColDis, player2ColDis, false))
    submitBtn.addEventListener('click', (e) => {
        gameData = Title.getData(player1Col, difficulty, difCont, e)
        console.log(gameData)
    })
    return{gameData}
})()

const GameBoard = (() => {
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

const GameController = (() => {
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
    
})()

