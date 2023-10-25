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

    const changeDis = (colDis1, colDis2) => {
        colDis1().textContent = colDis1().textContent == 'Red' ? 'Yellow' : 'Red'
        if(colDis2()){
            colDis2().textContent = colDis2().textContent == 'Yellow' ? 'Red' : 'Yellow'
        }
    }

    const getData = (player1Col, getDifficulty) => {
        let color1 = player1Col().checked ? 'Red' : 'Yellow'
        let color2 = player1Col().checked ? 'Yellow' : 'Red'
        let difficulty = getDifficulty()
        if(!difficulty){
            return {
                color:[color1, color2],
                difficulty
            }
        }
        for(dif of difficulty){
            if(dif.checked){
                difficulty = dif.value
                break
            }
        }
        return {
            color:[color1, color2],
            difficulty
        }
    }
})()
