let timers = [null, null, null, null, null, null];
let durations = [0, 0, 0, 0, 0, 0];
let running = [false, false, false, false, false, false];

document.getElementById('start1').addEventListener('click', () => startTimer(1));
document.getElementById('stop1').addEventListener('click', () => stopTimer(1));
document.getElementById('reset1').addEventListener('click', () => resetTimer(1));

document.getElementById('start2').addEventListener('click', () => startTimer(2));
document.getElementById('stop2').addEventListener('click', () => stopTimer(2));
document.getElementById('reset2').addEventListener('click', () => resetTimer(2));

document.getElementById('startAll').addEventListener('click', startAllTimers);

function startTimer(timerIndex) {
    let minutesInput, secondsInput;
    if (timerIndex <= 2) {
        minutesInput = document.getElementById('minutes');
        secondsInput = document.getElementById('seconds');
    } else {
        minutesInput = document.getElementById(`minutes${String.fromCharCode(64 + timerIndex - 2)}`);
        secondsInput = document.getElementById(`seconds${String.fromCharCode(64 + timerIndex - 2)}`);
    }
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (minutes < 0 || seconds < 0 || seconds > 59) {
        alert('Por favor, ingrese una duración válida.');
        return;
    }

    durations[timerIndex - 1] = minutes * 60 + seconds;
    clearInterval(timers[timerIndex - 1]);
    running[timerIndex - 1] = true;
    updateStatus(timerIndex);

    timers[timerIndex - 1] = setInterval(() => {
        if (durations[timerIndex - 1] <= 0) {
            clearInterval(timers[timerIndex - 1]);
            running[timerIndex - 1] = false;
            updateStatus(timerIndex);
            if (timerIndex === 1) {
                startTimer(2);
            }
        } else {
            durations[timerIndex - 1]--;
            updateDisplay(timerIndex);
        }
    }, 1000);
}

function stopTimer(timerIndex) {
    clearInterval(timers[timerIndex - 1]);
    running[timerIndex - 1] = false;
    updateStatus(timerIndex);
}

function resetTimer(timerIndex) {
    clearInterval(timers[timerIndex - 1]);
    durations[timerIndex - 1] = 0;
    running[timerIndex - 1] = false;
    updateDisplay(timerIndex);
    updateStatus(timerIndex);
}

function startAllTimers() {
    startTimer(3);
    startTimer(4);
    startTimer(5);
}

function updateDisplay(timerIndex) {
    const minutes = Math.floor(durations[timerIndex - 1] / 60);
    const seconds = durations[timerIndex - 1] % 60;
    let display;
    if (timerIndex <= 2) {
        display = document.getElementById(`display${timerIndex}`);
    } else {
        display = document.getElementById(`display${String.fromCharCode(64 + timerIndex - 2)}`);
    }
    display.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateStatus(timerIndex) {
    let status;
    if (timerIndex <= 2) {
        status = document.getElementById(`status${timerIndex}`);
    } else {
        status = document.getElementById(`status${String.fromCharCode(64 + timerIndex - 2)}`);
    }
    status.textContent = running[timerIndex - 1] ? 'En ejecución' : 'En pausa';
}