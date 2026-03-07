/**
54 - spiral-matrix - https://leetcode.com/problems/spiral-matrix/description/

Given an `m x n` `matrix`, return _all elements of the_ `matrix` _in spiral order_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg)

**Input:** matrix = \[\[1,2,3\],\[4,5,6\],\[7,8,9\]\]
**Output:** \[1,2,3,6,9,8,7,4,5\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg)

**Input:** matrix = \[\[1,2,3,4\],\[5,6,7,8\],\[9,10,11,12\]\]
**Output:** \[1,2,3,4,8,12,11,10,9,5,6,7\]

**Constraints:**

*   `m == matrix.length`
*   `n == matrix[i].length`
*   `1 <= m, n <= 10`
*   `-100 <= matrix[i][j] <= 100`
*/
import { describe, expect, it } from "vitest";

function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length === 0) return [];

  const result: number[] = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0]!.length - 1;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; ++col) {
      result.push(matrix[top]![col]!);
    }
    ++top;

    for (let row = top; row <= bottom; ++row) {
      result.push(matrix[row]![right]!);
    }
    --right;

    if (top > bottom) break;
    for (let col = right; col >= left; --col) {
      result.push(matrix[bottom]![col]!);
    }
    --bottom;

    if (left > right) break;
    for (let row = bottom; row >= top; --row) {
      result.push(matrix[row]![left]!);
    }
    ++left;
  }

  return result;
}

describe("54 - spiral-matrix", () => {
  it("case-1", () => {
    expect(
      spiralOrder([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]),
    ).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
  });

  it("case-2", () => {
    expect(
      spiralOrder([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ]),
    ).toEqual([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
  });

  it("case-3", () => {
    expect(spiralOrder([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
  });
});
