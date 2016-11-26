var assert = require('assert');

describe('CoercionQuirks#ToNumber#Of[object ...]', () => {
    it('#1 with [object Object] override valueOf and result is primitive', () => {
        let withValueOf = {
            valueOf: function () {
                return "42";
            }
        };
        assert.equal(withValueOf, 42);
    });
    it('#2.1 with [object Object] override valueOf is not primitive and toString  result is primitive', () => {
        let withToString = {
            valueOf: function () {
                return new Number(43); // [object Number], hence no primitive
            },
            toString: function () {
                return "42";
            }
        };
        assert.equal(Object.prototype.toString.call(withToString.valueOf()), "[object Number]"); // [object Number],
        // hence toString is used in search of primtive.
        assert.equal(withToString, 42);
    });
    it('#2.2 with [object Object] override toString and result is primitive', () => {
        let withToString = {
            toString: function () {
                return "42";
            }
        };
        assert.equal(withToString, 42);
    });
    it('#3 with [object Array] override toString and result is primitive', () => {
        let withArray: any = [4, 2]; // [object Array], hence no primitive
        assert.equal(Object.prototype.toString.call(withArray.valueOf()), "[object Array]"); // gives [object Array],
        // hence toString is used in search of primtive.
        withArray.toString = function () { // Let's define toString
            return this.join(""); // "42"
        };
        assert.equal(withArray, 42);
    });
    it('#4.1 when not any coercible primitive is found, throw TypeError', () => {
        let withNoPrimitive: any = {
            valueOf: function () {
                return new Number(42); // [object Number], hence no primitive
            },
            toString: function () {
                return new Number(42); // [object Number], hence no primitive
            }
        };
        assert.throws(function () {
            withNoPrimitive == 42
        }, TypeError); // TypeError: Cannot convert object to primitive value
    });
    it('#4.2 when not any coercible primitive is found, throw TypeError', () => {
        let withNoPrimitive: any = Object.create(null); // has a null value for its [[Prototype]]
        assert.throws(function () {
            withNoPrimitive == 42
        }, TypeError); // TypeError: Cannot convert object to primitive value
    });
});