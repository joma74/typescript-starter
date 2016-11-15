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

# Debug instructions
For Intellij users a shared run configuration is checked in at  `.idea/runConfigurations/Calculator_Suite_Run.xml`. This enables breakpoints in the `*.ts` files of test and main, as both sources are compiled with sourceMap support. Note that one has to specify the transpiled program versions e.g. to run/debug the Calculator suite in mocha the file `/home/joma/dev/nodews/typescript-starter/lib/test/calculation/Calculator.spec.js` has be be defined as "test file" option of "Calculator Suite Run".

For command-line users initialising a debugging session of the above "Calculator Suite" can be started with
```bash
node --debug-brk --inspect=18085 /home/joma/dev/nodews/typescript-starter/node_modules/mocha/bin/_mocha --opts src/test/mocha.opts --timeout 0 /home/joma/dev/nodews/typescript-starter/lib/test/calculation/Calculator.spec.js --grep "Calculator "
```
Which prints the following to the same console
```bash
Debugger listening on port 18085.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@62cd277117e6f8ec53e31b1be58290a6f7ab42ef/inspector.html?experiments=true&v8only=true&ws=localhost:18085/node
```
So you have to launch Chrome and insert the URL into it's navigation address field. This triggers implicitly Chrome's debugger and stops at the first executed line.

P.S. After the debugged program is exited a console message `Waiting for the debugger to disconnect...` is displayed. At this point you should "refresh"/F5 Chrome, which disconnects the debugger. Leave Chrome open if you plan to restart debugging, as this same Chrome instance will be reused.

# References
- https://github.com/grncdr/npm-watch
- https://github.com/patrick-steele-idem/app-module-path-node
- https://github.com/typings/typings
- https://mochajs.org/
- https://www.typescriptlang.org/docs/handbook/compiler-options.html
- https://www.typescriptlang.org/docs/handbook/module-resolution.html
- http://wiki.commonjs.org/wiki/Modules
- https://istanbul.js.org/docs/tutorials/mocha/
- https://nodejs.org/api/debugger.html
- http://javascriptissexy.com/javascript-variable-scope-and-hoisting-explained/

# NOTES
- coverage of test sources `*.spec.ts` is currently included in the report, see [Coverage Report](#coverage-report). See TODO #2.

# TODO
1. resolve `outDir` from `tsconfig.json` to be used by `mocha.opts` and `clean` task
2. excluding `.spec.ts` from being covered via `nyc --exclude` gives strange results that merit an *nyc* issue report.
3. find out how to add *.ts files as source of sourceMaps to Chrome debugger
4. despite of `let` the index variable `i` the array `namesOfCast[i]` of in `Varquirks.ts` quirkly again always resolves to 2, if `i` is not accessed otherwise - even by coding `i;` ?!

##Coverage Report
```bash
joma@kopernikus-u:~/dev/nodews/typescript-starter-co$ npm run test:test

> typescript-starter@1.0.0-SNAPSHOT-1 test:test /home/joma/entwicklung/nodews/typescript-starter-co
> npm run test:clean && nyc --reporter=html --reporter=text mocha --opts src/test/mocha.opts


> typescript-starter@1.0.0-SNAPSHOT-1 test:clean /home/joma/entwicklung/nodews/typescript-starter-co
> rimraf coverage/* || rimraf .nyc_output/*  true


  ․ Calculator #add should add two numbers together: 0ms

  1 passing (8ms)

---------------------|----------|----------|----------|----------|----------------|
File                 |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
---------------------|----------|----------|----------|----------|----------------|
All files            |    92.86 |       50 |      100 |    92.31 |                |
 main/calculation    |      100 |      100 |      100 |      100 |                |
  Calculator.ts      |      100 |      100 |      100 |      100 |                |
 test/calculation    |    88.89 |       50 |      100 |    88.89 |                |
  Calculator.spec.ts |    88.89 |       50 |      100 |    88.89 |             14 |
---------------------|----------|----------|----------|----------|----------------|
```
