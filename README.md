Starter for Typescript featuring
- modules
- unit testing
- well, Typescript

# Source Organisation
- Module source is under `src/main/*`
- Test source is under `src/test/*`
- Per Typescript compiled JS source is under `lib/*`

# Test Integration
Tests are done with *mocha*. Which integrates with *commonjs* \- nodes's standard loader \- quite nicely. Typescript is
 therefore configured to generates ES 5 code for usage by a commonjs loader
```js
var Calculator_1 = require("main/calculation/Calculator");
```
Not so nice is Node's api/standard to allow for adding another path to it's module lookup. This would be handy to make `require` work with non-relative module paths under development - which resembles the idea of a module reference *by id* more closely than that of a module reference *by path*.

This is resolved for a Node environment by
- `src/test/bootstrap.test.js` which add's the `lib/` folder as an additional Node's lookup root path
- `src/test/mocha.opts` which executes `src/test/bootstrap.test.js` BEFORE mocha and tests. And hence before module imports are loaded.

# NPM Run Description
`build:compile` runs `build:clean` followed by `tsc:compile`

`build:clean` runs cleaning of tsc's outDir

`build:watch` runs watch on `src/*`. On watched changes it runs `build:compile`

`coverage:report:open` opens the coverage report

`init:typings` runs installation of typings

`postinstall` runs `init:typings`

`test:clean` runs cleaning of coverage directories

`test:test` runs `test:clean`, then `nyc` coverage with `mocha` configured by `--opts`.

`tsc:compile` runs `tsc`(*TypeScript Compiler*)

`tsc:compile:trace` runs `tsc` with trace resolution log debugging on


# After-Checkout Instructions
```bash
npm install
npm run build:watch
npm run test:test
```
# References
- https://github.com/grncdr/npm-watch
- https://github.com/patrick-steele-idem/app-module-path-node
- https://github.com/typings/typings
- https://mochajs.org/
- https://www.typescriptlang.org/docs/handbook/compiler-options.html
- https://www.typescriptlang.org/docs/handbook/module-resolution.html
- http://wiki.commonjs.org/wiki/Modules
- https://istanbul.js.org/docs/tutorials/mocha/

# NOTES
- coverage of test sources `*.spec.ts` is currently included in the report. See TODO #2.

# TODO
1. resolve `outDir` from `tsconfig.json` to be used by `mocha.opts` and `clean` task
2. excluding `.spec.ts` from being covered via `nyc --exclude` gives strange results that merit an *nyc* issue investigation.
