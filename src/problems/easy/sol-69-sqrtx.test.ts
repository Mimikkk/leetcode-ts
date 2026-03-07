/**
69 - sqrtx - https://leetcode.com/problems/sqrtx/description/

Given a non-negative integer `x`, return _the square root of_ `x` _rounded down to the nearest integer_. 
The returned integer should be **non-negative** as well.
*/
import { describe, expect, it } from "vitest";

function mySqrt(x: number): number {
  let low = 0;
  let high = Math.log2(x) + 1;

  while (low <= high) {
    let mid = ~~(low + (high - low) / 2);
    let val = mid * mid;

    if (val === x) {
      return mid;
    }

    if (val < x) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return high;
}

describe("69 - sqrtx", () => {
  it("case-1", () => {
    expect(mySqrt(4)).toBe(2);
  });

  it("case-2", () => {
    expect(mySqrt(8)).toBe(2);
  });

  it("case-3", () => {
    expect(mySqrt(16)).toBe(4);
  });

  it("case-4", () => {
    expect(mySqrt(25)).toBe(5);
  });

  it("case-5", () => {
    expect(mySqrt(3)).toBe(1);
  });

  it("case-6", () => {
    expect(mySqrt(10)).toBe(3);
  });

  it("case-7", () => {
    expect(mySqrt(11)).toBe(3);
  });

  it("case-8", () => {
    expect(mySqrt(12)).toBe(3);
  });

  it("case-9", () => {
    expect(mySqrt(13)).toBe(3);
  });

  it("case-10", () => {
    expect(mySqrt(14)).toBe(3);
  });

  it("case-11", () => {
    expect(mySqrt(15)).toBe(3);
  });

  it("case-12", () => {
    expect(mySqrt(16)).toBe(4);
  });
});
