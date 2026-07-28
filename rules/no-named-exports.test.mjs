// @ts-check

import { describe, it } from "node:test";

import parser from "@typescript-eslint/parser";
import { RuleTester } from "eslint";

import rule, { name } from "./no-named-exports.mjs";

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
  },
});

ruleTester.run(`Rule \`${name}\`.`, rule, {
  valid: [
    {
      name: "No export.",
      code: "",
    },
    {
      name: "Default export, declaration.",
      code: "export default true;",
    },
    {
      name: "Default export, export list.",
      code: "const a = true; export { a as default };",
    },
    {
      name: "Default export, re-export default.",
      code: 'export { default } from "a";',
    },
    {
      name: "Type default export, export list.",
      code: "type A = boolean; export { type A as default };",
    },
    {
      name: "Type default export, export list, type-only.",
      code: "type A = boolean; export type { A as default };",
    },
    {
      name: "Type default export, re-export default.",
      code: 'export { type default } from "a";',
    },
    {
      name: "Type default export, re-export default, type-only.",
      code: 'export type { default } from "a";',
    },
  ],
  invalid: [
    {
      name: "Named export, declaration.",
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
    {
      name: "Named export, export list.",
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
    {
      name: "Named export, re-export default.",
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
    {
      name: "Named export, re-export named.",
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
    {
      name: "Type named export, declaration.",
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
    {
      name: "Type named export, re-export default.",
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
    {
      name: "Type named export, re-export default, type-only.",
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
    {
      name: "Type named export, re-export named.",
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
    {
      name: "Type named export, re-export named, type-only.",
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
