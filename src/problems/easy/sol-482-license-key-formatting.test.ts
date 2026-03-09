/**
482 - license-key-formatting - https://leetcode.com/problems/license-key-formatting/description/

You are given a license key represented as a string `s` that consists of
 only alphanumeric characters and dashes. 
 The string is separated into `n + 1` groups by `n` dashes. 
 You are also given an integer `k`.

We want to reformat the string `s` such that each group contains exactly `k` characters, 
except for the first group, which could be shorter than `k` 
but still must contain at least one character. Furthermore, there must be a dash inserted between two groups, and you should convert all lowercase letters to uppercase.

Return _the reformatted license key_.

**Example 1:**

**Input:** s = "5F3Z-2e-9-w", k = 4
**Output:** "5F3Z-2E9W"
**Explanation:** The string s has been split into two parts, each part has 4 characters.
Note that the two extra dashes are not needed and can be removed.

**Example 2:**

**Input:** s = "2-5g-3-J", k = 2
**Output:** "2-5G-3J"
**Explanation:** The string s has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` consists of English letters, digits, and dashes `'-'`.
*   `1 <= k <= 104`
*/
import { describe, expect, it } from "vitest";

function licenseKeyFormatting(s: string, k: number): string {
  const parts = [];
  let i = s.length - 1;

  while (i >= 0) {
    const part = [];

    let n = k;
    while (n-- > 0 && i >= 0) {
      while (s[i] === "-") --i;
      if (s[i] === undefined) break;

      part.push(s[i--]);
    }

    if (part.length > 0) {
      parts.push(part.reverse().join(""));
    }
  }

  return parts.reverse().join("-").toUpperCase();
}

describe("482 - license-key-formatting", () => {
  it("case-1", () => {
    expect(licenseKeyFormatting("5F3Z-2e-9-w", 4)).toBe("5F3Z-2E9W");
  });
  it("case-2", () => {
    expect(licenseKeyFormatting("2-5g-3-J", 2)).toBe("2-5G-3J");
  });
  it("case-3", () => {
    expect(licenseKeyFormatting("2-4A0r7-4k", 4)).toBe("24A0-R74K");
  });
  it("case-4", () => {
    expect(licenseKeyFormatting("2-4A0r7-4k", 3)).toBe("24-A0R-74K");
  });
  it("case-5", () => {
    expect(licenseKeyFormatting("--a-a-a-a--", 2)).toBe("AA-AA");
  });
});
