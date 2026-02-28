//=============================================================================
const block1_content = document.querySelector('.content')
const buttons = document.querySelectorAll('.btn')

let currentMode = 1

function updateClock() {
    const date = new Date()
    
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    
    const dateString = `${day}.${month}.${year}`
    const timeString = `${hours}:${minutes}:${seconds}`
    
    switch(currentMode) {
        case 1:
            block1_content.textContent = `${dateString} ${timeString}`
            break
        case 2:
            block1_content.textContent = timeString
            break
        case 3:
            block1_content.textContent = dateString
            break
    }
}

buttons[0].addEventListener('click', () => {
    currentMode = 1
})

buttons[1].addEventListener('click', () => {
    currentMode = 2
})

buttons[2].addEventListener('click', () => {
    currentMode = 3
})

setInterval(updateClock, 1000)
updateClock()

//=============================================================================
const hourHand = document.querySelector('.hour-hand')
const minuteHand = document.querySelector('.minute-hand')
const secondHand = document.querySelector('.second-hand')

function updateAnalogClock() {
    const now = new Date()
    
    const seconds = now.getSeconds()
    const minutes = now.getMinutes()
    const hours = now.getHours()
    
    const secondsDegrees = ((seconds / 60) * 360) + 90
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`
    
    if (secondsDegrees === 90) {
        secondHand.style.transition = 'none'
    } else {
        secondHand.style.transition = 'transform 0.05s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
    }
}

setInterval(updateAnalogClock, 1000)
updateAnalogClock()

//=============================================================================
window.addEventListener('load', function () {

    function createColumn(element) {
        const column = document.createElement('div')
        column.className = 'digit-column'

        for (let i = 0; i < 10; i++) {
            const num = document.createElement('div')
            num.textContent = i
            column.appendChild(num)
        }

        element.appendChild(column)
        return column
    }

    const h1 = createColumn(document.getElementById('h1'))
    const h2 = createColumn(document.getElementById('h2'))
    const m1 = createColumn(document.getElementById('m1'))
    const m2 = createColumn(document.getElementById('m2'))
    const s1 = createColumn(document.getElementById('s1'))
    const s2 = createColumn(document.getElementById('s2'))

    function setDigit(column, value) {
        column.style.transform = `translateY(-${value * 80}px)`
    }

    function updateClock() {
        const now = new Date()

        const h = now.getHours().toString().padStart(2, '0')
        const m = now.getMinutes().toString().padStart(2, '0')
        const s = now.getSeconds().toString().padStart(2, '0')

        setDigit(h1, +h[0])
        setDigit(h2, +h[1])
        setDigit(m1, +m[0])
        setDigit(m2, +m[1])
        setDigit(s1, +s[0])
        setDigit(s2, +s[1])
    }

    setInterval(updateClock, 1000)
    updateClock()

})

//=============================================================================
const askBtn = document.querySelector('.ask-date')
const nextDateDiv = document.querySelector('.next-date')

askBtn.addEventListener('click', () => {
    const day = prompt('Введите день:', '17')
    const month = prompt('Введите месяц:', '2')
    const year = prompt('Введите год:', '2026')
    
    if (!day || !month || !year) {
        nextDateDiv.textContent = 'Ошибка: заполните все поля!'
        return
    }

    const date = new Date(year, month - 1, day)

    if (date.getDate() != day || date.getMonth() != month - 1) {
        nextDateDiv.textContent = 'Ошибка: такой даты не существует!'
        return
    }
 
    date.setDate(date.getDate() + 1)
    
    const nextDay = String(date.getDate()).padStart(2, '0')
    const nextMonth = String(date.getMonth() + 1).padStart(2, '0')
    const nextYear = date.getFullYear()
    
    nextDateDiv.textContent = `${nextDay}.${nextMonth}.${nextYear}`
})

//=============================================================================
const timerDisplay = document.querySelector('.timer-display')
const startBtn = document.getElementById('startBtn')
const pauseBtn = document.getElementById('pauseBtn')
const resetBtn = document.getElementById('resetBtn')

let time = 0 
let timerInterval = null
let isRunning = false

function updateDisplay() {
    const hours = Math.floor(time / 360000)
    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100)
    const hundredths = time % 100
    
    const h = String(hours).padStart(2, '0')
    const m = String(minutes).padStart(2, '0')
    const s = String(seconds).padStart(2, '0')
    const hs = String(hundredths).padStart(3, '0')
    
    timerDisplay.textContent = `${h} : ${m} : ${s} : ${hs}`
}

function runTimer() {
    time++
    updateDisplay()
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        timerInterval = setInterval(runTimer, 10)
        isRunning = true
    }
})

pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval)
    isRunning = false
})

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval)
    isRunning = false
    time = 0
    updateDisplay()
})

updateDisplay()