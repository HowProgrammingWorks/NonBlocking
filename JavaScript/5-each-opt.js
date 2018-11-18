'use strict';

const INTERVAL = 10;

const numbers = new Array(1000).fill(1);

const each = (array, fn) => {
  let time = Date.now();
  let i = 0;
  const last = array.length - 1;

  const next = () => {
    while (i <= last) {
      const now = Date.now();
      const diff = now - time;
      if (diff > INTERVAL) {
        time = now;
        setTimeout(next, 0);
        break;
      } else {
        fn(array[i], i++);
      }
    }
  };

  next();
};

let k = 0;

const timer = setInterval(() => {
  console.log('next ', k++);
}, 10);

const begin = process.hrtime.bigint();

each(numbers, (item, i) => {
  console.log(i);
  if (i === 999) {
    clearInterval(timer);
    const diff = (process.hrtime.bigint() - begin) / 1000000n;
    console.log('Time(ms):', diff.toString());
    console.dir({ k });
  }
});
