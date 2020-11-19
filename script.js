let normalMode = true

const grid = document.querySelector('#grid')
const clearOne = document.querySelector('#clear-one')
const clearAll = document.querySelector('#clear-all')

const sizes = document.querySelector('#sizes')

function resetSquares() {
    let allSquares = document.querySelectorAll('.square')
    allSquares.forEach(function(oneSquare) {
        oneSquare.classList.remove('color-red')
    })
    clearOne.setAttribute('disabled', 'disabled')
    clearAll.setAttribute('disabled', 'disabled')

    normalMode = true
}

function checkCleanSquares() {
    let allSquares = document.querySelectorAll('.square')
    
    let clean = true
    allSquares.forEach(function(oneSquare) {
        if (oneSquare.classList.contains('color-red')) clean = false
    })

    if (clean) return true
    else return false
}

function makeMainSpaceReady(rows, columns) {
    grid.innerHTML = ''
    let size = parseInt(600 / columns)
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; j < columns; j++) {
            const square = document.createElement('div')
            square.classList.add('square')
            square.style.width = size + 'px'
            square.style.height = size + 'px'
            row.appendChild(square)
        }
        grid.appendChild(row)
    }
}

makeMainSpaceReady(16, 16)

clearOne.addEventListener('click', function() {
    normalMode = false
})

clearAll.addEventListener('click', function() {
    resetSquares()
    window.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('square')) {
            if (normalMode) {
                e.target.classList.add('color-red')
                clearOne.removeAttribute('disabled')
                clearAll.removeAttribute('disabled')
            } else {
                e.target.classList.remove('color-red')
                if (checkCleanSquares()) resetSquares()
            }
        }
    })
})

window.addEventListener('mousemove', function (e) {
    if (e.target.classList.contains('square')) {
        if (normalMode) {
            e.target.classList.add('color-red')
            clearOne.removeAttribute('disabled')
            clearAll.removeAttribute('disabled')
        } else {
            e.target.classList.remove('color-red')
            if (checkCleanSquares()) resetSquares()
        }
    }
})

sizes.addEventListener('change', function (e) {
    let width = parseInt(this.firstElementChild.value)
    let height = parseInt(this.lastElementChild.value)
    makeMainSpaceReady(width, height)
})