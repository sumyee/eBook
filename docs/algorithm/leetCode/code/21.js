/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let curr = new ListNode();

  // dummy 用于最后返回合并的链表
  let dummy = curr;

  // 如果两个链表都没有走完，就判断大小添加到新的合并链表
  // 新合并链表的当前指针也要往后移动才能继续添加新的节点
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  /**
   * 如果 l1 / l2 没有走完，代表 l1 / l2 后面所有的节点都大于当前合并链表的最大节点，
   * 把 l1 / l2 剩余节点直接添加新链表即可
   */

  if (l1 !== null) {
    curr.next = l1;
  }

  if (l2 !== null) {
    curr.next = l2;
  }

  // dummy.next 才是整个链表
  return dummy.next;
};
