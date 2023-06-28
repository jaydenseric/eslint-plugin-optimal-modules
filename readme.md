# eslint-plugin-optimal-modules

Asserts a string matches a snapshot saved in a file. An environment variable can be used to save rather than assert snapshots.

## Installation

To install [`eslint-plugin-optimal-modules`](https://npm.im/eslint-plugin-optimal-modules) with [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), run:

```sh
npm install eslint-plugin-optimal-modules --save-dev
```

To use the [recommended config](#config-recommended), add the following ESLint config:

```json
{
  "extends": ["plugin:optimal-modules/recommended"]
}
```

Alternatively, manually configure the plugin and the desired rules:

```json
{
  "plugins": ["optimal-modules"],
  "rules": {
    "optimal-modules/no-named-exports": "error"
  }
}
```

## Rules

### Rule `no-named-exports`

Prohibits using named exports for [optimal module design](https://jaydenseric.com/blog/optimal-javascript-module-design).

**Valid** examples:

```js
// No exports.
const a = true;
```

```js
// Default export.
export default true;
```

```js
// Default export.
const a = true;
export { a as default };
```

```ts
// TypeScript type default export.
type A = boolean;
export type { A as default };
```

**Invalid** examples:

```js
// Named export.
export const a = true;
```

```js
// Named export.
const a = true;
export { a };
```

```ts
// TypeScript type named export.
export type A = boolean;
```

To fix the above errors, move the thing being exported to its own module as a default export.

## Configs

### Config `recommended`

Enabled rules:

- [`no-named-exports`](#rule-no-named-exports) (error).

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `>=18.0.0`.

Projects must configure [TypeScript](https://typescriptlang.org) to use types from the CommonJS modules that have a `// @ts-check` comment:

- [`compilerOptions.allowJs`](https://typescriptlang.org/tsconfig#allowJs) should be `true`.
- [`compilerOptions.maxNodeModuleJsDepth`](https://typescriptlang.org/tsconfig#maxNodeModuleJsDepth) should be reasonably large, e.g. `10`.
- [`compilerOptions.module`](https://typescriptlang.org/tsconfig#module) should be `"node16"` or `"nodenext"`.

## Exports

These CommonJS modules are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- [`eslintPluginOptimalModules.js`](./eslintPluginOptimalModules.js)
