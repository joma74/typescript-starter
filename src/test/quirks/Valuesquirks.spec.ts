var assert = require('assert');

describe('Valuesquirks', () => {
    it('#1 Scalar primitives like number are always value-copy', () => {
        // scalar primitives are null, undefined, string, number, boolean, ES6's symbol.
        var a = 2;
        var b = a;
        b++;
        assert.equal(a, 2);
        assert.equal(b, 3);
    });
    it('#2.1 Compound values like array are always reference-copy', () => {
        // compound values are objects and functions.
        var c = [1, 2, 3]; // arrays are objects
        var d = c;
        d.push(4);
        assert.deepStrictEqual(c, [1, 2, 3, 4]); // so compare arrays either by deepEqual or deepStrictEqual
        assert.deepStrictEqual(d, [1, 2, 3, 4]);
    });
    it('#2.2 array may be shallow value-copied via slice', () => {
        var c = [1, 2, 3];
        var d = c.slice();
        d.push(4);
        assert.deepStrictEqual(c, [1, 2, 3]);
        assert.deepStrictEqual(d, [1, 2, 3, 4]);
    });
    it('#3 Variables are references, not pointers', () => {
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
    it('#6.1 use null as an empty value', () => {
        let a = 1;
        assert.equal(a, 1);
        a = null;
        assert.equal(a, null);
    });
    it('#6.2 use undefined as a missing value', () => {
        let a;
        assert.equal(a, undefined);
        a = 1;
        assert.equal(a, 1);
    });
    it('#6.3 void "voids" any value to undefined', () => {
        let a = 42;
        assert.equal(void a, undefined);
    });
    it('#7 evaluate typeness of primitive object wrappers', () => {
        let a = new String("abc");
        assert.equal(typeof a, "object");
        assert.ok(a instanceof Object);
        assert.ok(a instanceof String);
        assert.ok(!(a instanceof Number));
        assert.equal(Object.prototype.toString.call(a), "[object String]"); //  Compound values are tagged with an
        // internal [[Class]] property. This property cannot be accessed directly, but can generally be revealed
        // indirectly by borrowing the default `Object.prototype.toString` method against the value.
    });
    it('#8.1 Boxing wrappers provide prototype extension functions', () => {
        let a = "abc";
        assert.equal(a.length, 3);  // Primitive values don't have properties or methods, so to access .length or
        // .toString() you need an object wrapper around the value. Thankfully, JS will automatically box (aka wrap)
        // the primitive value to fulfill such accesses.
        assert.equal(a.toUpperCase(), "ABC");
    });
    it('#8.2 Boxing wrappers gotchas', () => {
        let a: any = "abc";
        assert.equal(typeof a, "string");
        assert.ok(!(a instanceof String));
        let b = Object(a);
        assert.equal(typeof b, "object");
        assert.ok(b instanceof String);
        assert.equal(Object.prototype.toString.call(a), "[object String]");
    });
    it('#8.3 Unboxing of primitive object wrappers', () => {
        let a = new String("abc");
        assert.ok(a !== "abc");
        assert.ok(a.valueOf() === "abc");
        let b = new Number(42);
        assert.ok(b !== 42);
        assert.ok(b.valueOf() === 42);
        let c = new Boolean(true);
        assert.ok(c !== true);
        assert.ok(c.valueOf() === true);
    });
    it('#9.1 new Object()/Function()/Array()/Regex() and their equivalent literal form', () => {
        let o1: any = new Object() // o1:any, else "TS2339: Property 'foo' does not exist on type 'Object'".
        o1.foo = "bar";
        let o2 = {foo: "bar"};
        assert.equal(JSON.stringify(o1), JSON.stringify(o2));

        let f1 = new Function("a", "return a * 2;");
        let f2 = function add(a) {
            return a * 2;
        };
        assert.equal(f1(4), f2(4));

        let d1 = new Array(1, 2, 3);
        let d2 = [1, 2, 3];
        assert.deepStrictEqual(d1, d2);

        let e1 = new RegExp("^a*b+", "g");
        let e2 = /^a*b+/g;
        assert.ok("aaaaabcdef".match(e1));
        assert.ok("aaaaabcdef".match(e2));
    });
    it('#9.2 new Date()/Error() have no equivalent literal form', () => {
        let timesInMilliSecondsAsInt = new Date().getTime();
        assert.equal(typeof timesInMilliSecondsAsInt, "number");
        assert.ok(timesInMilliSecondsAsInt > 0);

        let errorWithStackTrace = new Error("sth failed");
        assert.ok(errorWithStackTrace.stack.length > 0);
    });
    it('#9.3 null/undefined have no equivalent literal form', () => {
        //The null and undefined values cannot be boxed -- they have no object wrapper equivalent -- so Object(null) is just like Object() in that both just produce a normal object.
    });
    it('#9.3 without new they work as coercion', () => {
        let timesInMilliSecondsAsString = Date();
        assert.equal(typeof timesInMilliSecondsAsString, "string");
    });
    it('#10 1/0 is Infinity', () => {
        let infinity = 1 / 0;
        assert.equal(infinity, Infinity);
    });
});
