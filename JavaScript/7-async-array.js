'use strict';

const INTERVAL = 100;

class AsyncArray extends Array {
  interval(ms) {
    this._interval = ms;
    return this;
  }

  [Symbol.asyncIterator]() {
    let time = Date.now();
    let i = 0;
    const interval = this._interval || INTERVAL;
    return {
      next: () => {
        const now = Date.now();
        const diff = now - time;
        if (diff > interval) {
          time = now;
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                value: this[i],
                done: i++ === this.length
              });
            }, 0);
          });
        }
        return Promise.resolve({
          value: this[i],
          done: i++ === this.length
        });
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
  const numbers = new AsyncArray(10000)
    .interval(100)
    .fill(1);

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
