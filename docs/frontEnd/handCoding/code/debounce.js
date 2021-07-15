/**
 * 防抖
 * 触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时。
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate 立即执行
 * @returns
 */
function debounce(func, wait, immediate) {
  let timer;

  var debounced = function () {
    const context = this;
    const args = arguments;

    if (timer) clearTimeout(timer);

    if (immediate) {
      // 是否执行过
      const called = timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      // 如果没执行过，立即执行
      if (!called) func.apply(context, args);
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };

  return debounced;
}
const fn = a => {
  console.log(a);
};
const de = debounce(fn, 1000);
de(23333333);
