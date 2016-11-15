import Calculator from "main/calculation/Calculator";
var assert = require('assert');

describe('Calculator', () => {
    var subject: Calculator;

    beforeEach(function () {
        subject = new Calculator();
    });

    describe('#add', () => {
        it('should add two numbers together', () => {
            var result: number = Calculator.add(2, 3);
            assert.equal(result, 5);
        });
    });
});


