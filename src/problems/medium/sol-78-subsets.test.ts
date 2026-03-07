/**
78 - subsets - https://leetcode.com/problems/subsets/description/

Given an integer array `nums` of **unique** elements, return _all possible_ _subsets_ _(the power set)_.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

**Example 1:**

**Input:** nums = \[1,2,3\]
**Output:** \[\[\],\[1\],\[2\],\[1,2\],\[3\],\[1,3\],\[2,3\],\[1,2,3\]\]

**Example 2:**

**Input:** nums = \[0\]
**Output:** \[\[\],\[0\]\]

**Constraints:**

*   `1 <= nums.length <= 10`
*   `-10 <= nums[i] <= 10`
*   All the numbers of `nums` are **unique**.
*/
import { describe, expect, it } from "vitest";

function subsets(nums: number[]): number[][] {
  const result: number[][] = [];

  const size = Math.pow(2, nums.length);

  for (let i = 0; i < size; ++i) {
    const level: number[] = [];

    let val = i;
    for (let j = 0; j < nums.length; ++j) {
      if (val & 1) {
        level.push(nums[j]!);
      }

      val >>= 1;
    }

    result.push(level);
  }

  return result;
}

describe("78 - subsets", () => {
  it("case-1", () => {
    expect(subsets([1, 2, 3])).toEqual([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]);
  });
  it("case-2", () => {
    expect(subsets([0])).toEqual([[], [0]]);
  });
  it("case-3", () => {
    expect(subsets([1, 2])).toEqual([[], [1], [2], [1, 2]]);
  });
});
