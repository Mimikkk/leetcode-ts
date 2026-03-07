/**
58 - length-of-last-word - https://leetcode.com/problems/length-of-last-word/description/

Given a string `s` consisting of words and spaces, return _the length of the **last** word in the string._

A **word** is a maximal substring consisting of non-space characters only.

**Example 1:**

**Input:** s = "Hello World"
**Output:** 5
**Explanation:** The last word is "World" with length 5.

**Example 2:**

**Input:** s = "   fly me   to   the moon  "
**Output:** 4
**Explanation:** The last word is "moon" with length 4.

**Example 3:**

**Input:** s = "luffy is still joyboy"
**Output:** 6
**Explanation:** The last word is "joyboy" with length 6.

**Constraints:**

*   `1 <= s.length <= 104`
*   `s` consists of only English letters and spaces `' '`.
*   There will be at least one word in `s`.
*/
import { describe, expect, it } from "vitest";

function lengthOfLastWord(s: string): number {
  let i = s.length - 1;
  while (s[i] === " ") --i;

  let count = 0;
  while (s[i] !== " " && s[i] !== undefined) {
    --i;
    ++count;
  }

  return count;
}

describe("58 - length-of-last-word", () => {
  it("case-1", () => {
    expect(lengthOfLastWord("Hello World")).toBe(5);
  });

  it("case-2", () => {
    expect(lengthOfLastWord("   fly me   to   the moon  ")).toBe(4);
  });

  it("case-3", () => {
    expect(lengthOfLastWord("luffy is still joyboy")).toBe(6);
  });
  it("case-4", () => {
    expect(lengthOfLastWord("a")).toBe(1);
  });
});
