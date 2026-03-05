import { storeFile } from "@core/memo.js";
import { fetchProblemById } from "./leetcode.js";

const problemIdStr = process.argv[2];
if (!problemIdStr) {
  console.error("Problem ID is required. Usage: pnpm create-problem <problem-id>.");
  process.exit(1);
}

const codeScafold = `/**
{{questionId}} - {{title}}

{{content}}
*/
import { describe, expect, it } from "vitest";

describe("{{questionId}} - {{title}}", () => {
  it("case-1", () => {
    expect(true).toBe(true);
  });
});
`;

const problemId = +problemIdStr;

const problem = await fetchProblemById(problemId);

const filename = `src/problems/${problem.difficulty.toLowerCase()}/sol-${problem.questionId}-${problem.titleSlug}.test.ts`;
const code = codeScafold
  .replaceAll("{{questionId}}", problemIdStr)
  .replaceAll("{{title}}", problem.title)
  .replaceAll("{{content}}", problem.content);

console.log(code);
console.log(filename);
storeFile(filename, code, "text");
