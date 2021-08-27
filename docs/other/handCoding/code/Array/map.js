Array.prototype.map2 = function (callback, thisArg) {
  if(this == null) {
    throw new TypeError('this is null or not defined')
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this)

  const len = O.length >>> 0


  let k = 0;

  // 基于forEach,增加一个新的数组
  let res = [];

  while(k < len) {
    if(k in O) {
      // 保存回调函数的返回值，组成新的数组
      res[k] = callback.call(thisArg, O[k], k, O)
    }
    k++
  }

  // 返回这个新的数组
  return res;
}