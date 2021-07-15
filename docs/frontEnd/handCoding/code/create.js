/**
 * 实现 Object.create
 * @param {*} proto 
 * @param {*} propertyObject 
 * @returns 
 */
function create(proto, propertyObject = undefined) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null.');
  }
  if (propertyObject == null) {
    new TypeError('Cannot convert undefined or null to object');
  }

  // 原型继承
  function F() {}
  F.prototype = proto;
  const obj = new F();

  // 第二个参数是 新对象定义额外属性的对象
  if (propertyObject) {
    Object.defineProperty(obj, propertyObject);
  }
  // Object.create(null) 是一个没有原型的对象
  // 所以如果参数是 null 则设置隐式原型为 null
  if (proto === null) {
    obj.__proto__ = null;
  }

  return obj;
}


console.log(create(null));
console.log(create({}));
console.log(create([]));