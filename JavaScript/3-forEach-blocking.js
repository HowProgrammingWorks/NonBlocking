'use strict';

const numbers = new Array(1000).fill(1);

setTimeout(() => {
  console.log('setTimeout 0');
}, 0);

numbers.forEach((item, i) => {
  console.log(i);
});
