/**
24 - swap-nodes-in-pairs - https://leetcode.com/problems/swap-nodes-in-pairs/description/
Given a linked list, 
swap every two adjacent nodes and return its head. 
*/
import { ListNode } from "@core/listnode.js";
import { describe, expect, it } from "vitest";

function swapPairs(node: ListNode | null): ListNode | null {
  if (!node) return node;
  const root = node;

  while (node?.next) {
    const a: ListNode = node;
    const b: ListNode = node.next;
    const val = a.val;

    a.val = b.val;
    b.val = val;

    node = b.next;
  }

  return root;
}

describe("24 - swap-nodes-in-pairs", () => {
  it("case-1", () => {
    expect(swapPairs(ListNode.fromArray([1, 2, 3]))).toEqual(ListNode.fromArray([2, 1, 3]));
  });

  it("case-2", () => {
    expect(swapPairs(ListNode.fromArray([1, 2, 3, 4]))?.toArray()).toEqual([2, 1, 4, 3]);
  });
});
