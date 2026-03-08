/**
2791 - find-the-losers-of-the-circular-game - https://leetcode.com/problems/find-the-losers-of-the-circular-game/description/

given n: number and k: number:
list the losers of the circular game in ascending order.
where:
- forward move: (i + 1) % n
- 1st starts with the ball and passes the ball forward k-th times, next 2-k-th times, and so on
- ends when someone gets the ball for the second time
- losers are those who did not receive the ball at all. 
*/
import { describe, expect, it } from "vitest";

function circularGameLosers(n: number, k: number): number[] {
  let activeIndex = 0;
  let roundIndex = 1;
  const received = new Set<number>();
  while (!received.has(activeIndex)) {
    received.add(activeIndex);
    const nextIndex = (activeIndex + k * roundIndex) % n;
    activeIndex = nextIndex;

    ++roundIndex;
  }
  const result = [];

  for (let i = 0; i < n; i++) {
    if (!received.has(i)) {
      result.push(i + 1);
    }
  }

  return result;
}

describe("2791 - find-the-losers-of-the-circular-game", () => {
  it("case-1", () => {
    expect(circularGameLosers(5, 2)).toEqual([4, 5]);
  });

  it("case-2", () => {
    expect(circularGameLosers(4, 4)).toEqual([2, 3, 4]);
  });

  it("case-3", () => {
    expect(circularGameLosers(1, 1)).toEqual([]);
  });

  it("case-4", () => {
    expect(circularGameLosers(16, 1)).toEqual([]);
  });
});
