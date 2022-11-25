function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
};

let timerId = null;

const onStartChangeColorBody = (e) => {
    e.preventDefault();
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
};

const onStopChangeColorBody = (e) => {
    e.preventDefault();
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    
    clearInterval(timerId);
};

refs.startBtn.addEventListener('click', onStartChangeColorBody);
refs.stopBtn.addEventListener('click', onStopChangeColorBody);