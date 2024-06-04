let startTime, updatedTime, difference, tInterval;
let savedTime = 0;
let running = false;
let lapCounter = 0;

const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const display = document.querySelector('.display');
const lapsContainer = document.querySelector('.laps');

function startStopWatch() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1000); // Update every second
        running = true;
        startStopBtn.innerHTML = 'Stop';
        startStopBtn.style.backgroundColor = 'red';
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startStopBtn.innerHTML = 'Start';
        startStopBtn.style.backgroundColor = 'green';
    }
}

function resetStopWatch() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    display.innerHTML = '00 : 00 : 00';
    startStopBtn.innerHTML = 'Start';
    startStopBtn.style.backgroundColor = 'green';
    lapsContainer.innerHTML = '';
    lapCounter = 0;
}

function lapStopWatch() {
    if (running) {
        lapCounter++;
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapCounter}-----> ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = `${hours} : ${minutes} : ${seconds}`;
}

startStopBtn.addEventListener('click', startStopWatch);
lapBtn.addEventListener('click', lapStopWatch);
resetBtn.addEventListener('click', resetStopWatch);
