/**
20 - valid-parentheses - https://leetcode.com/problems/valid-parentheses/description/

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Example 1:**

**Input:** s = "()"

**Output:** true

**Example 2:**

**Input:** s = "()\[\]{}"

**Output:** true

**Example 3:**

**Input:** s = "(\]"

**Output:** false

**Example 4:**

**Input:** s = "(\[\])"

**Output:** true

**Example 5:**

**Input:** s = "(\[)\]"

**Output:** false

**Constraints:**

*   `1 <= s.length <= 104`
*   `s` consists of parentheses only `'()[]{}'`.
*/
import { describe, expect, it } from "vitest";

const pairs = {
  "{": "}",
  "[": "]",
  "(": ")",
};
type OpenBracketToken = "{" | "[" | "(";
function isValid(s: string): boolean {
  const stack: OpenBracketToken[] = [];

  for (let i = 0; i < s.length; ++i) {
    const char = s[i]!;

    if (char in pairs) {
      stack.push(char as OpenBracketToken);
    } else {
      if (pairs[stack.pop()!] === char) continue;
      return false;
    }
  }

  return stack.length === 0;
}

describe("20 - valid-parentheses", () => {
  it("case-1", () => {
    expect(isValid("()")).toBe(true);
  });

  it("case-2", () => {
    expect(isValid("()[]{}")).toBe(true);
  });

  it("case-3", () => {
    expect(isValid("(]")).toBe(false);
  });

  it("case-4", () => {
    expect(isValid("([)]")).toBe(false);
  });

  it("case-5", () => {
    expect(isValid("{[]}")).toBe(true);
  });

  it("case-6", () => {
    expect(isValid("(")).toBe(false);
  });
});
