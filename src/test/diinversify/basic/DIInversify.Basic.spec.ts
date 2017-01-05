import {myContainer} from "main/diinversify/basic/config/inversify.config";
import {IWarrior} from "main/diinversify/basic/intfcs/IWarrior";
var assert = require('assert')
    ;

describe('DIInversify#basics', () => {
    it('#1 test as in online basic example', () => {
        // see https://github.com/inversify/InversifyJS
        let ninja = myContainer.get<IWarrior>(IWarrior.TYPE.NAME);
        assert.equal(ninja.fight(), "cut!");
        assert.equal(ninja.sneak(), "hit!");
    });
})
;