import Notiflix from 'notiflix';

const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');
const buttonEl = document.querySelector('button[type=submit]');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      shouldResolve
        ? resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
        : reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
};

const showPromise = () => {
  let delay = +delayEl.value;

  for (let i = 1; i <= amountEl.value; i++) {
    createPromise(i, delay)
      .then(success => {
        Notiflix.Notify.success(success);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
      });
    delay += +stepEl.value;
  }
};

buttonEl.addEventListener('click', e => {
  e.preventDefault();
  showPromise();
});
