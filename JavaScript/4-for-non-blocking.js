'use strict';

const range = {
  start: 1,
  end: 1000,
  [Symbol.asyncIterator]() {
    let value = this.start;
    return {
      next: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            value,
            done: value++ === this.end + 1
          });
        }, 0);
      })
    };
  }
};

console.dir({
  range,
  names: Object.getOwnPropertyNames(range),
  symbols: Object.getOwnPropertySymbols(range),
});

let k = 0;

const timer = setInterval(() => {
  console.log('next ', k++);
}, 10);

(async () => {
  const begin = process.hrtime.bigint();
  for await (const number of range) {
    console.log(number);
    if (number === range.end) {
      clearInterval(timer);
    }
  }
  const diff = (process.hrtime.bigint() - begin) / 1000000n;
  console.log('Time(ms):', diff.toString());
})();
