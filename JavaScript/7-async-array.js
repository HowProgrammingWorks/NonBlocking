'use strict';

const INTERVAL = 10;

class AsyncArray extends Array {
  [Symbol.asyncIterator]() {
    let time = Date.now();
    let i = 0;
    return {
      next: () => {
        const now = Date.now();
        const diff = now - time;
        if (diff > INTERVAL) {
          time = now;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({
                value: this[i],
                done: i++ === this.length
              });
            }, 0);
          });
        } else {
          return Promise.resolve({
            value: this[i],
            done: i++ === this.length
          });
        }
      }
    };
  }
}

// Usage

let k = 0;

const timer = setInterval(() => {
  console.log('next ', k++);
}, 10);

(async () => {
  const numbers = new AsyncArray(1000).fill(1);

  const begin = process.hrtime.bigint();
  let i = 0;
  for await (const number of numbers) {
    console.log(number, i++);
  }
  clearInterval(timer);

  const diff = (process.hrtime.bigint() - begin) / 1000000n;
  console.log('Time(ms):', diff.toString());
  console.dir({ k });
})();
