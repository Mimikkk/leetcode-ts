/**
28 - find-the-index-of-the-first-occurrence-in-a-string - https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Example 1:**

**Input:** haystack = "sadbutsad", needle = "sad"
**Output:** 0
**Explanation:** "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.

**Example 2:**

**Input:** haystack = "leetcode", needle = "leeto"
**Output:** -1
**Explanation:** "leeto" did not occur in "leetcode", so we return -1.

**Constraints:**

*   `1 <= haystack.length, needle.length <= 104`
*   `haystack` and `needle` consist of only lowercase English characters.
*/
import { describe, expect, it } from "vitest";

function strStr(haystack: string, needle: string): number {
  const n = haystack.length;
  const m = needle.length;

  outer: for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
      if (haystack[i + j] !== needle[j]) {
        continue outer;
      }
    }

    return i;
  }

  return -1;
}

describe("28 - find-the-index-of-the-first-occurrence-in-a-string", () => {
  it("case-1", () => {
    expect(strStr("sadbutsad", "sad")).toBe(0);
  });

  it("case-2", () => {
    expect(strStr("leetcode", "leeto")).toBe(-1);
  });
});
