// @ts-check

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

/**
 * An ESLint plugin to enforce
 * [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design).
 * @satisfies {import("eslint").ESLint.Plugin}
 */
const eslintPluginOptimalModules = {
  // @ts-expect-error Types are incorrect:
  // https://eslint.org/docs/latest/extend/plugins#metadata-in-plugins
  meta: {
    name: `eslint-plugin-${PLUGIN_NAME}`,
    version: packageData.version,
  },
  configs: {
    recommended: {
      plugins: [PLUGIN_NAME],
      rules: {
        [`${PLUGIN_NAME}/${RULE_NAME_NO_NAMED_EXPORTS}`]: "error",
      },
    },
  },
  rules: {
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
      create: function (context) {
        return {
          ["ExportNamedDeclaration[declaration!=null], ExportSpecifier[exported.name!='default']"](
            /** @type {import("estree").Node} */ node
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
  },
};

module.exports = eslintPluginOptimalModules;
