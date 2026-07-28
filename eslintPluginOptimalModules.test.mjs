// @ts-check

import { deepStrictEqual, strictEqual } from "node:assert";
import { describe, it } from "node:test";

import eslintPluginOptimalModules from "./eslintPluginOptimalModules.mjs";
import meta from "./meta.mjs";
import ruleNoNamedExports, {
  name as ruleNoNamedExportsName,
} from "./rules/no-named-exports.mjs";

describe("ESLint plugin.", { concurrency: true }, () => {
  it("Meta.", () => {
    strictEqual(eslintPluginOptimalModules.meta, meta);
  });

  it(`Rule \`${ruleNoNamedExportsName}\`.`, () => {
    strictEqual(
      eslintPluginOptimalModules.rules[ruleNoNamedExportsName],
      ruleNoNamedExports,
    );
  });

  it("Config `recommended`.", () => {
    deepStrictEqual(eslintPluginOptimalModules.configs.recommended, {
      plugins: {
        [meta.namespace]: eslintPluginOptimalModules,
      },
      rules: {
        [`${meta.namespace}/${ruleNoNamedExportsName}`]: "error",
      },
    });
  });
});
