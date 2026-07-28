# eslint-plugin-optimal-modules changelog

## Next

### Major

- Updated Node.js support to `^22.13.0 || ^24.0.0 || >=26.0.0`.
- Updated the peer dependency [`eslint`](https://npm.im/eslint) to `^10.0.0`.
- Use the JSDoc tag `@import` for type imports (requires TypeScript v5.5+).
- Changed the ESLint plugin module format from CJS in a `.js` file to ESM in a `.mjs` file. To migrate a deep import:

  ```diff
  - import eslintPluginOptimalModules from "eslint-plugin-optimal-modules/eslintPluginOptimalModules.js";
  + import eslintPluginOptimalModules from "eslint-plugin-optimal-modules/eslintPluginOptimalModules.mjs";
  ```

- The type `ESLintPlugin` is no longer exported.

### Minor

- Added the ESLint plugin property `meta.namespace` with the value `"optimal-modules"`.

### Patch

- Updated dev dependencies.
- Updated package scripts.
- Updated GitHub Actions CI config.
- Updated TypeScript config.
- Updated VS Code workspace settings.
- Updated the ESLint config.
- Switched to the Node.js test runner code coverage, removing the dev dependency [`coverage-node`](https://npm.im/coverage-node).
- Moved rules into separate modules.
- Improved tests.
- Sorted config in `.editorconfig`.

## 3.0.0

### Major

- Updated the peer dependency [`eslint`](https://npm.im/eslint) to `^9.11.1`.
- Removed the dependency [`@types/eslint`](https://npm.im/@types/eslint) to rely on the types provided in [`eslint`](https://npm.im/eslint) v9.10+.

### Patch

- Updated dependencies.
- Added the dependency [`@types/estree`](https://npm.im/@types/estree) so it’s no longer transitive.
- Migrate deprecated types in the project and example ESLint configs.

## 2.0.0

### Major

- Updated Node.js support to `^18.18.0 || ^20.9.0 || >=21.1.0`.
- Updated the peer dependency [`eslint`](https://npm.im/eslint) to `^9.0.0`.
- Updated dev dependencies, some of which require newer Node.js versions than previously supported.
- The plugin, and its config `recommended`, is now ESLint v9 format.

### Patch

- Updated dependencies.
- Updated GitHub Actions CI config:
  - No longer run the workflow on pull request.
  - Enable manual workflow dispatching.
  - Run tests with Node.js v18, v20, v21, v22.
  - Updated `actions/checkout` to v4.
  - Updated `actions/setup-node` to v4.
- Updated the `package.json` field `repository` to conform to new npm requirements.
- Updated the package script `eslint`, ESLint config, and tests for ESLint v9.
- Integrated new dev dependency [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc).
- Updated the readme instructions for ESLint “flat” config using [`eslint.config.mjs`](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file).

## 1.0.2

### Patch

- Fixed the readme intro.
- Added to the readme installation instructions how to configure ESLint to allow named exports in [Storybook](https://storybook.js.org) story modules that have a [Component Story Format (CSF)](https://github.com/ComponentDriven/csf).

## 1.0.1

### Patch

- Fixed broken rule URLs.

## 1.0.0

Initial release.
