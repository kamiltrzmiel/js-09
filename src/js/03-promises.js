import Notiflix from 'notiflix';

const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');
const buttonEl = document.querySelector('button[type=submit]');

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve
        ? resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
        : reject(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  });
};

const showPromise = async (amount, step, time) => {
  for (let i = 1; i <= amount; i++) {
    try {
      const success = await createPromise(i, time);
      Notiflix.Notify.success(success);
    } catch (error) {
      Notiflix.Notify.failure(error);
    }
    time += step;
    await new Promise(resolve => setTimeout(resolve, step));
  }
};

buttonEl.addEventListener('click', async e => {
  e.preventDefault();
  const amount = Number(amountEl.value);
  const step = Number(stepEl.value);
  const time = Number(delayEl.value);
  await showPromise(amount, step, time);
});
