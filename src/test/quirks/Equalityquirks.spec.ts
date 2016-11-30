var assert = require('assert');

describe('Equalityquirks', () => {
    it('#1 === no coercion allowed', () => {
        let a: any = 42;
        let b: any = "42";
        assert.ok(!(a === b));
    });
    it('#2 == string coerces to number ', () => {
        let a: any = 42;
        let b: any = "42";
        // ES5 spec, clauses 11.9.3.4-5
        // 1. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).
        // 2. If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.
        assert.ok(a == b);
    });
    it('#3.1 == boolean coerces to number -> hence ever avoid using == true or == false', () => {
        let a: any = "42";
        let b: boolean = false;
        // ES5 spec, 11.9.3.6-7
        // 1. If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.
        // 2. If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).
        assert.equal(Number(false), 0);
        assert.ok(a != 0);
        // ... hence ever avoid using == true or == false
        assert.ok(a != b);
    });
    it('#3.2 better do toBoolean explicitly', () => {
        let a: any = "42";
        assert.equal(Boolean(a), true);
        assert.equal(!!a, true);
        let passedBy = false;
        if (a) {
            passedBy = true;
        }
        assert.equal(passedBy, true);
    });
    it('#4 == null or undefined are both equal ', () => {
        let a = null;
        let b;
        // ES5 spec, 11.9.3.6-7
        // 1. If x is null and y is undefined, return true.
        // 2. If x is undefined and y is null, return true.
        assert.ok(a == b);
        assert.ok(b == a);
        assert.ok(a == null);
        assert.ok(a == undefined); // yikes!
        assert.ok(b == null); // yikes!
        assert.ok(b == undefined);
        // assert.ok(a == false); // a != 1 hence ever avoid using == true or == false
        // assert.ok(b == false); // b != 1 hence ever avoid using == true or == false
    });
    it('#5 == array is compared via toPrimitive ', () => {
        let a: any = 42;
        let b: any = [42];
        assert.equal(b, 42); // does b.toString() which yields "42", which is then coerced via toNumber
        assert.ok(a == b);
        assert.ok(a !== b);
        //
        let c: any = [42, 41];
        // valueOf() will return the same array instance
        assert.ok(c.valueOf() == c);
        assert.ok(c.valueOf() === c);
    });
    it('#6.1 == object is compared via toPrimitive ', () => {
        let a: string = "abc";
        let b: any = Object(a);
        assert.equal(b.valueOf(), "abc");
        assert.equal(b.toString(), "abc");
        assert.equal(a, b); // does b.toString() which yields "abc"
        assert.ok(a == b);
        //
        assert.notStrictEqual(a, b);
        assert.ok(a !== b);
    });
    it('#6.2 == null object is compared via toPrimitive', () => {
        let a: string = null;
        let b: any = Object(a); // same as `Object()`
        assert.equal(b.valueOf(), "[object Object]");
        assert.equal(b.toString(), "[object Object]");
        assert.ok(a != b); // null != {}
        assert.ok(a !== b);
        //
        assert.notStrictEqual(a, b);
        assert.ok(a !== b);
    });
    it('#6.3 == undefined object is compared via toPrimitive', () => {
        let a: string = undefined;
        let b: any = Object(a); // same as `Object()`
        assert.equal(b.valueOf(), "[object Object]");
        assert.equal(b.toString(), "[object Object]");
        assert.ok(a != b); // undefined != {}
        assert.ok(a !== b);
        //
        assert.notStrictEqual(a, b);
        assert.ok(a !== b);
    });
});
