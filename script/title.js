const Title = (() => {
    const openDialog = (dial, isAiDial, getDifficulty, p2col, p2dis) => {
        if(isAiDial){
            getDifficulty().forEach(dif => {
                dif.style.display = 'block'
            });
            p2col().style.display = 'none'
            p2dis().style.display = 'none'
            dial.showModal()
            return
        }
        getDifficulty().forEach(dif => {
            dif.style.display = 'none'
        });
        p2col().style.display = 'block'
        p2dis().style.display = 'block'
        dial.showModal()
    }
    const closeDialog = (dial) => {
        dial.close()
    }

    const changeDis = (p1, p2, colDis1, colDis2, isP1) => {
        if(isP1){p2().checked = false}
        else {p1().checked = false}
        colDis1().textContent = colDis1().textContent == 'Red' ? 'Yellow' : 'Red'
        colDis2().textContent = colDis2().textContent == 'Yellow' ? 'Red' : 'Yellow'
    }

    const getData = (player1Col, getDifficulty, event) => {
        event.preventDefault()
        let color1 = player1Col().checked ? 'Red' : 'Yellow'
        let color2 = player1Col().checked ? 'Yellow' : 'Red'
        let difficulty = getDifficulty()
        if(difficulty[0].style.display === 'none'){
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
