/**
374 - guess-number-higher-or-lower - https://leetcode.com/problems/guess-number-higher-or-lower/description/


I pick a number from `1` to `n`. 
You have to guess which number I picked (the number I picked stays the same throughout the game).

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API `int guess(int num)`, which returns three possible results:

*   `-1`: Your guess is higher than the number I picked (i.e. `num > pick`).
*   `1`: Your guess is lower than the number I picked (i.e. `num < pick`).
*   `0`: your guess is equal to the number I picked (i.e. `num == pick`).

Return _the number that I picked_.

**Example 1:**

**Input:** n = 10, pick = 6
**Output:** 6

**Example 2:**

**Input:** n = 1, pick = 1
**Output:** 1

**Example 3:**

**Input:** n = 2, pick = 1
**Output:** 1

**Constraints:**

*   `1 <= n <= 231 - 1`
*   `1 <= pick <= n`
*/
import { describe, expect, it } from "vitest";

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

interface Guess {
  (value: number): 0 | -1 | 1;
  value: number;
}

const guess = ((value) => {
  if (guess.value === value) return 0;
  return guess.value > value ? 1 : -1;
}) as Guess;

function guessNumber(n: number): number {
  let low = 1;
  let high = n;

  while (low < high) {
    let mid = ~~(low + (high - low) / 2);

    switch (guess(mid)) {
      case 0:
        return mid;
      case 1:
        low = mid + 1;
        break;
      case -1:
        high = mid - 1;
        break;
    }
  }

  return low;
}

describe("374 - guess-number-higher-or-lower", () => {
  it("case-1", () => {
    guess.value = 6;
    expect(guessNumber(10)).toBe(6);
  });

  it("case-2", () => {
    guess.value = 1;
    expect(guessNumber(1)).toBe(1);
  });

  it("case-3", () => {
    guess.value = 2;
    expect(guessNumber(2)).toBe(2);
  });

  it("case-4", () => {
    guess.value = 1233;
    expect(guessNumber(50000)).toBe(1233);
  });
});
