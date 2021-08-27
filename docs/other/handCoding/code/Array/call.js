Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }

  // 生成临时唯一 key，防止覆盖原有属性
  const fn = Symbol();
  context[fn] = this;

  const result = context[fn](...args);
  delete context[fn];

  return result;
};
