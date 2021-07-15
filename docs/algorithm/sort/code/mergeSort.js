/**
 * 归并排序
 * @param {*} arr
 * 归并排序是一种【分而治之】算法。其思想是将原始数组切分成较小的数组，直到每个小数组只
 * 有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
 */

// 合操作
const merge = (left, right) => {
  const result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      // 左边第一个小 将左边第一个推出 然后push进result
      result.push(left.shift());
    } else {
      // 右边第一个小 将右边第一个推出 然后push进result
      result.push(right.shift());
    }
  }

  // 若循环完 left 或 right 还有其中一个不为空
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }

  return result;
};

export const mergeSort = arr => {
  if (arr.length === 1) return arr;
  const len = arr.length;
  const mid = Math.floor(len / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid, len));
  arr = merge(left, right)
  return arr;
};
