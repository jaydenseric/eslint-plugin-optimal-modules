// @ts-check

/** @import { ESLint } from "eslint" */

import { readFileSync } from "node:fs";

const { name, version } =
  /**
   * Package metadata.
   * @type {{
   *   name: string,
   *   version: string,
   * }}
   */ (
    JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))
  );

/**
 * ESLint plugin metadata.
 * @satisfies {ESLint.Plugin["meta"]}
 */
const meta = /** @type {const} */ ({
  name,
  namespace: "optimal-modules",
  version,
});

export default meta;
