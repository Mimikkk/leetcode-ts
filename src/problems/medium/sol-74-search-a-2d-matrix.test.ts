/**
74 - search-a-2d-matrix - https://leetcode.com/problems/search-a-2d-matrix/description/

given m x n mat:
- matrix is sorted non-desc

You must write a solution in `O(log(m * n))` time complexity.

sol:
binary search
*/
import { describe, expect, it } from "vitest";
function searchMatrix(matrix: number[][], target: number): boolean {
  const n = matrix.length;
  const m = matrix[0]?.length ?? 0;

  const readValue = (offset: number): number => matrix[~~(offset / m)]![offset % m]!;

  let low = 0;
  let high = n * m - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const val = readValue(mid);

    if (val === target) {
      return true;
    }

    if (val < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return false;
}

describe("74 - search-a-2d-matrix", () => {
  it("case-1", () => {
    expect(
      searchMatrix(
        [
          [1, 3, 5, 7],
          [10, 11, 16, 20],
          [23, 30, 34, 60],
        ],
        3,
      ),
    ).toBe(true);
  });

  it("case-2", () => {
    expect(
      searchMatrix(
        [
          [1, 3, 5, 7],
          [10, 11, 16, 20],
          [23, 30, 34, 60],
        ],
        13,
      ),
    ).toBe(false);
  });

  it("case-3", () => {
    expect(searchMatrix([[1], [3]], 3)).toBe(true);
  });
});
