/**
 * 选择排序
 * @param {*} arr
 * 选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并
 * 将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。
 */
 export const selectionSort = arr => {
  let indexMin;
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    indexMin = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[indexMin]) {
        indexMin = j;
      }
    }
    if (indexMin !== i) {
      const temp = arr[indexMin];
      arr[indexMin] = arr[i];
      arr[i] = temp;
    }
  }
  return arr;
};

