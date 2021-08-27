/**
 * 按 A+ 规范 实现 Promise
 * https://promisesaplus.com/
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// resolve Promise
const resolvePromise = (promise2, x, resolve, reject) => {
  // 判断 promise2 和 x 是否同一个
  // 同一个 直接抛错
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    );
  }
  let called; // 处理 成功 和 失败 都被调用的情况，防止多次调用
  // 判断 x 是否 对象 或 函数
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 兼容 A+ 规范
    try {
      const then = x.then;
      if (typeof then === 'function') {
        // 有 then 可能是 promise，
        // 采用执行结果 向下传递
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // y 可能还是 promise，递归处理直到解析出来的结果是普通值
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 可能是个普通值，直接成功
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 普通值 直接成功返回
    resolve(x);
  }
};

const isPromise = (value) => {
  if (
    typeof value === 'function' ||
    (typeof value === 'object' && value !== null)
  ) {
    if (value.then) {
      return true;
    }
  } else {
    return false;
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    // resolve 状态回调数组
    this.onResolvedCallbacks = [];
    // reject 状态回调数组
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        this.onResolvedCallbacks.forEach((cb) => cb());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  }

  /**
   * setTimeout 异步模拟微任务（因为无法实现微任务）
   */
  then(onFulfilled, onRejected) {
    // 透传
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    // then 可链式调用， 且传递的是一个 Promise。所以这里返回一个新的 Promise 进行传递
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      // 异步时调用 then 的时候状态还是 PENDING
      // （链式调用时，新的状态也是 PENDING）
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  // 捕获前面 onFulfilled / onRejected 抛出的异常
  catch(onReject) {
    return this.then(null, onReject);
  }

  // finally
  finally() {
    return this.then(
      (value) => Promise.resolve(cb()).then(() => value),
      (reason) =>
        Promise.resolve(cb()).then(() => {
          throw reason;
        })
    );
  }

  // resolve
  static resolve(value) {
    // 如果传入的是 Promise 实例 直接返回
    if (value instanceof Promise) {
      return value;
    }
    return new Promise((resolve) => {
      resolve(value);
    });
  }

  // reject
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  /**
   * all （Promise.all 调用）
   * 当传入的数组里所有promise状态都变成fulfilled的时候，resolve
   * 否则 reject
   * @param {Array} promises
   * @returns Promise 实例
   */
  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let values = [];
      const processData = (k, v) => {
        values[k] = v;
        count++;
        // 结果数组长度等于执行了所有 promise 计数时，代表全部都已有结果
        if (values.length === count) {
          resolve(values);
        }
      };
      promises.forEach((promise, i) => {
        if (isPromise(promise)) {
          // 收集每个 promise 的resolve 状态，并计数
          promise.then((value) => {
            processData(i, value);
          }, reject);
        } else {
          processData(i, promise);
        }
      });
    });
  }

  /**
   * race (Prommise.race)
   * 有其中一个状态改变时，立即返回状态
   * @param {Array} promises
   * @returns Promise 实例
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p) => {
        p.then(resolve, reject);
      });
    });
  }
}

// promises-aplus-tests 测试是否符合 promise A+规范
Promise.defer = Promise.deferred = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
