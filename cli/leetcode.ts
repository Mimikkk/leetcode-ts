import { LeetcodeClient, TurndownService as TurndownClient } from "../src/core/container.js";
import { memo } from "../src/core/memo.js";

interface LeetcodeProblem {
  questionId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  codeSnippets: { lang: string }[];
  content: string;
}

const queries = {
  all: `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      frontendQuestionId: questionFrontendId
      titleSlug
      codeSnippets {
      lang
    }
    }
  }
}
`,
  byTitleSlug: `
query questionTitleSlug($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    title
    content
    titleSlug
    difficulty
    codeSnippets {
      lang
    }
  }
}
`,
};

const OneDayMs = 24 * 60 * 60 * 1000;
export const fetchAllProblems = memo({
  filename: "all-problems.json",
  expiryMs: OneDayMs,
  fn: async () => {
    const problems = await LeetcodeClient.post("https://leetcode.com/graphql", {
      json: {
        query: queries.all,
        variables: { categorySlug: "", limit: 5000, skip: 0, filters: {} },
      },
    }).json<{
      data: {
        problemsetQuestionList: {
          questions: {
            titleSlug: string;
            frontendQuestionId: string;
          }[];
        };
      };
    }>();

    return problems.data.problemsetQuestionList.questions;
  },
});

const problemAsMd = (problem: LeetcodeProblem) => TurndownClient.turndown(problem.content);

export const fetchProblemById = memo({
  filename: (problemId: number) => `problems/problem-${problemId}.json`,
  expiryMs: OneDayMs,
  fn: async (problemId: number) => {
    const problems = await fetchAllProblems();

    const problemIdStr = problemId.toString();
    const titleSlug = problems.find((problem) => problem.frontendQuestionId === problemIdStr)?.titleSlug;
    if (!titleSlug) {
      throw new Error(`Problem ${problemId} not found.`);
    }

    const problem = await LeetcodeClient.post("https://leetcode.com/graphql", {
      json: {
        query: queries.byTitleSlug,
        variables: { titleSlug: titleSlug },
      },
    }).json<{ data: { question: LeetcodeProblem } }>();

    const content = problemAsMd(problem.data.question);
    return { ...problem.data.question, content };
  },
});

export const fetchProblemContents = memo({
  filename: (problemId: number) => `problems/problem-${problemId}.md`,
  expiryMs: OneDayMs,
  type: "text",
  fn: async (problemId: number): Promise<string> => {
    const { content } = await fetchProblemById(problemId);

    return content;
  },
});
