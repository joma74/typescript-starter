import Calculator from "main/calculation/Calculator";

describe('Calculator', () => {
    var subject: Calculator;

    beforeEach(function () {
        subject = new Calculator();
    });

    describe('#add', () => {
        it('should add two numbers together', () => {
            var result: number = Calculator.add(2, 3);
            if (result != 5) {
                throw new Error('Expected 2+3=5 but was ' + result);
            }
        });
    });
});


