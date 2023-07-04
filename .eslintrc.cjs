// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@cspell/recommended",
    "plugin:sonarjs/recommended",
    "react-app",
    "plugin:json/recommended",
    "react-app/jest",
  ],
  globals: {
    logger: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["sonarjs", "@cspell", "unused-imports"],
  rules: {
    "@cspell/spellchecker": [
      "warn",
      {
        ignoreImportProperties: false,
        ignoreImports: false,
      },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "arrow-parens": "warn",
    // "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-unused-expressions": 0,
    "no-unused-vars": "off",
    "no-use-before-define": [
      "warn",
      {
        allowNamedExports: true,
        classes: true,
        functions: false,
        variables: false,
      },
    ],
    "object-shorthand": ["error", "always"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],
  },
});
