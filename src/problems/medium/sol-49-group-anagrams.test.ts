/**
49 - group-anagrams - https://leetcode.com/problems/group-anagrams/description/

Given an array of strings `strs`, group the anagrams together. You can return the answer in **any order**.

**Example 1:**

**Input:** strs = \["eat","tea","tan","ate","nat","bat"\]

**Output:** \[\["bat"\],\["nat","tan"\],\["ate","eat","tea"\]\]

**Explanation:**

*   There is no string in strs that can be rearranged to form `"bat"`.
*   The strings `"nat"` and `"tan"` are anagrams as they can be rearranged to form each other.
*   The strings `"ate"`, `"eat"`, and `"tea"` are anagrams as they can be rearranged to form each other.

**Example 2:**

**Input:** strs = \[""\]

**Output:** \[\[""\]\]

**Example 3:**

**Input:** strs = \["a"\]

**Output:** \[\["a"\]\]

**Constraints:**

*   `1 <= strs.length <= 104`
*   `0 <= strs[i].length <= 100`
*   `strs[i]` consists of lowercase English letters.
*/
import { describe, expect, it } from "vitest";

function groupAnagrams(strs: string[]): string[][] {
  const result = new Map<string, string[]>();

  strs.sort();
  const hashes = strs.map((s) => s.split("").sort().join(""));
  for (let i = 0; i < strs.length; ++i) {
    const hash = hashes[i]!;
    const str = strs[i]!;

    let values = result.get(hash);
    if (!values) {
      values = [];

      result.set(hash, values);
    }

    values.push(str);
  }

  return [...result.values()];
}

describe("49 - group-anagrams", () => {
  it("case-1", () => {
    expect(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])).toEqual([
      ["ate", "eat", "tea"],
      ["bat"],
      ["nat", "tan"],
    ]);
  });
});
