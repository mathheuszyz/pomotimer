// script.js
let timer;
let isRunning = false;
let isPaused = false;
let minutes = 25;
let seconds = 0;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const setTimeButton = document.getElementById('setTime');
const timeInput = document.getElementById('timeInput');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const alarmAudio = new Audio('alarme.mp3'); // Carrega o áudio do alarme

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
setTimeButton.addEventListener('click', setTime);

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    isPaused = false;
    timer = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    isPaused = true;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    isPaused = false;
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    updateDisplay();
}

function setTime() {
    const inputMinutes = parseInt(timeInput.value);
    if (isNaN(inputMinutes) || inputMinutes < 1 || inputMinutes > 120) return;
    if (isRunning) return;
    minutes = inputMinutes;
    seconds = 0;
    updateDisplay();
}

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            alarmAudio.play(); // Reproduz o som do alarme
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Inicializa a exibição do timer ao carregar a página
updateDisplay();
