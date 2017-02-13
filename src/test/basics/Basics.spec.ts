var assert = require('assert');

describe('Javascript#basics', () => {
    describe('Arrays', () => {
        describe('append content of array#2 to array#1' , () => {
            it('#1 via array1.push.apply', () => {
                let array1: any[] = [{name: 'A'}, {name: 'B'}];
                let array2: any[] = [{name: 'C'}, {name: 'D'}];
                let array_expected: any[] = [{name: 'A'}, {name: 'B'}, {name: 'C'}, {name: 'D'}];
                array1.push.apply(array1, array2);
                assert.deepEqual(array1, array_expected);
            });
            it('#2 via Array.prototype.push.apply', () => {
                let array1: any[] = [{name: 'A'}, {name: 'B'}];
                let array2: any[] = [{name: 'C'}, {name: 'D'}];
                let array_expected: any[] = [{name: 'A'}, {name: 'B'}, {name: 'C'}, {name: 'D'}];
                Array.prototype.push.apply(array1, array2);
                assert.deepEqual(array1, array_expected);
            });
            it('#3 via forEach and push', () => {
                let array1: any[] = [{name: 'A'}, {name: 'B'}];
                let array2: any[] = [{name: 'C'}, {name: 'D'}];
                let array_expected: any[] = [{name: 'A'}, {name: 'B'}, {name: 'C'}, {name: 'D'}];
                array2.forEach(function(el){array1.push(el)});
                assert.deepEqual(array1, array_expected);
            });
            it('#4 via push and ES6 spread', () => {
                let array1: any[] = [{name: 'A'}, {name: 'B'}];
                let array2: any[] = [{name: 'C'}, {name: 'D'}];
                let array_expected: any[] = [{name: 'A'}, {name: 'B'}, {name: 'C'}, {name: 'D'}];
                array1.push(...array2);
                assert.deepEqual(array1, array_expected);
            });
        })
        ;
    })
    ;
})
;