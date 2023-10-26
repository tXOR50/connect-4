import Title from './script/title.js'

const DOMtitle = () => {
    return{
        mulBtn: document.querySelector('.btn-mul'),
        aiBtn: document.querySelector('.btn-ai'),
        dialog:  document.querySelector('dialog'),
        closeDialBtn:  document.querySelector('#close-dial-btn'),
        submitBtn:  document.querySelector('#sbt-btn'),
        player2Col:  () => document.querySelector('#p2col'),
        player1Col: () => document.querySelector('#p1col'),
        player1ColDis: () => document.querySelector('[for="p1col"]'),
        player2ColDis: () => document.querySelector('[for="p2col"]'),
        difficulty: () => document.querySelectorAll('[name="dif"]'),
    }
}

const TitleScreenController = (() => {
    const {aiBtn, mulBtn, dialog, closeDialBtn, submitBtn, player2Col, player1Col, player1ColDis, player2ColDis, difficulty} = DOMtitle()
    let titleData

    aiBtn.addEventListener('click', () => Title.openDialog(dialog, true, difficulty, player2Col, player2ColDis))
    mulBtn.addEventListener('click', () => Title.openDialog(dialog, false, difficulty, player2Col, player2ColDis))
    closeDialBtn.addEventListener('click', () => Title.closeDialog(dialog))
    player1Col().addEventListener('click', () => Title.changeDis(player1Col, player2Col, player1ColDis, player2ColDis, true))
    player2Col().addEventListener('click', () => Title.changeDis(player1Col, player2Col, player1ColDis, player2ColDis, false))
    submitBtn.addEventListener('click', (e) => {
        titleData = Title.getData(player1Col, difficulty, e)
    })
})()



