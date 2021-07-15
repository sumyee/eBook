Array.prototype.filter2 = function (callback, thisArg) {
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
      // 将满足条件的元素推入新数组
      if(callback.call(thisArg, O[k], k, O)) {
        res.push(O[k]);
      }
    }
    k++
  }

  // 返回这个新的数组
  return res;
}