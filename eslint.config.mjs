// @ts-check

import eslintJs from "@eslint/js";
import eslintPluginEslintPlugin from "eslint-plugin-eslint-plugin";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

/**
 * ESLint config.
 * @satisfies {Array<import("eslint").Linter.FlatConfig>}
 */
const eslintConfig = [
  eslintJs.configs.recommended,
  /**
   * This package doesn’t have types yet.
   * @see https://github.com/eslint-community/eslint-plugin-eslint-plugin/issues/310
   * @type {Array<import("eslint").Linter.FlatConfig>}
   */
  (
    // @ts-expect-error
    eslintPluginEslintPlugin.configs["flat/recommended"]
  ),
  {
    languageOptions: {
      globals: globals.nodeBuiltin,
    },
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "arrow-body-style": "error",
      "object-shorthand": "error",
      strict: "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.{cjs,js}"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
];

export default eslintConfig;
