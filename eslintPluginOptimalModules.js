// @ts-check

/**
 * @import { ESLint } from "eslint"
 * @import { Node } from "estree"
 */

"use strict";

const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const packageJson = readFileSync(join(__dirname, "package.json"), "utf8");

/**
 * Data in the `package.json` file.
 * @type {{ version: string }}
 */
const packageData = JSON.parse(packageJson);

const PLUGIN_NAME = "optimal-modules";
const RULE_NAME_NO_NAMED_EXPORTS = "no-named-exports";

/** @implements {ESLint.Plugin} */
class EslintPluginOptimalModules {
  /** ESLint plugin metadata. */
  meta = /** @type {const} */ ({
    name: `eslint-plugin-${PLUGIN_NAME}`,
    version: packageData.version,
  });

  /** ESLint plugin rules. */
  rules =
    /**
     * @type {const}
     * @satisfies {ESLint.Plugin["rules"]}
     */
    ({
      /**
       * ESLint rule that prohibits using named exports for optimal module
       * design.
       */
      [RULE_NAME_NO_NAMED_EXPORTS]: {
        meta: {
          type: "suggestion",
          docs: {
            description:
              "Prohibits using named exports for optimal module design.",
            recommended: true,
            url: `https://github.com/jaydenseric/eslint-plugin-${PLUGIN_NAME}/tree/v${packageData.version}#rule-${RULE_NAME_NO_NAMED_EXPORTS}`,
          },
          messages: {
            noNamedExports: "{{message}}",
          },
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
      },
    });

  /** ESLint plugin configs. */
  configs = /** @type {const} */ ({
    /** Recommended ESLint config. */
    recommended: {
      plugins: {
        [PLUGIN_NAME]: this,
      },
      rules: {
        [`${PLUGIN_NAME}/${RULE_NAME_NO_NAMED_EXPORTS}`]: "error",
      },
    },
  });
}

/**
 * An ESLint plugin to enforce
 * [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design).
 */
const eslintPluginOptimalModules = new EslintPluginOptimalModules();

module.exports = eslintPluginOptimalModules;
