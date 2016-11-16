Starter for Typescript featuring
- modules
- unit testing
- well, Typescript

# Source Code Organisation
- Module source is under `src/main/*`
- Test source is under `src/test/*`
- Per Typescript compiled JS source is under `lib/*`

# Test Integration
Tests are done with *mocha*. Which integrates with *commonjs* \- nodes's standard loader \- quite nicely. Typescript is
 therefore configured to generates ES 5 code for usage by a commonjs loader
```js
var Calculator_1 = require("main/calculation/Calculator");
```
Not so nice is Node's api/standard to not support adding another path to it's module lookup. This would be handy to make `require` work with non-relative module paths under development. Because i am of the opinion that non-relative module paths resemble the idea of a module reference *by id* more closely than that of a module reference *by path*. Howsoever, non-relative module paths were solved for a Node environment by
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
For Intellij users a shared run configurations are checked in. See for example `.idea/runConfigurations/Calculator_Suite_Run.xml`. This enables breakpoints in the `*.ts` files of `test` and `main`, as both sources are compiled with sourceMap support. Note that one has to specify the transpiled `*.js` program versions. For example to run/debug the Calculator suite in mocha the file `lib/test/calculation/Calculator.spec.js` has be be defined as "test file" option of IntelliJ`s "Calculator Suite Run".

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
So you just have to launch Chrome and insert that URL into Chrome's navigation address field. This triggers Chrome's debugger and it will stop at the first executed line.

After the debugged program is exited a console message `Waiting for the debugger to disconnect...` is displayed. At this point you should "refresh"/F5 Chrome, which disconnects the debugger. Leave Chrome open if you plan to restart debugging, as this same Chrome instance will be reused.

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

# TODO
1. resolve `outDir` from `tsconfig.json` to be used by `mocha.opts` and `clean` task
3. find out how to add `*.ts` files as source of sourceMaps to Chrome debugger
4. despite of `let` the index variable `i` in the array `namesOfCast[i]` of `Varquirks.ts` quirkly again always resolves to 2. As soon as `i` is accessed otherwise - even by coding `i;` or `console.log(i);` - the scoping behaviour of `let` is restored!

##Coverage Report
```bash
/home/joma/dev/programme/node-v6.5.0-linux-x64/bin/node /home/joma/dev/programme/node-v6.5.0-linux-x64/lib/node_modules/npm/bin/npm-cli.js run-script test:test

> typescript-starter@1.0.0-SNAPSHOT-1 test:test /home/joma/entwicklung/nodews/typescript-starter
> npm run test:clean && nyc mocha --opts src/test/mocha.opts


> typescript-starter@1.0.0-SNAPSHOT-1 test:clean /home/joma/entwicklung/nodews/typescript-starter
> rimraf coverage/* || rimraf .nyc_output/*  true


  ․ Calculator #add should add two numbers together: 0ms
  ․ Point #iTakePoint2D should accept type Point2D: 0ms
  ․ Point #iTakePoint2D should accept duck type Point3D: 0ms
  ․ Varquirks #loopArrayInDelayedCallback_quirked should quirk fetch any fetchedCast to Alex: 502ms
  ․ Varquirks #loopArrayInDelayedCallback_fix_1 should fetch any fetchedCast to it´s cast: 752ms
  ․ Varquirks #loopArrayInDelayedCallback_fix_2 should fetch any fetchedCast to it´s cast: 752ms
  ․ ZipCodeValidator #isAcceptable should accept valid american zipcode: 1ms
  ․ ZipCodeValidator #isAcceptable should not accept invalid american zipcode: 0ms

  8 passing (2s)

File [/home/joma/entwicklung/nodews/typescript-starter/lib/main/validation/StringValidator.js] ignored, nothing could be mapped
----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
All files             |      100 |      100 |      100 |      100 |                |
 calculation          |      100 |      100 |      100 |      100 |                |
  Calculator.ts       |      100 |      100 |      100 |      100 |                |
 interfaces           |      100 |      100 |      100 |      100 |                |
  Point.ts            |      100 |      100 |      100 |      100 |                |
 quirks               |      100 |      100 |      100 |      100 |                |
  Varquirks.ts        |      100 |      100 |      100 |      100 |                |
 validation           |      100 |      100 |      100 |      100 |                |
  AllValidators.ts    |      100 |      100 |      100 |      100 |                |
  ZipCodeValidator.ts |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|

Process finished with exit code 0
```
