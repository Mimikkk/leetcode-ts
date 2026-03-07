/**
3515 - find-if-digit-game-can-be-won - https://leetcode.com/problems/find-if-digit-game-can-be-won/description/

given nums:
Alice and Bob are playing a game. In the game, 
Alice can choose either all single-digit numbers or all double-digit numbers from nums, 
and the rest of the numbers are given to Bob. 
Alice wins if the sum of her numbers is strictly greater than the sum of Bob's numbers.

return true if Alice can win, otherwise return false.
*/
import { describe, expect, it } from "vitest";

function canAliceWin(nums: number[]): boolean {
  let singleDigitSum = 0;
  let doubleDigitSum = 0;

  for (const num of nums) {
    if (num < 10) {
      singleDigitSum += num;
    } else {
      doubleDigitSum += num;
    }
  }

  return singleDigitSum !== doubleDigitSum;
}

describe("3515 - find-if-digit-game-can-be-won", () => {
  it("case-1", () => {
    expect(canAliceWin([1, 2, 3, 4, 10])).toBe(false);
  });

  it("case-2", () => {
    expect(canAliceWin([1, 2, 3, 4, 5, 14])).toBe(true);
  });

  it("case-3", () => {
    expect(canAliceWin([5, 5, 5, 25])).toBe(true);
  });
});
