// @ts-check

/** @import { ESLint } from "eslint" */

import meta from "./meta.mjs";
import ruleNoNamedExports, {
  name as ruleNoNamedExportsName,
} from "./rules/no-named-exports.mjs";

/** @implements {ESLint.Plugin} */
class EslintPluginOptimalModules {
  /** ESLint plugin metadata. */
  meta = meta;

  /** ESLint plugin rules. */
  rules = /** @type {const} */ ({
    /**
     * ESLint rule that prohibits using named exports for optimal module
     * design.
     */
    [ruleNoNamedExportsName]: ruleNoNamedExports,
  });

  /** ESLint plugin configs. */
  configs = /** @type {const} */ ({
    /** Recommended ESLint config. */
    recommended: {
      name: `${meta.namespace}/recommended`,
      plugins: {
        [meta.namespace]: this,
      },
      rules: {
        [`${meta.namespace}/${ruleNoNamedExportsName}`]: "error",
      },
    },
  });
}

/**
 * An ESLint plugin to enforce
 * [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design).
 */
const eslintPluginOptimalModules = new EslintPluginOptimalModules();

export default eslintPluginOptimalModules;
