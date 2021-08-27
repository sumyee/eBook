/**
 * 防抖
 * 触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时。
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate 立即执行
 * @returns
 */

// 简单版
function debounce(fn, wait) {
  let timer = null;

  return function () {
    const args = arguments;
    const context = this;

    clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}

// 可立即执行、可取消 版
function debounce(func, wait, immediate) {
  let timer, result;

  var debounced = function () {
    const context = this;
    const args = arguments;

    if (timer) clearTimeout(timer);

    if (immediate) {
      // 是否执行过
      const called = timer;
      // 等待 wait 秒后才可再次触发函数执行
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      // 如果没执行过，立即执行
      if (!called) {
        result = func.apply(context, args);
      }
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }

    // 返回函数执行结果
    return result;
  };

  // 取消方法
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
const fn = (a) => {
  console.log(a);
};
const de = debounce(fn, 1000);
de(23333333);
