/**
 * 冒泡排序
 * @param {*} arr 排序的数组
 * 冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。
 */
export const bubbleSort = (arr) => {
  // 控制遍历次数
  for (let i = arr.length; i > 0; i--) {
    // 每次遍历后 缩小遍历范围
    for (let j = 0; j < i; j++) {
      if(arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }

  return arr
}