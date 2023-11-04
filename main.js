import Title from './script/title.js'
import {GameBoard, GameController, GameScreen} from './script/game.js'

const DOMtitle = () => {
    return{
        titleCont: document.querySelector('.main-home'),
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
        getCells: () => document.querySelectorAll('.cell'),
    }
}

const TitleScreenController = (() => {
    const {titleCont, aiBtn, mulBtn, dialog, closeDialBtn, submitBtn, player2ColCont, difCont, dialTitle, player2Col, player1Col, player1ColDis, player2ColDis, difficulty, getCells} = DOMtitle()
    let gameData

    aiBtn.addEventListener('click', () => Title.openDialog(dialog, true, difCont, player2ColCont, dialTitle))
    mulBtn.addEventListener('click', () => Title.openDialog(dialog, false, difCont, player2ColCont, dialTitle))
    closeDialBtn.addEventListener('click', () => Title.closeDialog(dialog))
    player1Col().addEventListener('click', () => Title.changeDis(player1Col, player2Col, player1ColDis, player2ColDis, true))
    player2Col().addEventListener('click', () => Title.changeDis(player1Col, player2Col, player1ColDis, player2ColDis, false))
    submitBtn.addEventListener('click', (e) => {
        gameData = Title.getData(player1Col, difficulty, difCont, dialog, e)
        GameScreen.init(titleCont, getCells, gameData)
    })
    return{gameData}
})()
