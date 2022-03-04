console.log('Hello Pomodoro Technique!');

const circle = document.querySelector('#circleTimer');
const needle = document.querySelector('.needle');
const workTimer = document.querySelector('#workTimer');
const breakTimer = document.querySelector('#breakTimer');
const controlBtn = document.querySelector('#controlBtn');
const addTimeBtn = document.querySelector('#addTimeBtn');

const workSeconds = 30;
const breakSeconds = 5;
let timer;

updateTimer(workTimer, workSeconds);
updateTimer(breakTimer, breakSeconds);

//total 90s => 01:30
function updateTimer(element, total){
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    element.textContent = `${minutes}:${formattedSeconds}`;
}

controlBtn.addEventListener('click', function(){
    timer = setInterval(decrement, 1000);
});