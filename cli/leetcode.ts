import { LeetcodeClient, TurndownService as TurndownClient } from "../src/core/container.js";
import { memo } from "../src/core/memo.js";

export interface LeetcodeProblem {
  questionId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  codeSnippets: { lang: string; code: string }[];
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
      difficulty
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
      lang,
      code
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
    const allProblems: {
      titleSlug: string;
      frontendQuestionId: string;
      difficulty: string;
    }[] = [];

    let skip = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const problems = await LeetcodeClient.post("https://leetcode.com/graphql", {
        json: {
          query: queries.all,
          variables: { categorySlug: "", limit, skip, filters: {} },
        },
      }).json<{
        data: {
          problemsetQuestionList: {
            total: number;
            questions: {
              titleSlug: string;
              frontendQuestionId: string;
              difficulty: string;
            }[];
          };
        };
      }>();

      const questions = problems.data.problemsetQuestionList.questions;
      allProblems.push(...questions);

      skip += limit;
      hasMore = questions.length === limit;
    }

    return allProblems;
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
