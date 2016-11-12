/**
 * https://gist.github.com/branneman/8048520
 * https://github.com/patrick-steele-idem/app-module-path-node
 * Add /lib directory of the npm/node process's working directory(cwd) to the
 * path where modules are searched (additionally to node_modules).
 * In combination with tsconfig's baseUrl "src" allows to use non-realtive paths (*cough)
 * , that should be module id's.
 *
 * Needless to say that those calls must be done BEFORE  the loading/import of the first module.
 */
import {addPath} from "app-module-path";
addPath(process.cwd() + "/lib")

import Calculator from "main/calculation/Calculator";

describe('Calculator', () => {
    var subject: Calculator;

    beforeEach(function () {
        subject = new Calculator();
    });

    describe('#add', () => {
        it('should add two numbers together', () => {
            var result: number = subject.add(2, 3);
            if (result != 5) {
                throw new Error('Expected 2+3=5 but was ' + result);
            }
        });
    });
});


