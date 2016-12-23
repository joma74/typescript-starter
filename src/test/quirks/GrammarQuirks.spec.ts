import {isUndefined} from "util";
var assert = require('assert');

describe('GrammarQuirks', () => {
    it('#1.1 statement series operator "," strings multiple statements into one', () => {
        let c = 42, d;
        d = c++; // c value is incremented ++ post assignement
        assert.equal(c, 43);
        assert.equal(d, 42); // so d is still 42
        //
        let a = 42, b;
        b = (a++, a); // string together multiple standalone expression statements into a single statement.
        // The ( .. ) around a++, a is required for operator precedence
        assert.equal(a, 43);
        assert.equal(b, 43);
    });
    it('#1.2 but statement series operator "," has lowest precendence', () => {
        let a = 42, b;
        b = a++, a; // interpreted as (b = a++), a
        assert.equal(a, 43);
        assert.equal(b, 42);
    });
    it('#2 labeled for() breaks', () => {
        let result = 0;
        foo: for (let i = 1; i <= 4; i++) {
            result += i;
            if (i >= 3) {

                break foo; // break out of the `foo` labeled loop
            }
        }
        assert.equal(result, 6);
    });
    it('#3.1 JSON is not valid Javascript', () => {
        let mayBeAnObject = "{\"a\":42}";
        assert.throws(function jsonIsNotValidJS() {
                eval(mayBeAnObject); // NOT an object; interpreted as label a with statement 42 - which yields SyntaxError
            }
            , SyntaxError
        );
        let obj: any;
        eval("obj=" + mayBeAnObject);
        assert.equal(obj.a, 42); // IS an object. With assignement.
    });
    it('#3.1 JSON-P(practice of wrapping the JSON data in a function call) makes JSON into valid JS grammar', () => {
        let mayBeAnObject = "{\"a\":42}";

        function foo(mayBeAnObject) {
            assert.equal(mayBeAnObject.a, 42); // IS an object. As JSON-P function paramater.
        }
    });
    it('#4.1 Gotcha [] + {}', () => {
        let a: any = []; // coerced into ""
        let b: any = {}; // coerced into a string as well
        assert.equal(a + b, "[object Object]");
    });
    it('#4.2 Gotcha {} + []', () => {
        let a: any = {}; // coerced into a string
        let b: any = []; // coerced into ""
        assert.equal(a + b, "[object Object]");
    });
    it('#5.1 Object destructuring with variables', () => {
        let {a, b}: any = {a: 42, b: "foo"};
        assert.equal(a, 42);
        assert.equal(b, "foo");
    });
    it('#5.2 Object destructuring with named function arguments', () => {
        function foo({a, b, c}) {
            assert.equal(a, 42);
            assert.equal(b, "foo");
            assert.deepEqual(c, [1, 2, 3]);
        }

        foo({c: [1, 2, 3], a: 42, b: "foo"})
    });
    it('#6 Yikes! There is NO "else if" in JS', () => {
        // else if is really an else with a single if statement
        let condition: boolean = false;
        let passedBy = false;
        if (condition) {
            console.log("if passed");
        } else if (!condition) {
            passedBy = true;
        }
        assert.ok(passedBy);
    });
    it('#7 operator precedence && -> || -> = -> ,', () => {
        assert.equal(false && true || true, true);
        assert.equal(true || false && false, true); // reversed order
    });
    it('#8 ? ternary operator is right associative', () => {
        let a = true, b = false, c = true, d = true, e = true;
        assert.equal(a ? b : c ? d : e, false); // evaluates only 'a' and 'b'
        assert.equal(a ? b : (c ? d : e), false); // grouping from right-to-left, same as above
        assert.equal((a ? b : c) ? d : e, true); // grouping from left-to-right, NOT SAME as above. evaluates 'a', 'b' AND 'e'
    });
    it('#9 = operator is right associative', () => {
        let a, b, c;
        a = b = c = 42; // a = (b = (c = 42))
        assert.equal(a, 42); // no proof, but anyway
    });
    it('#10 7-to-9 complex precedence/associative roundup example', () => {
        let a = 42;
        let b = "foo";
        let c = false;
        assert.equal(a && b || c ? c || b ? a : c && b : a, 42);
        assert.equal(((a && b) || c) ? (c || (b ? a : (c && b))) : a, 42); // manual grouping to the rules gives
        // same result
    });
    it('#11 automatic semicolon insertion(ASI) by new line', () => {
        //statement blocks like do{} and while(){} do not require a ';'
    });
    it('#12.1 default parameter value applied if omitted or undefined', () => {
        function foo(a = 42, b = a + 1) {
            return {
                a, b
            }
        }

        assert.deepEqual(foo(), {a: 42, b: 43});
        assert.deepEqual(foo(undefined), {a: 42, b: 43});
        assert.deepEqual(foo(5), {a: 5, b: 6});
        assert.deepEqual(foo(null), {a: null, b: 1}); // null + 1 -> 0 + 1
        assert.deepEqual(foo(void 0, 7), {a: 42, b: 7}); // force  first parameter to be undefined
    });
    it('#12.2 in strict mode linkage does not exist', () => {
        function linked(a: any) {
            assert.ok((function () { // http://stackoverflow.com/a/10480227
                // The fact that this inside a function called in the global context will not point to the global
                // object can be used to detect strict mode
                return !this;
            })());
            a = 42;
            assert.equal(arguments[0], 2);
            assert.equal(a, 42);
        };
        function unlinked(a: any) {
            assert.ok((function () { // http://stackoverflow.com/a/10480227
                // The fact that this inside a function called in the global context will not point to the global
                // object can be used to detect strict mode
                return !this;
            })());
            a = 42;
            assert.ok(isUndefined(arguments[0]));
            assert.equal(a, 42);
        };
        const unlinkedAny: any = unlinked; // just to trick error TS2346: Supplied parameters do not match any
        // signature of call target for unlinked()
        linked(2);
        unlinkedAny();
    });
    it('#12.3 in non-strict mode linkage does exist', () => {
        // TS create strict mode per default, and un-strict mode does not exist, which ist okay with me.
    });
    it('#13 typeof is safe for undeclared unhoisted variables(commented out)', () => {
        // Commented out as TS does throw either or
        // - error TS2304: Cannot find name 'a'
        // - error TS2448: Block-scoped variable 'a' used before its declaration.
        // TS does not let one turn off or override this behaviour, which ist okay with me because it guards one to
        // shoot one not self in the foot.
        // assert.ok(typeof a, "undefined");
        // let a;
    });
    it('#14.1 throw in finally block overrides completion value', () => {
        let expecteErrorMessage: string = "Oops!";
        assert.throws(function foo() {
                try {
                    return 42;
                }
                finally {
                    throw expecteErrorMessage;
                }
            }
            ,
            expecteErrorMessage
        );
    });
    it('#14.2 return in finally block overrides completion value if return in try block exists', () => {
        function foo1() {
            try {
                return 42;
            }
            finally {
                return 43;
            }
        };
        assert.equal(foo1(), 43);

        function foo2() {
            try {
            }
            finally {
                return 43;
            }
        };
        assert.equal(foo2(), 43);

        function foo3() {
            try {
                return 42;
            }
            finally {
                return;
            }
        };
        assert.equal(foo3(), undefined);
    });
    it('#15.1 switch to case uses === identity', () => {
        function doSwitch(a) {
            switch (a) {
                case 2:
                    return true;
                default:
                    return false;
            }
        }

        assert.ok(doSwitch(2));
        assert.ok(!doSwitch("2"));
    });
    it('#15.2 switch true and cases use == coercive equality', () => {
        function doSwitch(a) {
            switch (true) {
                case a == 2:
                    return true;
                default:
                    return false;
            }
        }

        assert.ok(doSwitch(2));
        assert.ok(doSwitch("2"));
    });
    it('#15.3 cases requires strict true result', () => {
        function doSwitch(a) {
            switch (true) {
                case a:
                    return true;
                default:
                    return false;
            }
        }

        assert.ok(Boolean("hello world") == true);
        assert.ok(!doSwitch("hello world"));
    });
});