import { storeFile } from "@core/memo.js";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
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

const solvedProblemsIdsCachePath = ".cache/solved-problems.json";

const loadSolvedProblems = async (): Promise<Set<string>> => {
  try {
    const { readFile } = await import("node:fs/promises");
    const content = await readFile(solvedProblemsIdsCachePath, "utf-8");
    return new Set(JSON.parse(content));
  } catch {
    return new Set();
  }
};

const saveSolvedProblems = async (solvedProblems: Set<string>): Promise<void> => {
  await mkdir(".cache", { recursive: true });
  await storeFile(solvedProblemsIdsCachePath, JSON.stringify([...solvedProblems]), "text");
};

const fetchRandomProblemId = async (difficulty: string | undefined) => {
  const problems = await fetchAllProblems();
  const solvedProblems = await loadSolvedProblems();

  const filteredProblems = difficulty
    ? problems.filter((p) => p.difficulty.toLowerCase() === difficulty && !solvedProblems.has(p.frontendQuestionId))
    : problems.filter((p) => !solvedProblems.has(p.frontendQuestionId));

  if (filteredProblems.length === 0) {
    console.error(`No unsolved problems found${difficulty ? ` with difficulty: ${difficulty}` : ""}`);
    process.exit(1);
  }

  const selectedProblem = filteredProblems[Math.floor(Math.random() * filteredProblems.length)]!;
  solvedProblems.add(selectedProblem.frontendQuestionId);
  await saveSolvedProblems(solvedProblems);

  return selectedProblem.frontendQuestionId;
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

  console.log(resolve(filename));
  console.log(`https://leetcode.com/problems/${problem.titleSlug}/description/`);
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
