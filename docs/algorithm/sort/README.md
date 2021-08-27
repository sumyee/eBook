---
title: 排序算法
sidebar: auto
---
<!-- # 排序算法 -->

<!-- > 目录

> [[toc]] -->

**复杂度和稳定性**

| 排序算法 | 平均时间复杂度 | 最好         | 最坏         | 空间复杂度 | 稳定性 |
| -------- | -------------- | ------------ | ------------ | ---------- | ------ |
| 冒泡排序 | O(n^2)         | O(n)         | O(n^2)       | O(1)       | 稳定   |
| 选择排序 | O(n^2)         | O(n^2)       | O(n^2)       | O(1)       | 不稳定 |
| 堆排序   | O(n logn)      | O(n logn)    | O(n logn)    | O(1)       | 不稳定 |
| 插入排序 | O(n^2)         | O(n)         | O(n^2)       | O(1)       | 稳定   |
| 希尔排序 | O(n logn)      | O(n log^2 n) | O(n log^2 n) | O(1)       | 不稳定 |
| 快速排序 | O(n logn)      | O(n logn)    | O(n^2)       | O(logn)    | 不稳定 |
| 归并排序 | O(n logn)      | O(n logn)    | O(n logn)    | O(n)       | 稳定   |
| 计数排序 | O(n+k)         | O(n+k)       | O(n+k)       | O(k)       | 稳定   |
| 桶排序   | O(n+k)         | O(n+k)       | O(n^2)       | O(n+k)     | 稳定   |
| 基数排序 | O(n*k)         | O(n*k)       | O(n*k)       | O(n+k)     | 稳定   |

## 冒泡排序

:::tip 大致流程：

1. 从第一个元素开始，比较每两个相邻元素，如果前者大，就交换位置
2. 每次遍历结束，能够找到该次遍历过的元素中的最大值
3. 如果还有没排序过的元素，继续1

:::

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/29/169c901fbe75639b~tplv-t2oaga2asx-watermark.awebp)

@[code js](./code/bubbleSort.js)

## 插入排序

:::tip 大致流程：

1. 取未排序部分的第一个元素。第一次遍历时，将第一个元素作为已排序元素，从第二个元素开始取
2. 遍历前面的已排序元素，并与这个未排序元素比较大小，找到合适的位置插入
3. 继续执行1

:::

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/29/169c90490e012c32~tplv-t2oaga2asx-watermark.awebp)

@[code js](./code/insertionSort.js)

## 选择排序

:::tip 大致流程：

1. 取出未排序部分的第一个元素，遍历该元素之后的部分并比较大小。对于第一次遍历，就是取出第一个元素
2. 如果有更小的，与该元素交换位置
3. 每次遍历都能找出剩余元素中的最小值并放在已排序部分的最后

:::

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/29/169c903684fff481~tplv-t2oaga2asx-watermark.awebp)

@[code js](./code/selectionSort.js)

## 快速排序

:::tip 大致流程：

1. 选择一个基准元素 `pivot`，比如第一个元素（当然可以选其他元素，但是最后会递归至只剩一个元素，所以还是选第一个元素比较靠谱）
2. 遍历数组，比 `pivot` 更小的元素创建一个数组，更大的创建一个数组，相等的也创建一个数组
3. 递归大小两个数组，继续执行1，直到数组只剩1个元素；递归的同时把这三部分连接起来

:::

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/29/169c905b1f546876~tplv-t2oaga2asx-watermark.awebp)

@[code js](./code/quickSort.js)

## 归并排序

:::tip 大致流程：

1. 递归地把数组分割成前后两个子数组，**直到数组中只有1个元素**
2. 同时，递归地从两个数组中挨个取元素，比较大小并合并

:::

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/29/169c9064a8f19b76~tplv-t2oaga2asx-watermark.awebp)

@[code js](./code/mergeSort.js)