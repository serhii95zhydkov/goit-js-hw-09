import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const refs = {
    timerBtn: document.querySelector('[data-start]'),
    timerValue: document.querySelector('.value'),
}

let timerId = null;
let selectedDate = null;
let currentDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        if (selectedDates[0] <= options.defaultDate) {
            window.alert("Please choose a date in the future");
        }
        else {
            refs.timerBtn.disabled = false;
        };

        selectedDate = selectedDates[0].getTime();
    },
};

flatpickr('#datetime-picker', options);

refs.timerBtn.disabled = true;

refs.timerBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
    const startDate = selectedDate;

    timerId = setInterval(() => {
        refs.timerBtn.disabled = true;
        currentDate = Date.now();
        const deltaTime = startDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        console.log({ days, hours, minutes, seconds });
        updateTimerValue({ days, hours, minutes, seconds });
        stopInterval(deltaTime);
    }, 1000);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function stopInterval(deltaTime) {
    if (deltaTime < 1000) {
        clearInterval(timerId);
    };
};

function updateTimerValue({ days, hours, minutes, seconds }) {
    refs.timerValue.textContent = `${days}:${hours}:${minutes}:${seconds}`;
};