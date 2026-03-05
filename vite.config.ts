import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "src/core"),
      "@problems": path.resolve(__dirname, "src/problems"),
    },
  },
});
