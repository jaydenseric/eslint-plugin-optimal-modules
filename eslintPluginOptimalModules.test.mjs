// @ts-check

import { deepStrictEqual, strictEqual } from "node:assert";
import { suite, test } from "node:test";

import eslintPluginOptimalModules from "./eslintPluginOptimalModules.mjs";
import meta from "./meta.mjs";
import ruleNoNamedExports, {
  name as ruleNoNamedExportsName,
} from "./rules/no-named-exports.mjs";

suite("ESLint plugin.", { concurrency: true }, () => {
  test("Meta.", () => {
    strictEqual(eslintPluginOptimalModules.meta, meta);
  });

  test(`Rule \`${ruleNoNamedExportsName}\`.`, () => {
    strictEqual(
      eslintPluginOptimalModules.rules[ruleNoNamedExportsName],
      ruleNoNamedExports,
    );
  });

  test("Config `recommended`.", () => {
    deepStrictEqual(eslintPluginOptimalModules.configs.recommended, {
      name: `${meta.namespace}/recommended`,
      plugins: {
        [meta.namespace]: eslintPluginOptimalModules,
      },
      rules: {
        [`${meta.namespace}/${ruleNoNamedExportsName}`]: "error",
      },
    });
  });
});
