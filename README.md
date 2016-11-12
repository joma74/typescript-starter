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
`watch:clean:tsc` runs watch on `src/**/*.ts`. On change it runs `clean:tsc`

`clean:tsc` removes anything under `lib/*` and runs tsc*(typescript compiler)*

`test` runs `mocha` with opts

`tsc:trace` runs tsc with trace resolution log debugging on

# After-Checkout Instructions
```bash
npm install
npm run watch:clean:tsc
npm run test
```
# References
- https://github.com/grncdr/npm-watch
- https://github.com/patrick-steele-idem/app-module-path-node
- https://github.com/typings/typings
- https://mochajs.org/
- https://www.typescriptlang.org/docs/handbook/compiler-options.html
- https://www.typescriptlang.org/docs/handbook/module-resolution.html
- http://wiki.commonjs.org/wiki/Modules

# TODO
- Code Coverage
