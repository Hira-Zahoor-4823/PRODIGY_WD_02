let minutes = 0, seconds = 0, milliseconds = 0;
let timerInterval;
let isRunning = false;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const startPauseBtn = document.getElementById("startPauseBtn");
const lapsList = document.getElementById("laps");

// Function to start or pause stopwatch
function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
    } else {
        timerInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
}

// Function to reset stopwatch
function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    startPauseBtn.textContent = "Start";
    lapsList.innerHTML = "";
}

// Function to record lap times
function recordLap() {
    if (!isRunning) return;
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

// Function to update the stopwatch time
function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

// Function to update displayed time
function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
}

// Helper function to format numbers
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(time) {
    return time < 100 ? `0${time}`.padStart(3, "0") : time;
}
