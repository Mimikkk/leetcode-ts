/**
4168 - mirror-distance-of-an-integer - https://leetcode.com/problems/mirror-distance-of-an-integer/description/

You are given an integer `n`.

Define its **mirror distance** as: `abs(n - reverse(n))`​​​​​​​ where `reverse(n)` is the integer formed by reversing the digits of `n`.

*   `reverse(25) = 52`.
*   Thus, the answer is `abs(25 - 52) = 27`.

**Example 2:**

**Input:** n = 10

**Output:** 9

**Explanation:**

*   `reverse(10) = 01` which is 1.
*   Thus, the answer is `abs(10 - 1) = 9`.

**Example 3:**

**Input:** n = 7

**Output:** 0

**Explanation:**

*   `reverse(7) = 7`.
*   Thus, the answer is `abs(7 - 7) = 0`.

**Constraints:**

*   `1 <= n <= 109`
*/
import { describe, expect, it } from "vitest";

function mirrorDistance(n: number): number {
  return Math.abs(n - +[...n.toString()].reverse().join(""));
}

describe("4168 - mirror-distance-of-an-integer", () => {
  it("case-1", () => {
    expect(mirrorDistance(25)).toBe(27);
  });
});
