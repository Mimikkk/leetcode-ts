/**
1833 - find-the-highest-altitude - https://leetcode.com/problems/find-the-highest-altitude/description/

given gain:
return the highest altitude of a point.

*/
import { describe, expect, it } from "vitest";

function largestAltitude(gain: number[]): number {
  let highest = 0;
  let current = 0;

  for (const value of gain) {
    current += value;
    if (current > highest) {
      highest = current;
    }
  }

  return highest;
}

describe("1833 - find-the-highest-altitude", () => {
  it("case-1", () => {
    expect(largestAltitude([-5, 1, 5, 0, -7])).toBe(1);
  });

  it("case-2", () => {
    expect(largestAltitude([-4, -3, -2, -1, 4, 3, 2])).toBe(0);
  });
});
