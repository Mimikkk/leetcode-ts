/**
3768 - check-if-digits-are-equal-in-string-after-operations-i - https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i/description/

You are given a string `s` consisting of digits. 
Perform the following operation repeatedly until the string has **exactly** two digits:

*   For each pair of consecutive digits in `s`, 
      starting from the first digit, calculate a new digit 
        as the sum of the two digits **modulo** 10.
*   Replace `s` with the sequence of newly calculated digits, 
      _maintaining the order_ in which they are computed.
      
Return `true` if the final two digits in `s` are the **same**; otherwise, return `false`.
*/
import { describe, expect, it } from "vitest";

function hasSameDigits(s: string): boolean {
  let values = [...s].map((r) => +r);

  while (values.length !== 2) {
    let next = [];
    for (let i = 1; i < values.length; ++i) {
      next.push((values[i] + values[i - 1]) % 10);
    }

    values = next;
  }

  return values[0] === values[1];
}

describe("3768 - check-if-digits-are-equal-in-string-after-operations-i", () => {
  it("case-1", () => {
    expect(hasSameDigits("3902")).toBe(true);
  });
  it("case-2", () => {
    expect(hasSameDigits("34789")).toBe(false);
  });
  it("case-3", () => {
    expect(hasSameDigits("11")).toBe(true);
  });
  it("case-4", () => {
    expect(hasSameDigits("1234567890")).toBe(false);
  });
});
