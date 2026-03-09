/**
423 - reconstruct-original-digits-from-english - https://leetcode.com/problems/reconstruct-original-digits-from-english/description/

Given a string `s` containing an out-of-order English representation of digits `0-9`, 
return _the digits in **ascending** order_.

**Example 1:**

**Input:** s = "owoztneoer"
**Output:** "012"

**Example 2:**

**Input:** s = "fviefuro"
**Output:** "45"

**Constraints:**

*   `1 <= s.length <= 105`
*   `s[i]` is one of the characters `["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"]`.
*   `s` is **guaranteed** to be valid.

**Note:** Yes, this is one of those bullshit questions. The trick is to find unique characters:
- 'z' only appears in "zero" (0)
- 'w' only appears in "two" (2)
- 'u' only appears in "four" (4)
- 'x' only appears in "six" (6)
- 'g' only appears in "eight" (8)
Then use these to eliminate and find the rest:
- 'f' appears in "four" and "five" -> count 'f' - count(4) = count(5)
- 's' appears in "six" and "seven" -> count 's' - count(6) = count(7)
- 'h' appears in "three" and "eight" -> count 'h' - count(8) = count(3)
- 'i' appears in "five", "six", "eight", "nine" -> count 'i' - count(5) - count(6) - count(8) = count(9)
- 'o' appears in "zero", "one", "two", "four" -> count 'o' - count(0) - count(2) - count(4) = count(1)
*/
import { describe, expect, it } from "vitest";

function originalDigits(s: string): string {
  const characterCounts = new Map<string, number>();
  for (const char of s) {
    characterCounts.set(char, (characterCounts.get(char) ?? 0) + 1);
  }

  const digitCount = Array.from<number>({ length: 10 }).fill(0);

  digitCount[0] = characterCounts.get("z") ?? 0;
  digitCount[2] = characterCounts.get("w") ?? 0;
  digitCount[4] = characterCounts.get("u") ?? 0;
  digitCount[6] = characterCounts.get("x") ?? 0;
  digitCount[8] = characterCounts.get("g") ?? 0;

  digitCount[5] = (characterCounts.get("f") ?? 0) - digitCount[4];
  digitCount[7] = (characterCounts.get("s") ?? 0) - digitCount[6];
  digitCount[3] = (characterCounts.get("h") ?? 0) - digitCount[8];
  digitCount[9] = (characterCounts.get("i") ?? 0) - digitCount[5] - digitCount[6] - digitCount[8];
  digitCount[1] = (characterCounts.get("o") ?? 0) - digitCount[0] - digitCount[2] - digitCount[4];

  let result = "";
  for (let i = 0; i < 10; i++) {
    result += String(i).repeat(digitCount[i]);
  }

  return result;
}

describe("423 - reconstruct-original-digits-from-english", () => {
  it("case-1", () => {
    expect(originalDigits("owoztneoer")).toBe("012");
  });
  it("case-2", () => {
    expect(originalDigits("fviefuro")).toBe("45");
  });
  it("case-3", () => {
    expect(originalDigits("zeroonetwothreefourfivesixseveneightnine")).toBe("0123456789");
  });
});
