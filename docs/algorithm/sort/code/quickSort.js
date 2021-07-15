/**
 * 快速排序
 * @param {*} arr
 * 
 * http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
 */
export const quickSort = arr => {
  if (arr.length <= 1) return arr;
  const pivot = arr.splice(Math.floor(arr.length / 2), 1)[0]
  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};
