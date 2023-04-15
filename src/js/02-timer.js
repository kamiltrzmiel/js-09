import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const datePickrEl = document.getElementById('datetime-picker');
const startEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const workingEl = document.querySelector('[data-working]');
const workSymbols = ['\u259A', '\u259E'];
let currentSymbolIndex = 0;

startEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate <= selectedDates[0]) {
      startEl.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startEl.disabled = true;
    }
  },
};

flatpickr(datePickrEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  if (value.toString().length === 1) {
    return value.toString().padStart(2, '0');
  }
  return value;
};

datePickrEl.addEventListener('input', e => {
  const pickedDate = new Date(e.currentTarget.value).getTime();

  startEl.addEventListener('click', () => {
    const countdown = setInterval(() => {
      const currentDate = new Date().getTime();
      let timeLeft = pickedDate - currentDate;

      secondsEl.innerHTML = addLeadingZero(convertMs(timeLeft).seconds);
      minutesEl.innerHTML = addLeadingZero(convertMs(timeLeft).minutes);
      hoursEl.innerHTML = addLeadingZero(convertMs(timeLeft).hours);
      daysEl.innerHTML = addLeadingZero(convertMs(timeLeft).days);

      if (timeLeft < 0) {
        clearInterval(countdown);
        secondsEl.innerHTML = addLeadingZero(0);
        minutesEl.innerHTML = addLeadingZero(0);
        hoursEl.innerHTML = addLeadingZero(0);
        daysEl.innerHTML = addLeadingZero(0);
      }
      currentSymbolIndex = (currentSymbolIndex + 1) % workSymbols.length;
      workingEl.textContent = 'Working ' + workSymbols[currentSymbolIndex];
      startEl.disabled = true;
    }, 1000);
  });
});
