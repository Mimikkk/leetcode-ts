/**
32 - longest-valid-parentheses - https://leetcode.com/problems/longest-valid-parentheses/description/

Given a string containing just the characters `'('` and `')'`, return _the length of the longest valid (well-formed) parentheses_ _substring_.

**Example 1:**

**Input:** s = "(()"
**Output:** 2
**Explanation:** The longest valid parentheses substring is "()".

**Example 2:**

**Input:** s = ")()())"
**Output:** 4
**Explanation:** The longest valid parentheses substring is "()()".

**Example 3:**

**Input:** s = ""
**Output:** 0

**Constraints:**

*   `0 <= s.length <= 3 * 104`
*   `s[i]` is `'('`, or `')'`.
*/
import { describe, expect, it } from "vitest";

function longestValidParentheses(s: string): number {
  let longest = 0;
  const n = s.length;

  const stack: number[] = [-1];

  for (let i = 0; i < n; ++i) {
    if (s[i] === "(") {
      stack.push(i);
      continue;
    }

    stack.pop();

    if (stack.length === 0) {
      stack.push(i);
      continue;
    }

    const length = i - stack[stack.length - 1]!;
    if (length > longest) longest = length;
  }

  return longest;
}

describe("32 - longest-valid-parentheses", () => {
  it("case-1", () => {
    expect(longestValidParentheses("(()")).toBe(2);
  });

  it("case-2", () => {
    expect(longestValidParentheses(")()())")).toBe(4);
  });

  it("case-3", () => {
    expect(longestValidParentheses("")).toBe(0);
  });

  it("case-4", () => {
    expect(longestValidParentheses("()".repeat(30000))).toBe(60000);
  });
});
