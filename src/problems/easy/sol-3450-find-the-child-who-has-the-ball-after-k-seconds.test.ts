/**
3450 - find-the-child-who-has-the-ball-after-k-seconds - https://leetcode.com/problems/find-the-child-who-has-the-ball-after-k-seconds/description/

given n, k:
you have array [0, 1, ..., n-1]

Initially, child 0 holds a ball and the direction of passing the ball is towards the right direction. 
After each second, the child holding the ball passes it to the child next to them. Once the ball reaches **either** end of the line, i.e. child 0 or child `n - 1`, the direction of passing is **reversed**.

Return the number of the child who receives the ball after `k` seconds.

**Note:** This question is the same as [2582: Pass the Pillow.](https://leetcode.com/problems/pass-the-pillow/description/)
*/
import { describe, expect, it } from "vitest";

function numberOfChild(n: number, k: number): number {
  const reverseCount = 2 * (n - 1);

  const position = k % reverseCount;

  if (position < n) {
    return position;
  }

  return 2 * (n - 1) - position;
}

describe("3450 - find-the-child-who-has-the-ball-after-k-seconds", () => {
  it("case-1", () => {
    expect(numberOfChild(3, 5)).toBe(1);
  });

  it("case-2", () => {
    expect(numberOfChild(5, 6)).toBe(2);
  });

  it("case-3", () => {
    expect(numberOfChild(4, 2)).toBe(2);
  });
});
