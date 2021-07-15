/**
 * 数组拍平
 * @param {Array} arr
 */

// es5
function flatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

// es6
function flatten(arr) {
  while (arr.some(i => Array.isArray(i))) {
    arr = [].concat(...arr);
  }

  return arr;
}
