'use strict';

const notification = document.querySelector('[data-qa="notification"]');

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  function onClick(event) {
    if (event.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }

  document.addEventListener('click', onClick);
});

const secondPromise = new Promise((resolve) => {
  function onClick(event) {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }
  document.addEventListener('click', onClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function onClick(event) {
    if (event.button === 0) leftClick = true;
    if (event.button === 2) rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }

  document.addEventListener('click', onClick);
});

firstPromise.then(
  (msg) => {
    notification.textContent = msg;
    notification.className = 'success';
  },
  (err) => {
    notification.textContent = err;
    notification.className = 'error';
  },
);

secondPromise.then((msg) => {
  notification.textContent = msg;
  notification.className = 'success';
});

thirdPromise.then((msg) => {
  notification.textContent = msg;
  notification.className = 'success';
});
