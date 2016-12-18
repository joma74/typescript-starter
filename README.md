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
For Intellij users shared run configurations are checked in. See for example `.idea/runConfigurations/Calculator_Suite_Run.xml`. This enables breakpoints in the `*.ts` files of `test` and `main`, as both sources are compiled with sourceMap support. Note that one has to specify the transpiled `*.js` program versions. For example to run/debug the Calculator suite in mocha the file `lib/test/calculation/Calculator.spec.js` has be be defined as "test file" option of IntelliJ`s "Calculator Suite Run".

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
- https://github.com/getify/You-Dont-Know-JS

# NOTES
## Iteration of arrays
Despite of `for (let i in namesOfCast)` the index variable `i` in the array `namesOfCast[i]` of `Varquirks.ts#loopArrayInDelayedCallback_fix_1_forIn` quirkly again always resolves to 2. As soon as `i` is accessed otherwise - even by coding `i;` or `console.log(i);` - the scoping behaviour of `let` is restored! Community says that `for...in` should be used only for objects, not arrays. For arrays rather use
- `for...of`
- `forEach(..)`
- `every(..)`
- `some(..)`
- standard `for` loops

`Varquirks.ts#loopArrayInDelayedCallback_fix_2_forOf`, `Varquirks.ts#loopArrayInDelayedCallback_fix_3_forEach` and `Varquirks.ts#loopArrayInDelayedCallback_fix_4_every` show that those work quirklessly.

# TODO
1. Resolve `outDir` from `tsconfig.json` to be used by `mocha.opts` and `clean` task
3. Find out how to add `*.ts` files as source of sourceMaps to Chrome debugger


