/**
45 - jump-game-ii - https://leetcode.com/problems/jump-game-ii/description/

given nums with values representing maximum offset it can move
minimize jumps to reach the end.

**Example 1:**

**Input:** nums = \[2,3,1,1,4\]
**Output:** 2
**Explanation:** The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Example 2:**

**Input:** nums = \[2,3,0,1,4\]
**Output:** 2
*/

import { describe, expect, it } from "vitest";

function jump(nums: number[]): number {
  let count = 0;

  let activeBoundary = 0;
  let maxBoundary = 0;

  for (let i = 0; i < nums.length - 1; ++i) {
    maxBoundary = Math.max(maxBoundary, i + nums[i]!);

    if (i === activeBoundary) {
      count++;
      activeBoundary = maxBoundary;
    }
  }

  return count;
}

describe("45 - jump-game-ii", () => {
  it("case-1", () => {
    expect(jump([2, 3, 1, 1, 4])).toBe(2);
  });

  it("case-2", () => {
    expect(jump([2, 3, 0, 1, 4])).toBe(2);
  });
});
