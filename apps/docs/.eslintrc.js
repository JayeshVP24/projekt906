/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@projekt906/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
