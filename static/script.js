let timer; // variable to hold interval timer
let isRunning = false;
let startTime;
let pausedTime = 0;
let laps = [];
let lapId = 1;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - pausedTime;
        timer = setInterval(updateDisplay, 10); // Update display every 10 milliseconds
        toggleButtonState('Start', 'Pause');
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        pausedTime = Date.now() - startTime; // Calculate paused time
        toggleButtonState('Pause', 'Resume');
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    document.getElementById('display').textContent = '00:00:00';
    pausedTime = 0;
    laps = [];
    lapId = 1;
    updateLaps();
    toggleButtonState('Resume', 'Start');
}

function updateDisplay() {
    let elapsedTime = Date.now() - startTime;
    let formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let millisecondsFormatted = Math.floor((milliseconds % 1000) / 10); // Get two-digit milliseconds

    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(millisecondsFormatted)}`;
}

function padTime(value) {
    return value < 10 ? `0${value}` : value;
}

function recordLap() {
    if (isRunning) {
        let lapTime = Date.now() - startTime;
        let formattedLapTime = formatTime(lapTime);
        laps.push({ id: lapId, time: formattedLapTime });
        lapId++;
        updateLaps();
    }
}

function updateLaps() {
    let lapsList = document.getElementById('laps');
    lapsList.innerHTML = ''; // Clear previous laps

    laps.forEach((lap) => {
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lap.id}: ${lap.time}`;
        lapsList.appendChild(lapItem);
    });
}

function toggleButtonState(hideButtonId, showButtonId) {
    document.getElementById(hideButtonId).style.display = 'none';
    document.getElementById(showButtonId).style.display = 'inline-block';
}

