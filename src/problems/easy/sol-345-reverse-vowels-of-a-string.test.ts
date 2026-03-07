/**
345 - reverse-vowels-of-a-string - https://leetcode.com/problems/reverse-vowels-of-a-string/description/

given s:
reverse only all the vowels in the string and return it.

return the string with reversed vowels.
*/
import { describe, expect, it } from "vitest";

const vowels = "aeiouAEIOU";
function reverseVowels(s: string): string {
  let left = 0;
  let right = s.length - 1;

  let chars = [...s];
  while (left < right) {
    while (left < right && !vowels.includes(s[left])) ++left;
    while (left < right && !vowels.includes(s[right])) --right;

    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;

    ++left;
    --right;
  }

  return chars.join("");
}

describe("345 - reverse-vowels-of-a-string", () => {
  it("case-1", () => {
    expect(reverseVowels("IceCreAm")).toBe("AceCreIm");
  });

  it("case-2", () => {
    expect(reverseVowels("leetcode")).toBe("leotcede");
  });
});
