/**
2122 - count-special-quadruplets - https://leetcode.com/problems/count-special-quadruplets/description/

given nums:
count distinct quadruplets
where a < b < c < d
*/
import { describe, expect, it } from "vitest";

function countQuadruplets(nums: number[]): number {
  let result = 0;

  const n = nums.length;
  for (let i = 0; i < n; ++i) {
    const a = nums[i]!;
    for (let j = i + 1; j < n; ++j) {
      const b = nums[j]!;
      for (let k = j + 1; k < n; ++k) {
        const c = nums[k]!;
        for (let l = k + 1; l < n; ++l) {
          const d = nums[l]!;
          if (a + b + c !== d) continue;
          ++result;
        }
      }
    }
  }

  return result;
}

describe("2122 - count-special-quadruplets", () => {
  it("case-1", () => {
    expect(countQuadruplets([1, 2, 3, 6])).toBe(1);
  });
  it("case-2", () => {
    expect(countQuadruplets([3, 3, 6, 4, 5])).toBe(0);
  });
  it("case-3", () => {
    expect(countQuadruplets([1, 1, 1, 3, 5])).toBe(4);
  });
});
