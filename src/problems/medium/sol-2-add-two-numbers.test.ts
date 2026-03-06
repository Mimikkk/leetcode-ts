/**
2 - add-two-numbers - https://leetcode.com/problems/add-two-numbers/description/

given:
a: linked-node<int>, b: linked-node<int>
constraint:
nodes stored in reversed order
[1,2,3] -> 321 
[1,3,4] + [0,0,9] -> [1,1,3,1] -> 1311
return:
sum of the numbers in order
*/
import { describe, expect, it } from "vitest";

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!l1 || !l2) return null;

  const root = new ListNode(0);
  let node = root;

  let overflow = 0;
  while (l1 || l2) {
    const v1 = l1?.val ?? 0;
    const v2 = l2?.val ?? 0;

    let sum = v1 + v2 + overflow;
    overflow = 0;

    if (sum >= 10) {
      const val = ~~(sum / 10);
      sum = sum % 10;
      overflow = val;
    }

    const next = new ListNode(sum);
    node.next = next;
    node = next;

    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }

  if (overflow > 0) {
    const next = new ListNode(overflow);
    node.next = next;
    node = next;
  }

  return root.next;
}

describe("2 - add-two-numbers", () => {
  const createList = (values: number[]): ListNode | null => {
    if (values.length === 0) return null;
    const head = new ListNode(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
      current.next = new ListNode(values[i]);
      current = current.next;
    }
    return head;
  };
  const readList = (node: ListNode | null): number[] => {
    const values: number[] = [];
    let current = node;
    while (current) {
      values.push(current.val);
      current = current.next;
    }
    return values;
  };

  it("case-1", () => {
    expect(readList(addTwoNumbers(createList([1, 2, 3]), createList([1, 2, 3])))).toEqual([2, 4, 6]);
  });

  it("case-2", () => {
    expect(readList(addTwoNumbers(createList([2, 3, 3]), createList([5, 6, 4])))).toEqual([7, 9, 7]);
    expect(readList(addTwoNumbers(createList([2, 4, 3]), createList([5, 6, 4])))).toEqual([7, 0, 8]);
    expect(readList(addTwoNumbers(createList([2, 5, 3]), createList([5, 6, 4])))).toEqual([7, 1, 8]);
    expect(readList(addTwoNumbers(createList([2, 6, 3]), createList([5, 6, 4])))).toEqual([7, 2, 8]);
  });

  it("case-3", () => {
    expect(readList(addTwoNumbers(createList([1, 3, 3]), createList([0, 0, 9])))).toEqual([1, 3, 2, 1]);
  });
});
