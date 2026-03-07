/**
91 - decode-ways - https://leetcode.com/problems/decode-ways/description/

given mapping:
1 -> a
...
26 -> z

and a string
count combinations

For example, `"11106"` can be decoded into:

*   `"AAJF"` with the grouping `(1, 1, 10, 6)`
*   `"KJF"` with the grouping `(11, 10, 6)`
*   The grouping `(1, 11, 06)` is invalid because `"06"` is not a valid code (only `"6"` is valid).

Given a string s containing only digits, return the **number of ways** to **decode** it. If the entire string cannot be decoded in any valid way, return `0`.

The test cases are generated so that the answer fits in a **32-bit** integer.
*/
import { describe, expect, it } from "vitest";

const memo = <TFn extends (...args: any) => any>(
  fn: TFn,
  keyBy: (...value: Parameters<TFn>) => string | number,
): TFn => {
  const cache = new Map<string | number, ReturnType<TFn>>();

  return ((...args: Parameters<TFn>): ReturnType<TFn> => {
    const key = keyBy(...args);
    let cached = cache.get(key);
    if (cached !== undefined) {
      return cached;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as TFn;
};

const graph: Record<string, string> = { "1": "0123456789", "2": "0123456" };
function numDecodings(s: string): number {
  const n = s.length;

  const count = memo(
    (offset: number): number => {
      if (offset === n) return 1;
      if (s[offset] === "0") return 0;

      if (graph[s[offset]!]?.includes(s[offset + 1]!)) {
        return count(offset + 1) + count(offset + 2);
      }

      return count(offset + 1);
    },
    (v) => v,
  );

  return count(0);
}

describe("91 - decode-ways", () => {
  it("case-1", () => {
    expect(numDecodings("12")).toBe(2);
  });
  it("case-2", () => {
    expect(numDecodings("226")).toBe(3);
  });
  it("case-3", () => {
    expect(numDecodings("06")).toBe(0);
  });
  it("case-4", () => {
    expect(numDecodings("11106")).toBe(2);
  });
  it("case-5", () => {
    expect(numDecodings("11111111111111111111111111111111111")).toBe(14930352);
  });
});
