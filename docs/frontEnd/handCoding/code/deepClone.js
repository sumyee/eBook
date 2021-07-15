/**
 * 深克隆
 * @param {*} obj
 */

const isObject = target =>
  (typeof target === "object" || typeof target === "function") &&
  target !== null;

// const typeName = (target) => target.constructor.name
// const typeName = (target) => {
//   const res = Object.prototype.toString.call(target).split(' ')[1]
//   return res.substr(0, res.length - 1)
// }

function deepClone(target, map = new WeakMap()) {
  // 若已存在 返回目标
  if (map.has(target)) return target;

  // 获取目标构造函数
  const constructor = target.constructor;
  // 正则、日期类型 利用构造器创建新的元素返回
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    return new constructor(target);
  }

  // 递归引用类型
  if (isObject(target)) {
    // 为循环引用的对象做标记
    map.set(target, true);

    const newObj = Array.isArray(target) ? [] : {};

    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        newObj[key] = deepClone(target[key], map);
      }
    }

    return newObj;
  }

  return target;
}
