console.log('Hello Pomodoro Technique!');

const circle = document.querySelector('#circleTimer');
const needle = document.querySelector('.needle');
const workTimer = document.querySelector('#workTimer');
const breakTimer = document.querySelector('#breakTimer');
const controlBtn = document.querySelector('#controlBtn');
const addTimeBtn = document.querySelector('#addTimeBtn');

const radius= 50;
const circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

const workSeconds = 1500;
const breakSeconds = 300;
const addTime = 60;
let timer;
let currentSeconds = workSeconds;
let currentTotal = workSeconds;
let currentTimer = workTimer;
let isPaused = true;
let workTime = true;

updateTimer(workTimer, workSeconds);
updateTimer(breakTimer, breakSeconds);

//total 90s => 01:30
function updateTimer(element, total){

    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    element.textContent = `${minutes}:${formattedSeconds}`;

}

function setProgress(percentage){

    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    const rotation = (percentage / 100) * 360; //360 = gradi del cerchio;
    needle.style.transform = `rotate(${rotation}deg)`;

}

function decrement(){

    if (isPaused){

        return;

    }

    currentSeconds--;
    updateTimer(currentTimer, currentSeconds);

    const percentage = Math.ceil(((currentTotal - currentSeconds) / currentTotal) * 100 );
    console.log(currentTotal, currentSeconds, percentage);

    setProgress(percentage);

    if(currentSeconds === 0){

        clearInterval(timer);

        if(workTime){

            workTime = false;
            //fase di pausa
            currentSeconds = breakSeconds;
            currentTimer = breakTimer;
            document.body.classList.add('break-phase')
            workTimer.classList.remove('timer--active');
            breakTimer.classList.add('timer--active');

            timer = setInterval(decrement, 1000);

        }else{

            controlBtn.classList.remove('control-btn--pause');
            controlBtn.setAttribute('disabled', 'disabled');
            addTimeBtn.setAttribute('disabled', 'disabled');

        }
    }
}

controlBtn.addEventListener('click', function(){

    isPaused = !isPaused;

    if(!isPaused){

        controlBtn.classList.add('control-btn--pause');

    } else {

        controlBtn.classList.remove('control-btn--pause');

    }
    if(!timer){

        addTimeBtn.removeAttribute('disabled');
        timer = setInterval(decrement, 1000);

    }
});

addTimeBtn.addEventListener('click', function(){
    
    currentSeconds+= addTime;
    currentTotal += addTime;
    updateTimer(currentTimer, currentSeconds);

})