/**
 * Add /lib directory of the npm/node process's working directory(cwd) to the
 * path where modules are searched (additionally to node_modules).
 * In combination with tsconfig's baseUrl "src" allows to use non-realtive paths (*cough)
 * , that should be module id's.
 * See
 * - https://gist.github.com/branneman/8048520
 * - https://github.com/patrick-steele-idem/app-module-path-node
 * - https://github.com/mochajs/mocha/issues/1762
 * See also
 * - https://github.com/balderdashy/sails-docs/blob/master/concepts/Testing/Testing.md
 * Needless to say that those calls must be done BEFORE  the loading/import of the first module.
 */
require('app-module-path').addPath(process.cwd() + "/lib")