##Test and Coverage Report
```bash
/home/joma/dev/programme/node-v6.5.0-linux-x64/bin/node /home/joma/dev/programme/node-v6.5.0-linux-x64/lib/node_modules/npm/bin/npm-cli.js run test:test

> typescript-starter@1.0.0-SNAPSHOT-1 test:test /home/joma/entwicklung/nodews/typescript-starter
> npm run test:clean && nyc mocha --opts src/test/mocha.opts


> typescript-starter@1.0.0-SNAPSHOT-1 test:clean /home/joma/entwicklung/nodews/typescript-starter
> rimraf coverage/* || rimraf .nyc_output/*  true


  ․ Calculator #add should add two numbers together: 0ms
  ․ Point #iTakePoint2D should accept type Point2D: 0ms
  ․ Point #iTakePoint2D should accept duck type Point3D: 0ms
  ․ CoercionQuirks#Boolean #1.1 undefined is contained in falsy list: 1ms
  ․ CoercionQuirks#Boolean #1.2 null is contained in falsy list: 0ms
  ․ CoercionQuirks#Boolean #1.3 false is contained in falsy list: 0ms
  ․ CoercionQuirks#Boolean #1.4 +0/-0 is contained in falsy list, undefined: 0ms
  ․ CoercionQuirks#Boolean #1.5 NaN is contained in falsy list: 0ms
  ․ CoercionQuirks#Boolean #1.6.1 "" is contained in falsy list: 0ms
  ․ CoercionQuirks#Boolean #1.7 outcrossing elements of falsy list: 0ms
  ․ CoercionQuirks#Boolean #2 to boolean via unary operator !: 0ms
  ․ CoercionQuirks#Boolean #3.1 to boolean impicit via if: 0ms
  ․ CoercionQuirks#Boolean #3.2 to boolean impicit via while: 0ms
  ․ CoercionQuirks#Boolean #4.1 Yikes, && and || produced value will be one of the two operand expression!: 0ms
  ․ CoercionQuirks#Boolean #4.2 && comes handy for null parameter checks: 0ms
  ․ CoercionQuirks#Boolean #4.3 || comes handy for default parameters: 0ms
  ․ CoercionQuirks#Date #1 explicit to number via unary: 1ms
  ․ CoercionQuirks#Date #2 explicit to number via getTime(): 0ms
  ․ CoercionQuirks#String&Number #1.1 toNumber via any numeric operation EXCEPT +: 0ms
  ․ CoercionQuirks#String&Number #1.2 toNumber via native constructor: 0ms
  ․ CoercionQuirks#String&Number #1.3 toNumber via native constructor fails with NaN on non-numeric characters: 0ms
  ․ CoercionQuirks#String&Number #1.4 toNumber via parseInt: 0ms
  ․ CoercionQuirks#String&Number #1.5 toNumber via unary operator +: 0ms
  ․ CoercionQuirks#String&Number #1.6.1 toNumber via bitwise | (ToInt32) conversion: 0ms
  ․ CoercionQuirks#String&Number #1.6.2 toNumber via bitwise ~ (ToInt32) conversion: 0ms
  ․ CoercionQuirks#String&Number #1.6.3 toNumber ~ conversion of sentinel numbers transform to appropriately boolean-coercible: 0ms
  ․ CoercionQuirks#String&Number #1.7 octal parseInt with leading 0-s yiked pre ES5: 0ms
  ․ CoercionQuirks#String&Number #1.8 toNumber any whitspace(" ",\n,\r,\t) is 0: 0ms
  ․ CoercionQuirks#String&Number #8.1 to string via native constructors: 0ms
  ․ CoercionQuirks#String&Number #8.2 to string of [object Array] via concatenation operator +: 0ms
  ․ CoercionQuirks#String&Number #8.3 to string of integer primitive via concatenation operator +: 0ms
  ․ CoercionQuirks#String&Number #8.4 to string via var object wrapper: 0ms
  ․ CoercionQuirks#[object ...] #1 with [object Array] toString yields "i0,i1,..": 0ms
  ․ CoercionQuirks#[object ...] #2 any [object xxx] is loose equal and strict equal to itself: 0ms
  ․ CoercionQuirks#[object ...] #3 with [object Array] valueOf yields itself as primitive value: 0ms
  ․ CoercionQuirks#[object ...] #4 with [object Object] override valueOf and result is primitive: 1ms
  ․ CoercionQuirks#[object ...] #5.1 with [object Object] override valueOf is not primitive and toString result is primitive: 0ms
  ․ CoercionQuirks#[object ...] #5.2 with [object Object] override toString and result is primitive: 0ms
  ․ CoercionQuirks#[object ...] #6 with [object Array] override toString and result is primitive: 0ms
  ․ CoercionQuirks#[object ...] #7.1 when not any coercible primitive is found, throw TypeError: 1ms
  ․ CoercionQuirks#[object ...] #7.2 when not any coercible primitive is found, throw TypeError: 0ms
  ․ EqualityQuirks #1 === no coercion allowed: 0ms
  ․ EqualityQuirks #2 == string coerces to number: 0ms
  ․ EqualityQuirks #3.1 == boolean coerces to number -> hence ever avoid using == true or == false: 0ms
  ․ EqualityQuirks #3.2 better do toBoolean explicitly: 0ms
  ․ EqualityQuirks #4 == null and undefined are both == to each other (yikes): 0ms
  ․ EqualityQuirks #5 == array is compared via toPrimitive : 0ms
  ․ EqualityQuirks #6.1 == object is compared via toPrimitive : 0ms
  ․ EqualityQuirks #6.2 == null object is compared via toPrimitive: 0ms
  ․ EqualityQuirks #6.3 == undefined object is compared via toPrimitive: 0ms
  ․ EqualityQuirks #7 [] == ![] Gotcha: 0ms
  ․ EqualityQuirks #8 [null] == "" Gotcha ([] or [null] toPrimitive is always ""): 0ms
  ․ EqualityQuirks #9 0 == "\n" Gotcha (any whitespace toNumber is 0): 0ms
  ․ GrammarQuirks #1.1 statement series operator "," strings multiple statements into one: 0ms
  ․ GrammarQuirks #1.2 but statement series operator "," has lowest precendence: 0ms
  ․ GrammarQuirks #2 labeled for() breaks: 0ms
  ․ GrammarQuirks #3.1 JSON is not valid Javascript: 0ms
  ․ GrammarQuirks #3.1 JSON-P(practice of wrapping the JSON data in a function call) makes JSON into valid JS grammar: 0ms
  ․ GrammarQuirks #4.1 Gotcha [] + {}: 0ms
  ․ GrammarQuirks #4.2 Gotcha {} + []: 0ms
  ․ GrammarQuirks #5.1 Object destructuring with variables: 0ms
  ․ GrammarQuirks #5.2 Object destructuring with named function arguments: 1ms
  ․ GrammarQuirks #6 Yikes! There is NO "else if" in JS: 0ms
  ․ GrammarQuirks #7 operator precedence && -> || -> = -> ,: 0ms
  ․ GrammarQuirks #8 ? ternary operator is right associative: 0ms
  ․ GrammarQuirks #9 = operator is right associative: 0ms
  ․ GrammarQuirks #10 7-to-9 complex precedence/associative roundup example: 0ms
  ․ GrammarQuirks #11 automatic semicolon insertion(ASI) by new line: 0ms
  ․ GrammarQuirks #12.1 default parameter value applied if omitted or undefined: 1ms
  ․ GrammarQuirks #12.2 in strict mode linkage does not exist: 0ms
  ․ GrammarQuirks #12.3 in non-strict mode linkage does exist: 0ms
  ․ GrammarQuirks #13 typeof is safe for undeclared unhoisted variables(commented out): 0ms
  ․ GrammarQuirks #14.1 throw in finally block overrides completion value: 0ms
  ․ GrammarQuirks #14.2 return in finally block overrides completion value if return in try block exists: 0ms
  ․ Jsonquirks #1.1 not-JSON-safes to undefined: 0ms
  ․ Jsonquirks #1.2 not-JSON-safes in arrays to null or omitted: 0ms
  ․ Jsonquirks #2 dequirk not-JSON-safes and circular refs with .toJson(): 0ms
  ․ Jsonquirks #3.1 JSON replacer with inclusion per property name array: 1ms
  ․ Jsonquirks #3.2 JSON replacer with function: 0ms
  ․ Jsonquirks #4.1 JSON prettyPrint with 3 spaces: 0ms
  ․ Jsonquirks #4.2 JSON prettyPrint with tabs: 0ms
  ․ RelationalQuirks #1 a < b forces toNumber if any side is a number: 0ms
  ․ RelationalQuirks #2 a < b forces lexicographic ToPrimitive if both sides are a strings: 0ms
  ․ RelationalQuirks #3 Yikes, a <= b does !(b < a): 0ms
  ․ Typesquirks #reverseStringNaive should quirkly reverse a spanish unicode string: 0ms
  ․ Typesquirks #reverseStringNaive should quirkly reverse a german-chinese unicode string: 0ms
  ․ Typesquirks #reverseStringEsrever should reverse a spanish unicode string: 0ms
  ․ Typesquirks #reverseStringEsrever should reverse a german-chinese unicode string: 0ms
  ․ Typesquirks #compareTwoFloats should quirkly compare two small floats: 0ms
  ․ Typesquirks #compareTwoFloats should compare two small floats within Number.EXPSILON: 0ms
  ․ Typesquirks #getObject should destructure: 0ms
  ․ Typesquirks NumberCases isNaN: 0ms
  ․ Typesquirks NumberCases NaN is never equal to itself: 0ms
  ․ Typesquirks NumberCases isNaN_quirked: 1ms
  ․ Typesquirks NumberCases -0 and +0 zeros: 0ms
  ․ Valuesquirks #1 Scalar primitives like number are always value-copy: 0ms
  ․ Valuesquirks #2.1 Compound values like array are always reference-copy: 0ms
  ․ Valuesquirks #2.2 array may be shallow value-copied via slice: 0ms
  ․ Valuesquirks #3 Variables are references, not pointers: 0ms
  ․ Valuesquirks #4 Scalar primitive objects are immutable: 1ms
  ․ Valuesquirks #5 null equals null and undefined equals undefined: 0ms
  ․ Valuesquirks #6.1 use null as an empty value: 0ms
  ․ Valuesquirks #6.2 use undefined as a missing value: 0ms
  ․ Valuesquirks #6.3 void "voids" any value to undefined: 0ms
  ․ Valuesquirks #7 evaluate typeness of primitive object wrappers: 0ms
  ․ Valuesquirks #8.1 Boxing wrappers provide prototype extension functions: 0ms
  ․ Valuesquirks #8.2 Boxing wrappers gotchas: 0ms
  ․ Valuesquirks #8.3 Unboxing of primitive object wrappers: 0ms
  ․ Valuesquirks #9.1 new Object()/Function()/Array()/Regex() and their equivalent literal form: 1ms
  ․ Valuesquirks #9.2 new Date()/Error() have no equivalent literal form: 0ms
  ․ Valuesquirks #9.3 null/undefined have no equivalent literal form: 0ms
  ․ Valuesquirks #9.4 without new they work as coercion: 0ms
  ․ Valuesquirks #9.5.1 Yikes, [null] toPrimitive yields straight "" (not "null"): 0ms
  ․ Valuesquirks #9.5.2 [] toPrimitive yields straight "": 0ms
  ․ Valuesquirks #10 1/0 is Infinity: 0ms
  ․ Varquirks #loopArrayInDelayedCallback_quirked should quirkly fetch any fetchedCast to Alex: 503ms
  ․ Varquirks #loopArrayInDelayedCallback_fix_1_forIn should fetch any fetchedCast to it´s cast: 502ms
  ․ Varquirks #loopArrayInDelayedCallback_fix_2_forOf should fetch any fetchedCast to it´s cast: 501ms
  ․ Varquirks #loopArrayInDelayedCallback_fix_3_forEach should fetch any fetchedCast to it´s cast: 502ms
  ․ Varquirks #loopArrayInDelayedCallback_fix_4_every should fetch any fetchedCast to it´s cast: 502ms
  ․ Varquirks #loopArrayInDelayedCallback_fix_5_IFFE should fetch any fetchedCast to it´s cast: 502ms
  ․ ZipCodeValidator #isAcceptable should accept valid american zipcode: 1ms
  ․ ZipCodeValidator #isAcceptable should not accept invalid american zipcode: 0ms

  123 passing (3s)

File [/home/joma/entwicklung/nodews/typescript-starter/lib/main/es6/NumberConstructor.js] ignored, nothing could be mapped
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
  Typesquirks.ts      |      100 |      100 |      100 |      100 |                |
  Varquirks.ts        |      100 |      100 |      100 |      100 |                |
 validation           |      100 |      100 |      100 |      100 |                |
  AllValidators.ts    |      100 |      100 |      100 |      100 |                |
  ZipCodeValidator.ts |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|

Process finished with exit code 0
```
