const departMinutes = 0.2;
let temps = departMinutes * 60;

const timerElement = document.getElementById("timer");

let timerInterval = null;
let timerPaused = false;

function startTimer() {
    timerInterval = setInterval(() => {
        if (!timerPaused) {
            let minutes = parseInt(temps / 60, 10);
            let secondes = parseInt(temps % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            secondes = secondes < 10 ? "0" + secondes : secondes;

            timerElement.innerText = `${minutes}:${secondes}`;
            
            if (temps > 0) {
                temps = temps - 1;
            }
        }
    }, 1000);
}

window.pauseTimer = function() {
    timerPaused = true;
};

window.resumeTimer = function() {
    timerPaused = false;
};

window.restartTimer = function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerPaused = false;
    temps = departMinutes * 60;
    startTimer();
};

// Lance le timer au chargement
startTimer();