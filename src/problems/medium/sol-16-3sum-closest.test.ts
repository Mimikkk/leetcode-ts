/**
16 - 3sum-closest - https://leetcode.com/problems/3sum-closest/description/

Given an integer array `nums` of length `n` and an integer `target`, find three integers at **distinct indices** in `nums` such that the sum is closest to `target`.

Return _the sum of the three integers_.

You may assume that each input would have exactly one solution.

**Example 1:**

**Input:** nums = \[-1,2,1,-4\], target = 1
**Output:** 2
**Explanation:** The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

**Example 2:**

**Input:** nums = \[0,0,0\], target = 1
**Output:** 0
**Explanation:** The sum that is closest to the target is 0. (0 + 0 + 0 = 0).

**Constraints:**

*   `3 <= nums.length <= 500`
*   `-1000 <= nums[i] <= 1000`
*   `-104 <= target <= 104`
*/
import { describe, expect, it } from "vitest";

function threeSumClosest(nums: number[], target: number): number {
  let closestSum = nums[0]! + nums[1]! + nums[2]!;
  let closestDifference = Infinity;
  nums = nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i]! + nums[left]! + nums[right]!;
      const difference = Math.abs(sum - target);

      if (difference < closestDifference) {
        closestSum = sum;
        closestDifference = difference;
      }

      if (sum > target) {
        --right;
      } else if (sum < target) {
        ++left;
      } else {
        return target;
      }
    }
  }

  return closestSum;
}

describe("16 - 3sum-closest", () => {
  it("case-1", () => {
    expect(threeSumClosest([-1, 2, 1, -4], 1)).toBe(2);
  });
  it("case-2", () => {
    expect(threeSumClosest([0, 0, 0], 1)).toBe(0);
  });
  it("case-3", () => {
    expect(threeSumClosest([1, 1, 1, 1], 3)).toBe(3);
  });
  it("case-4", () => {
    expect(threeSumClosest([1, 1, 1, 1], 3)).toBe(3);
  });
});
