/**
822 - unique-morse-code-words - https://leetcode.com/problems/unique-morse-code-words/description/

Given an array of strings `words` where each word can be written as a concatenation of the Morse code of each letter.

*   For example, `"cab"` can be written as `"-.-..--..."`, which is the concatenation of `"-.-."`, `".-"`, and `"-..."`. We will call such a concatenation the **transformation** of a word.

Return _the number of different **transformations** among all words we have_.

**Example 1:**

**Input:** words = \["gin","zen","gig","msg"\]
**Output:** 2
**Explanation:** The transformation of each word is:
"gin" -> "--...-."
"zen" -> "--...-."
"gig" -> "--...--."
"msg" -> "--...--."
There are 2 different transformations: "--...-." and "--...--.".

**Example 2:**

**Input:** words = \["a"\]
**Output:** 1

**Constraints:**

*   `1 <= words.length <= 100`
*   `1 <= words[i].length <= 12`
*   `words[i]` consists of lowercase English letters.
*/
import { describe, expect, it } from "vitest";

const morse = [
  ".-",
  "-...",
  "-.-.",
  "-..",
  ".",
  "..-.",
  "--.",
  "....",
  "..",
  ".---",
  "-.-",
  ".-..",
  "--",
  "-.",
  "---",
  ".--.",
  "--.-",
  ".-.",
  "...",
  "-",
  "..-",
  "...-",
  ".--",
  "-..-",
  "-.--",
  "--..",
];
const transformMorse = (word: string) => [...word].map((r) => morse[r.charCodeAt(0) - 97]).join("");

function uniqueMorseRepresentations(words: string[]): number {
  return new Set(words.map(transformMorse)).size;
}

describe("822 - unique-morse-code-words", () => {
  it("case-1", () => {
    expect(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"])).toBe(2);
  });
});
