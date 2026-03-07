/**
14 - longest-common-prefix - https://leetcode.com/problems/longest-common-prefix/description/

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

**Example 1:**

**Input:** strs = \["flower","flow","flight"\]
**Output:** "fl"

**Example 2:**

**Input:** strs = \["dog","racecar","car"\]
**Output:** ""
**Explanation:** There is no common prefix among the input strings.

**Constraints:**

*   `1 <= strs.length <= 200`
*   `0 <= strs[i].length <= 200`
*   `strs[i]` consists of only lowercase English letters if it is non-empty.
*/
import { describe, expect, it } from "vitest";

function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";
  let offset = 0;

  let value = strs[0]![0];
  const n = strs.length;

  outer: while (value) {
    for (let i = 0; i < n; ++i) {
      if (value !== strs[i]![offset]) {
        break outer;
      }
    }

    ++offset;
    value = strs[0]![offset];
  }

  return strs[0]?.substring(0, offset) ?? "";
}

describe("14 - longest-common-prefix", () => {
  it("case-1", () => {
    expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
  });

  it("case-2", () => {
    expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
  });

  it("case-3", () => {
    expect(longestCommonPrefix(["a"])).toBe("a");
  });
});
