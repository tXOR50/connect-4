import a from './script/title.js'
let num = 0
let halo = () => document.getElementById('app')
document.getElementById('app').addEventListener('click', function() {
    this.textContent = num
    num++ 
    console.log(halo())
})




