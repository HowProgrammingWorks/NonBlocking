'use strict';

const numbers = new Array(1000).fill(1);

const each = (array, fn) => {
  const last = array.length - 1;
  const next = i => {
    setTimeout(() => {
      fn(array[i], i);
      if (i !== last) next(++i);
    }, 0);
  };
  next(0);
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
  }
});
