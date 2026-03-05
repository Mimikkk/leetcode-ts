import "dotenv/config";
import ky from "ky";

export const Container = {
  auth: {
    csrfToken: process.env.AUTH_CSRF_TOKEN!,
    session: process.env.AUTH_SESSION!,
  },
};

if (!Container.auth.csrfToken || !Container.auth.session) {
  console.error("AUTH_CSRF_TOKEN and AUTH_SESSION must be set");
  process.exit(1);
}

export const LeetcodeClient = ky.extend({
  headers: {
    Cookie: `csrftoken=${Container.auth.csrfToken}; LEETCODE_SESSION=${Container.auth.session}`,
    "X-CSRFToken": Container.auth.csrfToken,
  },
});

export const TurndownService = new (require("turndown"))();
