import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onCallCreatePromise);

function onCallCreatePromise(e) {
  e.preventDefault();

  const amount = refs.form.elements.amount.value;
  const step = Number(refs.form.elements.step.value);
  let delay = Number(refs.form.elements.delay.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  };
  e.target.reset();
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  );
};