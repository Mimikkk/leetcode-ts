/**
3912 - hexadecimal-and-hexatrigesimal-conversion - https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion/description/

You are given an integer `n`.

Return the concatenation of the **hexadecimal** representation of `n2` and the **hexatrigesimal** representation of `n3`.

A **hexadecimal** number is defined as a base-16 numeral system that uses the digits `0 – 9` and the uppercase letters `A - F` to represent values from 0 to 15.

A **hexatrigesimal** number is defined as a base-36 numeral system that uses the digits `0 – 9` and the uppercase letters `A - Z` to represent values from 0 to 35.
*/
import { describe, expect, it } from "vitest";

const hexadecimalCharacters = "0123456789ABCDEF";
const hexatrigesimalCharacters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function toHexadecimalString(n: number): string {
  if (n === 0) return "0";
  let chars = [];

  while (n) {
    const mod = n % 16;
    const div = ~~(n / 16);
    const char = hexadecimalCharacters[mod];

    chars.push(char);

    n = div;
  }

  return chars.reverse().join("");
}

function toHexatrigesimalString(n: number): string {
  if (n === 0) return "0";
  let chars = [];

  while (n) {
    const mod = n % 36;
    const div = ~~(n / 36);
    const char = hexatrigesimalCharacters[mod];

    chars.push(char);

    n = div;
  }

  return chars.reverse().join("");
}

function concatHex36(n: number): string {
  const n2 = n * n;
  const n3 = n2 * n;
  return toHexadecimalString(n2) + toHexatrigesimalString(n3);
}

describe("3912 - hexadecimal-and-hexatrigesimal-conversion", () => {
  it("case-1", () => {
    expect(concatHex36(13)).toBe("A91P1");
  });

  it("case-2", () => {
    expect(concatHex36(36)).toBe("5101000");
  });
});
