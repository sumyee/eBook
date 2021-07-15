/**
 * -------- new 操作符 过程 ------------
 * (1) 在内存中创建一个新对象。
 * (2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
 * (3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
 * (4) 执行构造函数内部的代码（给新对象添加属性）。
 * (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。
 */

function newOperator(ctor, ...args) {
  // 在内存中创建一个新对象。
  const obj = {};

  // 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
  obj.__proto__ = ctor.prototype;

  // 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
  // 执行构造函数内部的代码（给新对象添加属性）。
  const result = ctor.aplly(obj, args);

  // 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象
  // （如果构造函数返回值为 【引用类型】则直接返回构造函数返回值，否则返回新创建的对象）
  if ((result && typeof result === 'object') || typeof result === 'function') {
    return result;
  }
  return obj;
}

function newFn(ctor, ...args) {
  const obj = Object.create(ctor);

  const result = ctor.aplly(obj, args);

  if ((result && typeof result === 'object') || typeof result === 'function') {
    return result;
  }

  return obj;
}
