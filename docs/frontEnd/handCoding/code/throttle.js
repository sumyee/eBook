/**
 * 节流
 * 持续触发事件，每隔一段时间，只执行一次事件。
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 */

// 时间戳版
// function throttle(func, wait, immediate) {
//   let previous = 0;

//   return function () {
//     const context = this;
//     const args = arguments;

//     const now = Date.now();

//     if (now - previous > wait) {
//       previous = now;
//       func.apply(context, args);
//     }
//   };
// }

// 定时器
// function throttle(func, wait) {
//   let timer;

//   return function () {
//     const context = this;
//     const args = arguments;

//     if(!timer) {
//       timer = setTimeout(() => {
//         timer = null;
//         func.apply(context, args);
//       }, wait);
//     }
//   };
// }

// 结合版
function throttle(fn, wait) {
  let timer = null;
  let startTime = 0;

  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();

    // 执行剩余时间
    const remaining = wait - (now - startTime);

    clearTimeout(timer);

    if (remaining <= 0) {
      fn.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  };
}

const fn = () => {
  console.log(Date.now());
};

const th = throttle(fn, 1000);

setInterval(th, 10);
