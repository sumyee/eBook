---
title: LeetCode
sidebar: auto
---

## 1. 两数之和 [](https://leetcode-cn.com/problems/two-sum/)

> - 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
> - 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
> - 你可以按任意顺序返回答案。

###### 示例：

```markdown
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0,1] 。
```
###### 解题思路：

- 初始化一个`map = new Map()`
- 从第一个元素开始遍历`nums`
- 获取目标值与`nums[i]`的差值，即`k = target - nums[i]`，判断差值在`map`中是否存在
  - 不存在（`map.has(k)`为`false`）则将`nums[i]`加入到`nums`中（key 为`nums[i]`，value 为`i`，方便查找`map`中是否存在某值，并可通过`get`方法直接拿到下标）
  - 存在（`map.has(k)`）则返回`[map.get[k], i]`，求解结束
- 遍历结束，则`nums`中没有符合条件的两个数，返回`[]`

**时间复杂度： O(n)**

@[code js](./code/1.js)



## 21. 合并两个有序链表[](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

> 将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

###### 示例 ：

![img](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

```markdown
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

###### 解题思路：

- 遍历两个链表，按顺序比较，谁小就拼接谁，循环直到其中一个链表遍历完

@[code js](./code/21.js)