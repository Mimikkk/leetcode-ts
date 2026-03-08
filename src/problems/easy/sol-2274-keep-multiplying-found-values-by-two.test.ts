/**
2274 - keep-multiplying-found-values-by-two - https://leetcode.com/problems/keep-multiplying-found-values-by-two/description/

given nums:
and original:

do the following steps:

1.  If original is found in nums, multiply it by two (i.e., set original = 2 * original).
2.  Otherwise, stop the process.
3.  Repeat this process with the new number as long as you keep finding the number.

return the final value of original.
*/
import { describe, expect, it } from "vitest";

function findFinalValue(nums: number[], original: number): number {
  while (nums.includes(original)) {
    original = 2 * original;
  }

  return original;
}

describe("2274 - keep-multiplying-found-values-by-two", () => {
  it("case-1", () => {
    expect(findFinalValue([5, 3, 6, 1, 12], 3)).toBe(24);
  });

  it("case-2", () => {
    expect(findFinalValue([2, 7, 9], 4)).toBe(4);
  });

  it("case-3", () => {
    expect(findFinalValue([4, 3, 1, 6], 4)).toBe(8);
  });
});
