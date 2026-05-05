function timer (time){
    const timerElement = document.getElementById("timer")
    setInterval(lessTime(timerElement,time),1000)
}

function lessTime (timerElement, time){
    timerElement.innerText = time;
    time--;
}