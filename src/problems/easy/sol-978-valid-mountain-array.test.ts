/**
978 - valid-mountain-array - https://leetcode.com/problems/valid-mountain-array/description/

given arr:
return true if and only if it is a valid mountain array.

a mountain array is an array that:
- has at least 3 elements
- has a peak element
- the peak element is not the first or last element
- the elements before the peak are in ascending order
- the elements after the peak are in descending order
*/
import { describe, expect, it } from "vitest";

function validMountainArray(arr: number[]): boolean {
  const n = arr.length;
  if (n < 3) return false;

  let i = 0;
  while (i + 1 < n && arr[i] < arr[i + 1]) ++i;
  if (i === 0 || i === n - 1) return false;
  while (i + 1 < n && arr[i] > arr[i + 1]) ++i;

  return i === n - 1;
}

describe("978 - valid-mountain-array", () => {
  it("case-1", () => {
    expect(validMountainArray([2, 1])).toBe(false);
  });

  it("case-2", () => {
    expect(validMountainArray([3, 5, 5])).toBe(false);
  });

  it("case-3", () => {
    expect(validMountainArray([0, 3, 2, 1])).toBe(true);
  });
});
