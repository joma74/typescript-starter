var assert = require('assert');

describe('Valuesquirks', () => {
    it('#1 scalar primitives like number are always value-copy', () => {
        var a = 2;
        var b = a;
        b++;
        assert.equal(a, 2);
        assert.equal(b, 3);
        // scalar primitives are null, undefined, string, number, boolean, ES6's symbol.
    });
    it('#2 compound values like array are always reference-copy', () => {
        var c = [1, 2, 3]; // arrays are objects
        var d = c;
        d.push(4);
        assert.deepStrictEqual(c, [1, 2, 3, 4]); // so compare arrays either by deepEqual or deepStrictEqual
        assert.deepStrictEqual(d, [1, 2, 3, 4]);
        // compound values are objects and functions.
    });
    it('#2.1 array may be shallow value-copied via slice', () => {
        var c = [1, 2, 3];
        var d = c.slice();
        d.push(4);
        assert.deepStrictEqual(c, [1, 2, 3]);
        assert.deepStrictEqual(d, [1, 2, 3, 4]);
    });
    it('#3 variables are references, not pointers', () => {
        function foo(x) {
            x.push(4);
            // later
            x = [4, 5, 6];
            x.push(7);
            assert.deepStrictEqual(x, [4, 5, 6, 7]);
        }

        let a = [1, 2, 3];
        foo(a);
        assert.deepStrictEqual(a, [1, 2, 3, 4]); // not  [4,5,6,7]
    });
    it('#4 Scalar primitive objects are immutable', () => {
        function foo(x) {
            x = x + 1;
            assert.equal(x, 3);
        }

        let a = new Number(2);
        foo(a);
        assert.equal(a, 2); // not 3
    });
    it('#5 null equals null and undefined equals undefined', () => {
        assert.equal(null, null);
        assert.equal(undefined, undefined);
    });
    it('#5.1 use null as an empty value', () => {
        let a = 1;
        assert.equal(a, 1);
        a = null;
        assert.equal(a, null);
    });
    it('#5.2 use undefined as a missing value', () => {
        let a;
        assert.equal(a, undefined);
        a = 1;
        assert.equal(a, 1);
    });
    it('#5.3 void "voids" any value to undefined', () => {
        let a = 42;
        assert.equal(void a, undefined);
    });
    it('#6 evaluate typeness of primitive object wrappers', () => {
        let a = new String("abc");
        assert.ok(a instanceof String);
        assert.ok(a instanceof Object);
        assert.ok(!(a instanceof Number));
        assert.equal(Object.prototype.toString.call(a), "[object String]"); //  Compound values are tagged with an
        // internal [[Class]] property. This property cannot be accessed directly, but can generally be revealed
        // indirectly by borrowing this default method against the value.
    });
    it('#7 Unboxing of primitive object wrappers', () => {
        let a = new String("abc");
        var b = new Number(42);
        var c = new Boolean(true);
        assert.ok(a !== "abc");
        assert.ok(a.valueOf() === "abc");
        assert.ok(b !== 42);
        assert.ok(b.valueOf() === 42);
        assert.ok(c !== true);
        assert.ok(c.valueOf() === true);
    });
    it('#8 Constructors and equivalence', () => {
        let o1: any = new Object() // o1:any, else "TS2339: Property 'foo' does not exist on type 'Object'".
        o1.foo = "bar";
        let o2 = {foo: "bar"};
        assert.equal(JSON.stringify(o1), JSON.stringify(o2));

        let f1 = new Function("a", "return a * 2;");
        let f2 = function add(a) {
            return a * 2;
        };
        assert.equal(f1(4), f2(4));
    });
});
