/**
111 - minimum-depth-of-binary-tree - https://leetcode.com/problems/minimum-depth-of-binary-tree/description/

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note:** A leaf is a node with no children.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg)

**Input:*`* `root = \[3,9,20,null,null,15,7\]
**Output:** 2

**Example 2:**

**Input:** root = \[2,null,3,null,4,null,5,null,6\]
**Output:** 5

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 105]`.
*   `-1000 <= Node.val <= 1000`
*/
import { describe, expect, it } from "vitest";
import { TreeNode } from "../../core/TreeNode.js";

function minDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let depth = 1;

  let level = [root];
  while (level.length) {
    const next: TreeNode[] = [];

    for (const node of level) {
      if (!node?.left && !node?.right) {
        return depth;
      }

      if (node?.left) {
        next.push(node.left);
      }

      if (node?.right) {
        next.push(node.right);
      }
    }

    level = next;
    ++depth;
  }

  return depth;
}

describe("111 - minimum-depth-of-binary-tree", () => {
  it("case-1", () => {
    expect(minDepth(TreeNode.fromArray([3, 9, 20, null, null, 15, 7]))).toBe(2);
  });

  it("case-2", () => {
    expect(minDepth(TreeNode.fromArray([2, null, 3, null, 4, null, 5, null, 6]))).toBe(5);
  });
});
