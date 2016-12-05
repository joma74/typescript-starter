var assert = require('assert');

describe('CoercionQuirks#Boolean', () => {
    it('#1.1 undefined is contained in falsy list', () => {
        assert.equal(Boolean(undefined), false);
    });
    it('#1.2 null is contained in falsy list', () => {
        assert.equal(Boolean(null), false);
    });
    it('#1.3 false is contained in falsy list', () => {
        assert.equal(Boolean(undefined), false);
        assert.equal(Boolean(null), false);
        assert.equal(Boolean(false), false);
    });
    it('#1.4 +0/-0 is contained in falsy list, undefined', () => {
        assert.equal(Boolean(+0), false);
        assert.equal(Boolean(-0), false);
        assert.equal(Boolean(0), false);
    });
    it('#1.5 NaN is contained in falsy list', () => {
        assert.equal(Boolean(NaN), false);
    });
    it('#1.6.1 \"\" is contained in falsy list', () => {
        assert.equal(Boolean(""), false);
        assert.equal(Boolean(""), 0);
    });
    it('#1.7 outcrossing elements of falsy list', () => {
        const isFalse : any = false; // for error TS2365: Operator '==' cannot be applied to ...
        const anEmptyString : any = ""; // for error TS2365: Operator '==' cannot be applied to ...
        const isNull : any = null; // for error TS2365: Operator '==' cannot be applied to ...
        assert.equal(Boolean(""), false);
        assert.equal(Boolean(""), 0);
        assert.equal(Boolean(""), Boolean(""));
        assert.equal("", false); // Jikes!
        assert.ok(anEmptyString == false); // Jikes! TS2365
        assert.equal("", 0); // Jikes!
        assert.ok(anEmptyString == 0); // Jikes! TS2365
        assert.equal("", Boolean(""));
        assert.equal(isFalse, false); // / TS2365
        assert.equal(false, 0);
        assert.ok(isFalse == 0); // Jikes  TS2365
        assert.equal(false, Boolean(""));
        assert.equal(Boolean(null), false);
        assert.ok(null != false); // no action for toBoolean
        assert.equal(Boolean(null), 0);
        assert.ok(null != Boolean(null)); // null != 0
        assert.ok(null != 0); // no action for toBoolean
        assert.equal(Boolean(null), Boolean(null));
    });
    it('#2 to boolean via unary operator !', () => {
        assert.equal(!!"", false); // unary ! negate operator explicitly coerces a value to a boolean. It also
        // flips the value from truthy to falsy or vice versa.
    });
    it('#3.1 to boolean impicit via if', () => {
        let passedBy = false;
        if (42) {
            passedBy = true;
        }
        assert.equal(passedBy, true);
    });
    it('#3.2 to boolean impicit via while', () => {
        let passedBy = false;
        while (undefined) {
            passedBy = true;
        }
        assert.equal(passedBy, false);
    });
    it('#4 Yikes, && and || produced value will be one of the two operand expression!', () => {
        // ES5 spec from section 11.11: The value produced by a && or || operator is not necessarily of type Boolean.
        // The value produced will always be the value of one of the two operand expressions.
        let a = 42;
        let b = "abc";
        assert.equal(a || b, 42);
        assert.equal(a ? a : b, 42);
        //
        assert.equal(a && b, "abc");
        assert.equal(a ? b : a, "abc");
        //
        let c = null;
        let d = "abc";
        assert.equal(c || d, "abc");
        assert.equal(c && d, null);
    });
});