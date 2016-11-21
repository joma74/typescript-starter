import {reverseStringNaive, reverseStringEsrever, numbersWithinEpsilon, getObject} from "main/quirks/Typesquirks";

var assert = require('assert');

describe('Typesquirks', () => {
    describe('#reverseStringNaive', () => {
        it('should quirkly reverse a spanish unicode string', () => {
            let candidate: string = "mañana mañana";
            let actual: string = reverseStringNaive(candidate);
            assert.equal(actual, "anãnam ana\u00F1am");
        });
        it('should quirkly reverse a german-chinese unicode string', () => {
            let candidate: string = "hällö 𝌆 duriÖ";
            let actual: string = reverseStringNaive(candidate);
            let expected: string = "Öirud \uDF06\uD834 ölläh";
            assert.equal(actual, expected);
        });
    });
    describe('#reverseStringEsrever', () => {
        it('should reverse a spanish unicode string', () => {
            let candidate: string = "mañana mañana";
            let actual: string = reverseStringEsrever(candidate);
            assert.equal(actual, "anañam anañam");
        });
        it('should reverse a german-chinese unicode string', () => {
            let candidate: string = "hällö 𝌆 duriÖ";
            let actual: string = reverseStringEsrever(candidate);
            assert.equal(actual, "Öirud 𝌆 ölläh");
        });
    });
    describe('#compareTwoFloats', () => {
        it('should quirkly compare two small floats', () => {
            let actual: number = 0.1 + 0.2;
            assert.notEqual(actual, 0.3);
        });
        it('should compare two small floats within Number.EXPSILON', () => {
            let actual: number = 0.1 + 0.2;
            assert.ok(numbersWithinEpsilon(actual, 0.3));
        });
    });
    describe('#getObject', () => {
        it('should destructure', () => {
            let {a, b} = getObject({c: 42, d: "foo"});
            assert.equal(a, 24);
            assert.equal(b, "oof");
        });
    });
    describe('NumberCases', () => {
        it('isNaN', () => {
            let dividend = 2;
            let divisor: any = "foo";
            let quotient = dividend / divisor;
            assert.ok(isNaN(quotient));
            // in ES6, Number.isNaN() should be used
        });
        it('NaN is never equal to itself', () => {
            let dividend = 2;
            let divisor: any = "foo";
            let quotient_1 = dividend / divisor;
            let quotient_2 = dividend / divisor;
            assert.ok(quotient_1 != quotient_2);
            assert.ok(quotient_1 !== quotient_2);
        });
        it('isNaN_quirked', () => {
            var b: any = "foo";
            assert.ok(isNaN(b));
        });
        it('-0 and +0 zeros', () => {
            assert.ok(-0 == 0);
            assert.ok(-0 === 0);
        });
    });
});
