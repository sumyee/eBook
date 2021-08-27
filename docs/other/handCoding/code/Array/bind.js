Function.prototype.bind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }

  const self = this;

  return function F() {
    // 如果是 new 的情况
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }

    return self.call(context, ...args, ...arguments);
  };
};
