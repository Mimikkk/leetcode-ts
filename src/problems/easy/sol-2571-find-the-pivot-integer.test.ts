/**
2571 - find-the-pivot-integer - https://leetcode.com/problems/find-the-pivot-integer/description/

given n:
find the pivot integer x such that:
the sum of all elements between 1 and x inclusively equals the sum of all elements between x and n inclusively.
*/
import { describe, expect, it } from "vitest";

function pivotInteger(n: number): number {
  if (n < 1) return 0;

  const sums = Array.from<number>({ length: n });
  sums[0] = 1;

  for (let i = 1; i < n; ++i) {
    sums[i] = sums[i - 1] + i + 1;
  }

  for (let i = 0; i < n; ++i) {
    let leftSum = sums[i];
    let rightSum = sums[n - 1] + i + 1 - leftSum;

    if (leftSum === rightSum) {
      return i + 1;
    }
  }

  return -1;
}

describe("2571 - find-the-pivot-integer", () => {
  it("case-1", () => {
    expect(pivotInteger(8)).toBe(6);
  });

  it("case-2", () => {
    expect(pivotInteger(1)).toBe(1);
  });

  it("case-3", () => {
    expect(pivotInteger(4)).toBe(-1);
  });
});
