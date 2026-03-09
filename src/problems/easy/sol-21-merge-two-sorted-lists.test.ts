/**
21 - merge-two-sorted-lists - https://leetcode.com/problems/merge-two-sorted-lists/description/

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return _the head of the merged linked list_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

**Input:** list1 = \[1,2,4\], list2 = \[1,3,4\]
**Output:** \[1,1,2,3,4,4\]

**Example 2:**

**Input:** list1 = \[\], list2 = \[\]
**Output:** \[\]

**Example 3:**

**Input:** list1 = \[\], list2 = \[0\]
**Output:** \[0\]

**Constraints:**

*   The number of nodes in both lists is in the range `[0, 50]`.
*   `-100 <= Node.val <= 100`
*   Both `list1` and `list2` are sorted in **non-decreasing** order.
*/
import { ListNode } from "@core/ListNode.js";
import { describe, expect, it } from "vitest";

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (!list1 && !list2) {
    return null;
  }

  const root = new ListNode(0);
  let head = root as ListNode;

  // a: 1 -> 3
  // b: 2
  // c: 1 -> 2 -> 3
  while (list1 && list2) {
    const a = list1.val;
    const b = list2.val;

    if (a < b) {
      head.next = new ListNode(a);
      head = head.next;
      list1 = list1.next;
    } else {
      head.next = new ListNode(b);
      head = head.next;
      list2 = list2.next;
    }
  }

  while (list1) {
    head.next = new ListNode(list1.val);
    head = head.next;
    list1 = list1.next;
  }

  while (list2) {
    head.next = new ListNode(list2.val);
    head = head.next;
    list2 = list2.next;
  }

  return root.next;
}

describe("21 - merge-two-sorted-lists", () => {
  it("case-1", () => {
    expect(mergeTwoLists(ListNode.fromArray([1, 2, 4]), ListNode.fromArray([1, 3, 4]))?.toArray()).toEqual([
      1, 1, 2, 3, 4, 4,
    ]);
  });

  it("case-2", () => {
    expect(mergeTwoLists(ListNode.fromArray([]), ListNode.fromArray([]))?.toArray()).toEqual(undefined);
  });

  it("case-3", () => {
    expect(mergeTwoLists(ListNode.fromArray([]), ListNode.fromArray([0]))?.toArray()).toEqual([0]);
  });
});
