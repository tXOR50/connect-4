const Title = (() => {
    const openDialog = (dial, isAiDial, difCont, p2colCont, dialTitle) => {
        if(isAiDial){
            dialTitle.textContent = 'Computer'
            difCont.style.display = 'inline-flex'
            p2colCont.style.display = 'none'
            dial.showModal()
            return
        }
        dialTitle.textContent = 'Multiplayer'
        difCont.style.display = 'none'
        p2colCont.style.display = 'flex'
        dial.showModal()
    }
    const closeDialog = (dial) => {
        dial.close()
    }

    const changeDis = (p1, p2, colDis1, colDis2, isP1) => {
        if(isP1){p2().checked = !p1().checked;}
        else {p1().checked = !p2().checked;}
        colDis1().textContent = colDis1().textContent == 'Red' ? 'Yellow' : 'Red'
        colDis2().textContent = colDis2().textContent == 'Yellow' ? 'Red' : 'Yellow'
    }

    const getData = (player1Col, getDifficulty, difCont, event) => {
        event.preventDefault()
        let color1 = player1Col().checked ? 'Red' : 'Yellow'
        let color2 = player1Col().checked ? 'Yellow' : 'Red'
        let difficulty = getDifficulty()
        if(difCont.style.display === 'none'){
            return {
                player1: 'Player 1',
                player2: 'Player 2',
                color:[color1, color2],
                difficulty: null
            }
        }
        for(let dif of difficulty){
            if(dif.checked){
                difficulty = dif.value
                break
            }
        }
        return {
            player1: 'Player 1',
            player2: 'Bot',
            color:[color1, color2],
            difficulty
        }
    }

    return{
        openDialog,
        closeDialog,
        changeDis,
        getData
    }
})()

export default Title
