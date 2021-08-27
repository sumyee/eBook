/**
 * 柯里化
 * 柯里化就是把接受「多个参数」的函数变换成接受一个「单一参数」的函数，
 * 并且返回接受「余下参数」返回结果的一种应用。
 * @param {*} fn
 * @param  {...any} args
 */
function currying(fn, ...args) {
  console.log(fn, args);
  // fn.length 为 fn 的形参个数
  return fn.length > args.length
    ? (...arguments) => currying(fn, ...args, ...arguments)
    : fn(...args);
}
