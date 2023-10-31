[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/npm/l/esm-module-alias.svg)](https://github.com/euberdeveloper/esm-module-alias/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/esm-module-alias.svg)](https://github.com/euberdeveloper/esm-module-alias/issues)
[![GitHub stars](https://img.shields.io/github/stars/euberdeveloper/esm-module-alias.svg)](https://github.com/euberdeveloper/esm-module-alias/stargazers)
![npm](https://img.shields.io/npm/v/esm-module-alias.svg)


# esm-module-alias
An alternative to module-alias, but for esm

## Project purpose

The purpose of this project is allowing developers that use **esm** modules to have a feature similar to the one provided by **[module alias](https://www.npmjs.com/package/module-alias)**.

*module-alias* provides the possibility to alias modules to a different path, taking the same example that is used in its documentation:

```js
require('../../../../some/very/deep/module');
```

can become:

```js
import module from '@deep/module';
```

To allow this, one should add some paths to the `package.json`, like:
```json
{
    "aliases": {
        "@deep": "src/some/very/deep"
    }
}
```

The module stopped working after the introduction of the [**esm**](https://nodejs.org/api/esm.html) in NodeJS. In addition, at the moment in which this README was written, *module-alias* was last published three years ago.

## How to pass to esm

Taken from this [fantastic guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):

- Add `"type": "module"` to your package.json.
- Replace `"main": "index.js"` with `"exports": "./index.js"` in your package.json.
- Update the `"engines"` field in package.json to Node.js 14: `"node": ">=14.16"`. (Excluding Node.js 12 as it's no longer supported)
- Remove `'use strict';` from all JavaScript files.
- Replace all `require()`/`module.export` with `import`/`export`.
- Use only full relative file paths for imports: `import x from '.';` → `import x from './index.js';`.
- If you have a TypeScript type definition (for example, `index.d.ts`), update it to use ESM imports/exports.
- Optional but recommended, use the [`node:` protocol](https://nodejs.org/api/esm.html#esm_node_imports) for imports.

## How to use this module to continue using the module aliases

To use this module:
* Install the module by exeuting 
  ```bash
  $ npm install esm-module-alias
  ```
* Add the property `aliases` to the `package.json`, the same way you would have done with `module-alias`, for example:
  ```json
  {
    "aliases": {
        "@root"      : ".",
        "@deep"      : "src/some/very/deep/directory/or/file",
        "@my_module" : "lib/some-file.js",
        "something"  : "src/foo"
    }
  }
  ```
* When you execute your script, **add this module as a loader** by adding `--loader esm-module-alias/loader`, for example:
    ```bash
    node --loader esm-module-alias/loader --no-warnings myscript.js # Note that --no-warnings is to disable a warning and is optional
    ```

## An option if you want to create a custom loader

You can also create a custom loader, because the library exports a function that given an object like the `aliases` one that one would define in the `package.json`, will return a function that will be used as a loader.

To do so:

* Create a custom file named as you want, for instance `my-loader.mjs`:
  ```js
  import generateAliasesResolver from 'esm-module-alias'; 
  const aliases = {
    "@root": ".",
    "@deep": "src/some/very/deep/directory/or/file",
    "@my_module": "lib/some-file.js",
    "something": "src/foo"
  };
  export const resolve = generateAliasesResolver(aliases);
  ```
* When you execute your script, **add that script as a loader** by adding `--loader ./my-loader.mjs`, for example:
    ```bash
    node --loader=./my-loader.mjs --no-warnings myscript.js # Note that --no-warnings is to disable a warning and is optional
    ```
    
## What if you want to change the matching behaviour?

You can also have a custom matcher, a function that customize the behaviour of a path matching an alias.

To do so:

* Create a custom file named as you want, for instance `my-loader.mjs`:
  ```js
  import generateAliasesResolver from 'esm-module-alias'; 
  const aliases = {
    "@root": ".",
    "@deep": "src/some/very/deep/directory/or/file",
    "@my_module": "lib/some-file.js",
    "something": "src/foo"
  };
  const matcher = (path, alias) => {
    return (path.indexOf(alias) === 0); // Your customized code
  }; 
  export const resolve = generateAliasesResolver(aliases, { matcher }); // The custom matcher is passed to the options
  ```
* When you execute your script, **add that script as a loader** by adding `--loader ./my-loader.mjs`, for example:
    ```bash
    node --loader=./my-loader.mjs --no-warnings myscript.js # Note that --no-warnings is to disable a warning and is optional
    ```

## Tests

Tests are run with **[Jest](https://jestjs.io/)** and work by executing `npm test` with **[shelljs](https://https://www.npmjs.com/package/shelljs)** on a bunch of sample projects,

## Note

This package took inspiration from [a comment of a Github issue](https://github.com/ilearnio/module-alias/issues/59#issuecomment-500480450)