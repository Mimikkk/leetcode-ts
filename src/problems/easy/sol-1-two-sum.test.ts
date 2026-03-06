/**
1 - Two Sum
Given nums and a target, find two num indices that sum to target
*/

import { describe, expect, it } from "vitest";

function twoSum(nums: number[], target: number): number[] {
  const n = nums.length;
  const m = n - 1;
  for (let i = 0; i < m; ++i) {
    const a = nums[i]!;

    for (let j = i + 1; j < n; ++j) {
      const b = nums[j]!;

      if (a + b !== target) continue;
      return [i, j];
    }
  }

  return [-1, -1];
}

describe("1 - two-sum", () => {
  it("case-1", () => {
    expect(twoSum([1, 2, 3], 3)).toEqual([0, 1]);
  });
});
