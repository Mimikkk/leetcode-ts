/**
35 - search-insert-position - https://leetcode.com/problems/search-insert-position/description/

Given a sorted array of distinct integers and a target value, 
return the index if the target is found. 
If not, return the index where it would be inserted in order.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

**Input:** nums = \[1,3,5,6\], target = 5
**Output:** 2

**Example 2:**

**Input:** nums = \[1,3,5,6\], target = 2
**Output:** 1

**Example 3:**

**Input:** nums = \[1,3,5,6\], target = 7
**Output:** 4

**Constraints:**

*   `1 <= nums.length <= 104`
*   `-104 <= nums[i] <= 104`
*   `nums` contains **distinct** values sorted in **ascending** order.
*   `-104 <= target <= 104`
*/
import { describe, expect, it } from "vitest";

function searchInsert(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length;

  while (low <= high) {
    let mid = ~~(low + (high - low) / 2);
    let val = nums[mid]!;

    if (val === target) {
      return mid;
    }

    if (val < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low;
}

describe("35 - search-insert-position", () => {
  it("case-1", () => {
    expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
  });

  it("case-2", () => {
    expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
  });

  it("case-3", () => {
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
  });
});
