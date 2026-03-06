import { storeFile } from "@core/memo.js";
import { existsSync } from "node:fs";
import { parseArgs } from "node:util";
import { fetchAllProblems, fetchProblemById, type LeetcodeProblem } from "./leetcode.js";

const CodeTemplate = `/**
{{questionId}} - {{title}} - https://leetcode.com/problems/{{title}}/description/

{{content}}
*/
import { describe, expect, it } from "vitest";

{{code}}

describe("{{questionId}} - {{title}}", () => {
  it("case-1", () => {
    expect(true).toBe(true);
  });
});
`;

const validateDifficulty = (difficulty: string | undefined): void => {
  if (difficulty && !["easy", "medium", "hard"].includes(difficulty)) {
    console.error("Invalid difficulty. Must be one of: easy, medium, hard");
    process.exit(1);
  }
};

const fetchRandomProblemId = async (difficulty: string | undefined) => {
  const problems = await fetchAllProblems();
  const filteredProblems = difficulty ? problems.filter((p) => p.difficulty.toLowerCase() === difficulty) : problems;

  if (filteredProblems.length === 0) {
    console.error(`No problems found${difficulty ? ` with difficulty: ${difficulty}` : ""}`);
    process.exit(1);
  }

  return filteredProblems[Math.floor(Math.random() * filteredProblems.length)]!.frontendQuestionId;
};

const generateFilename = (problem: LeetcodeProblem): string => {
  return `src/problems/${problem.difficulty.toLowerCase()}/sol-${problem.questionId}-${problem.titleSlug}.test.ts`;
};

const checkFileExists = (filename: string, problemId: string): void => {
  if (existsSync(filename)) {
    console.error(`Problem ${problemId} already exists. Delete file to regenerate.`);
    process.exit(0);
  }
};

const generateCode = (problem: LeetcodeProblem, problemIdStr: string): string => {
  const typeScriptSnippet = problem.codeSnippets.find((snippet) => snippet.lang === "TypeScript");

  return CodeTemplate.replaceAll("{{questionId}}", problemIdStr)
    .replaceAll("{{title}}", problem.titleSlug)
    .replaceAll("{{code}}", typeScriptSnippet?.code || "")
    .replaceAll("{{content}}", problem.content);
};

const fetchRandomProblem = async (difficulty: string | undefined): Promise<LeetcodeProblem> => {
  const problemId = await fetchRandomProblemId(difficulty);
  console.log(`Selected random problem: ${problemId}`);

  return await fetchProblemById(+problemId);
};

const storeProblemFile = async (problem: LeetcodeProblem): Promise<void> => {
  const filename = generateFilename(problem);
  checkFileExists(filename, problem.questionId);

  const code = generateCode(problem, problem.questionId);
  await storeFile(filename, code, "text");
};

const main = async (): Promise<void> => {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      random: {
        type: "boolean",
        short: "r",
      },
      difficulty: {
        type: "string",
        short: "d",
      },
    },
    allowPositionals: true,
  });

  const problemIdStr = positionals[0];
  const isRandom = values.random ?? false;
  const difficulty = values.difficulty?.toLowerCase();

  let problem: LeetcodeProblem;
  if (isRandom) {
    validateDifficulty(difficulty);
    problem = await fetchRandomProblem(difficulty);
  } else {
    if (!problemIdStr) {
      console.error(
        "Problem ID is required. Usage: pnpm create-problem <problem-id> [-r|--random] [-d|--difficulty easy|medium|hard]",
      );

      process.exit(1);
    }

    problem = await fetchProblemById(+problemIdStr);
  }

  await storeProblemFile(problem);
};

main();
