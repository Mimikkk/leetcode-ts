/**
71 - simplify-path - https://leetcode.com/problems/simplify-path/description/

given absolute unix-style path
rules:
- starts with: "/"
- "." => current directory
- ".." => previous directory
- "\/+" => "/"
- otherwise => "directory_name"
transform it into simplified canonical path
rules:
- starts with: "/"
- directories separated by singular "/".
- path does not end in "/" unless root.
- path does not contain "." | "..".

transform rules:
- transform "." into ""
- transform "/+" into "/"
- transform ".." to remove current dir from stack unless root

The simplified canonical path should follow these _rules_:

*/
import { describe, expect, it } from "vitest";

function simplifyPath(path: string): string {
  const parts = path.split(/\/+/).filter(Boolean);

  const result = [];
  for (let i = 0; i < parts.length; ++i) {
    if (parts[i] === ".") {
      continue;
    }

    if (parts[i] === "..") {
      result.pop();
      continue;
    }

    result.push(parts[i]);
  }

  return `/${result.join("/")}`;
}

describe("71 - simplify-path", () => {
  it("case-1", () => {});
  it("case-2", () => {
    expect(simplifyPath("/home//foo/")).toBe("/home/foo");
  });
  it("case-3", () => {
    expect(simplifyPath("/home/user/Documents/../Pictures")).toBe("/home/user/Pictures");
  });
  it("case-4", () => {
    expect(simplifyPath("/../")).toBe("/");
  });
  it("case-5", () => {
    expect(simplifyPath("/.../a/../b/c/../d/./")).toBe("/.../b/d");
  });
  it("case-6", () => {
    expect(simplifyPath("/a/./b/../../c/")).toBe("/c");
  });
});
