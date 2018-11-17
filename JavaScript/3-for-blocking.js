'use strict';

const range = {
  start: 1,
  end: 1000,
  [Symbol.asyncIterator]() {
    let value = this.start;
    return {
      next: () => Promise.resolve({
        value,
        done: value++ === this.end + 1
      })
    };
  }
};

console.dir({
  range,
  names: Object.getOwnPropertyNames(range),
  symbols: Object.getOwnPropertySymbols(range),
});

setTimeout(() => {
  console.log('setTimeout 0');
}, 0);

(async () => {
  const begin = process.hrtime.bigint();
  for await (const number of range) {
    console.log(number);
  }
  const diff = (process.hrtime.bigint() - begin) / 1000000n;
  console.log('Time(ms):', diff.toString());
})();
