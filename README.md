Starter for Typescript featuring
- modules
- unit testing
- well, Typescript

Setup
=====
Compiled JS files Target dir lib/*
Tests are under src/test/*
Module code is under src/main/*

Test are done with mocha. Which integrates with commonjs
- nodes's standard loader - quite nicely. Typescript is
therefore configured to generate commonjs loader
```js
require("module");
```
Not so nice is node's api/standard to add another path to
for it's module lookup via require. See `Calculator.spec.ts`
what has to be done.

After checkout
===============
npm install
npm run tsc:watch
npm run test

TODO
====
- Investigate solution for cleanup lib dir
- Extract module lookup setup somewhere more common
