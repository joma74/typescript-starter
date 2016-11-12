Starter for Typescript featuring
- modules
- unit testing
- well, Typescript

Setup
=====
- Compiled JS files Target dir lib/*
- Tests are under src/test/*
- Module code is under src/main/*

Test are done with mocha. Which integrates with commonjs
\- nodes's standard loader \- quite nicely. Typescript is
therefore configured to generate commonjs loader
```js
require("module");
```
Not so nice is node's api/standard to add another path to it's module lookup via require.
This is solved for a Node environment by
- `src/test/bootstrap.test.js` which add's the 'lib/' folder as an additional Node's root lookup path
- `src/test/mocha.opts` which executes `src/test/bootstrap.test.js` before mocha and tests are loaded

After checkout
===============
npm install
npm run tsc:watch
npm run test

TODO
====
- Investigate solution for cleanup of /lib dir before build
