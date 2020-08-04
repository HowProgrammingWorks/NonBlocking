'use strict';

(async () => {
  let k = 0;
  const timer = setInterval(() => k++, 10);
  const numbers = new Array(10000000).fill(1);
  let i = 0;
  for await (const number of numbers) {
    if (number) i++;
  }
  clearInterval(timer);
  console.dir({ i, k });
})();

