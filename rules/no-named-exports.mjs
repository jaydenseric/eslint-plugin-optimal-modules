// @ts-check

/**
 * @import { Rule } from "eslint"
 * @import { Node } from "estree"
 */

import meta from "../meta.mjs";

/**
 * ESLint rule name.
 * @satisfies {string}
 */
export const name = "no-named-exports";

/**
 * ESLint rule that prohibits using named exports for optimal module design.
 * @satisfies {Rule.RuleModule}
 */
const rule = /** @type {const} */ ({
  meta: {
    docs: {
      description: "Prohibits using named exports for optimal module design.",
      recommended: true,
      url: `https://github.com/jaydenseric/${meta.name}/tree/v${meta.version}#rule-${name}`,
    },
    messages: {
      noNamedExports: "{{message}}",
    },
    schema: [],
    type: "suggestion",
  },
  create(context) {
    return {
      ["ExportNamedDeclaration[declaration!=null], ExportSpecifier[exported.name!='default']"](
        /** @type {Node} */ node,
      ) {
        context.report({
          node,
          messageId: "noNamedExports",
          data: {
            message: "Avoid named exports for optimal module design.",
          },
        });
      },
    };
  },
});

export default rule;
