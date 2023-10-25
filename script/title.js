const DOM = () => {
    return{
        closeDialBtn: () => document.querySelector('#'),
        botSbt: () => document.querySelector('#'),
        mulSbt: () => document.querySelector('#'),
        player1Col: () => document.querySelector('#'),
        player1ColDis: () => document.querySelector('#'),
        player2Col: () => document.querySelector('#'),
        player2ColDis: () => document.querySelector('#'),
        difficulty: () => document.querySelector('#'),
    }
}

const Title = (() => {
    const {botSbt, mulSbt, player1Col, player2Col, player1ColDis, player2ColDis, difficulty} = DOM()
    
    const openDialog = (dial) => {
        dial().showModal()
    }
    const closeDialog = (dial) => {
        dial().close()
    }

    const changeDis1 = () => {
        player1ColDis.textContent = player1ColDis.textContent == 'Red' ? 'Yellow' : 'Red'
    }
    const changeDis2 = () => {
        player1ColDis.textContent = player1ColDis.textContent == 'Yellow' ? 'Red' : 'Yellow'
    }

    const getData = () => {
        
    }
})()
