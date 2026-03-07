/**
3429 - special-array-i - https://leetcode.com/problems/special-array-i/description/

given nums:
An array is considered special if the parity of every pair of adjacent elements is different. 
In other words, one element in each pair must be even, and the other must be odd.

return true if nums is a special array, otherwise return false.

**Example 2:**

**Input:** nums = \[2,1,4\]

**Output:** true

**Explanation:**

There is only two pairs: `(2,1)` and `(1,4)`, and both of them contain numbers with different parity. So the answer is `true`.

**Example 3:**

**Input:** nums = \[4,3,1,6\]

**Output:** false

**Explanation:**

`nums[1]` and `nums[2]` are both odd. So the answer is `false`.

**Constraints:**

*   `1 <= nums.length <= 100`
*   `1 <= nums[i] <= 100`
*/
import { describe, expect, it } from "vitest";

function isArraySpecial(nums: number[]): boolean {
  const n = nums.length - 1;

  for (let i = 0; i < n; ++i) {
    const valueA = nums[i];
    const valueB = nums[i + 1];
    if ((valueA & 1) === (valueB & 1)) {
      return false;
    }
  }

  return true;
}

describe("3429 - special-array-i", () => {
  it("case-1", () => {
    expect(isArraySpecial([1])).toBe(true);
  });

  it("case-2", () => {
    expect(isArraySpecial([2, 1, 4])).toBe(true);
  });

  it("case-3", () => {
    expect(isArraySpecial([4, 3, 1, 6])).toBe(false);
  });
});
