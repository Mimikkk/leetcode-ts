import { storeFile } from "@core/memo.js";
import { existsSync } from "node:fs";
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

if (existsSync(filename)) {
  console.error(`Problem ${problemId} already exists. Delete file to regenerate.`);
  process.exit(0);
}

const code = codeScafold
  .replaceAll("{{questionId}}", problemIdStr)
  .replaceAll("{{title}}", problem.title)
  .replaceAll("{{content}}", problem.content);

storeFile(filename, code, "text");
