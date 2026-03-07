/**
25 - reverse-nodes-in-k-group - https://leetcode.com/problems/reverse-nodes-in-k-group/description/

Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return _the modified list_.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg)

**Input:** head = \[1,2,3,4,5\], k = 2
**Output:** \[2,1,4,3,5\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg)

**Input:** head = \[1,2,3,4,5\], k = 3
**Output:** \[3,2,1,4,5\]

**Constraints:**

*   The number of nodes in the list is `n`.
*   `1 <= k <= n <= 5000`
*   `0 <= Node.val <= 1000`

**Follow-up:** Can you solve the problem in `O(1)` extra memory space?
*/
import { ListNode } from "@core/listnode.js";
import { describe, expect, it } from "vitest";

function reverseKGroup(node: ListNode | null, k: number): ListNode | null {
  if (!node) return node;
  const values = Array.from<number>({ length: k });
  let n = 0;

  let root = node;
  let prev = node;

  while (prev) {
    node = prev;

    while (node && n < k) {
      values[n++] = node.val;
      node = node.next;
    }

    if (n < k) break;

    node = prev;
    while (n > 0) {
      node!.val = values[--n]!;
      node = node!.next;
    }

    prev = node!;
  }

  return root;
}

describe("25 - reverse-nodes-in-k-group", () => {
  it("case-1", () => {
    expect(reverseKGroup(ListNode.fromArray([1, 2, 3, 4, 5]), 2)?.toArray()).toEqual([2, 1, 4, 3, 5]);
  });

  it("case-2", () => {
    expect(reverseKGroup(ListNode.fromArray([1, 2, 3, 4, 5]), 3)?.toArray()).toEqual([3, 2, 1, 4, 5]);
  });
});
