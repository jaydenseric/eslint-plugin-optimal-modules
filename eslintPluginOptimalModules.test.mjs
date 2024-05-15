// @ts-check

import { describe, it } from "node:test";

import typescriptEslintParser from "@typescript-eslint/parser";
import { RuleTester } from "eslint";

import eslintPluginOptimalModules from "./eslintPluginOptimalModules.js";

const ruleTesterParserEslint = new RuleTester();

const ruleTesterParserTypescript = new RuleTester({
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      ecmaVersion: "latest",
    },
  },
});

describe("ESLint plugin.", { concurrency: true }, () => {
  describe("Rule `no-named-exports`.", { concurrency: true }, () => {
    const ruleName = "no-named-exports";
    const rule = eslintPluginOptimalModules.rules[ruleName];

    /** @param {RuleTester} ruleTester Rule tester. */
    function testJsSyntax(ruleTester) {
      it("No export.", () => {
        ruleTester.run(ruleName, rule, {
          valid: [
            {
              code: "",
            },
          ],
          invalid: [],
        });
      });

      it("Default export, declaration.", () => {
        ruleTester.run(ruleName, rule, {
          valid: [
            {
              code: "export default true;",
            },
          ],
          invalid: [],
        });
      });

      it("Default export, export list.", () => {
        ruleTester.run(ruleName, rule, {
          valid: [
            {
              code: "const a = true; export { a as default };",
            },
          ],
          invalid: [],
        });
      });

      it("Default export, re-export default.", () => {
        ruleTester.run(ruleName, rule, {
          valid: [
            {
              code: 'export { default } from "a";',
            },
          ],
          invalid: [],
        });
      });

      it("Named export, declaration.", () => {
        ruleTester.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: "export const a = true;",
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 1,
                  endLine: 1,
                  endColumn: 23,
                },
              ],
            },
          ],
        });
      });

      it("Named export, export list.", () => {
        ruleTester.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: "const abc = true; export { abc };",
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 28,
                  endLine: 1,
                  endColumn: 31,
                },
              ],
            },
          ],
        });
      });

      it("Named export, re-export default.", () => {
        ruleTester.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: 'export { default as abc } from "a";',
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 10,
                  endLine: 1,
                  endColumn: 24,
                },
              ],
            },
          ],
        });
      });

      it("Named export, re-export named.", () => {
        ruleTester.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: 'export { abc } from "a";',
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 10,
                  endLine: 1,
                  endColumn: 13,
                },
              ],
            },
          ],
        });
      });
    }

    describe("ESLint parser.", () => {
      testJsSyntax(ruleTesterParserEslint);
    });

    describe("TypeScript parser.", () => {
      testJsSyntax(ruleTesterParserTypescript);

      it("Type default export, export list.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [
            {
              code: "type A = boolean; export { type A as default };",
            },
          ],
          invalid: [],
        });
      });

      it("Type default export, export list, type-only.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [
            {
              code: "type A = boolean; export type { A as default };",
            },
          ],
          invalid: [],
        });
      });

      it("Type default export, re-export default.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [
            {
              code: 'export { type default } from "a";',
            },
          ],
          invalid: [],
        });
      });

      it("Type default export, re-export default, type-only.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [
            {
              code: 'export type { default } from "a";',
            },
          ],
          invalid: [],
        });
      });

      it("Type named export, declaration.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: "export type a = boolean;",
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 1,
                  endLine: 1,
                  endColumn: 25,
                },
              ],
            },
          ],
        });
      });

      it("Type named export, re-export default.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: 'export { type default as Abc } from "a";',
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 10,
                  endLine: 1,
                  endColumn: 29,
                },
              ],
            },
          ],
        });
      });

      it("Type named export, re-export default, type-only.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: 'export type { default as Abc } from "a";',
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 15,
                  endLine: 1,
                  endColumn: 29,
                },
              ],
            },
          ],
        });
      });

      it("Type named export, re-export named.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: 'export { type Abc } from "a";',
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 10,
                  endLine: 1,
                  endColumn: 18,
                },
              ],
            },
          ],
        });
      });

      it("Type named export, re-export named, type-only.", () => {
        ruleTesterParserTypescript.run(ruleName, rule, {
          valid: [],
          invalid: [
            {
              code: 'export type { Abc } from "a";',
              errors: [
                {
                  messageId: "noNamedExports",
                  line: 1,
                  column: 15,
                  endLine: 1,
                  endColumn: 18,
                },
              ],
            },
          ],
        });
      });
    });
  });
});
