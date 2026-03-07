/**
88 - merge-sorted-array - https://leetcode.com/problems/merge-sorted-array/description/

given :
nums1, nums2 sorted in non-desc order
of m, n sizes
return :
merged nums in non-desc order

[1,2,3]
[2,5,6]
->
[1,2,2,3,5,6]
*/
import { describe, expect, it } from "vitest";

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (j >= 0) {
    if (i >= 0 && nums1[i]! > nums2[j]!) {
      nums1[k--] = nums1[i--]!;
    } else {
      nums1[k--] = nums2[j--]!;
    }
  }
}

describe("88 - merge-sorted-array", () => {
  it("case-1", () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    merge(nums1, 3, [2, 5, 6], 3);
    expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
  });

  it("case-2", () => {
    const nums1 = [0];
    merge(nums1, 0, [1], 1);
    expect(nums1).toEqual([1]);
  });
});
