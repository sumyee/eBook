Array.prototype.every2 = function (callback, thisArg) {
  if(this == null) {
    throw new TypeError('this is null or not defined')
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this)

  const len = O.length >>> 0


  let k = 0;


  while(k < len) {
    if(k in O) {
      // 如果有不满足条件，返回 false
      if(!callback.call(thisArg, O[k], k, O)) {
        return false;
      }
    }
    k++
  }

  // 所有都满足条件 返回 true
  return true;
}