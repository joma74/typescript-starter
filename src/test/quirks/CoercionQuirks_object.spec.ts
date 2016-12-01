var assert = require('assert');

describe('CoercionQuirks#[object ...]', () => {
    it('#1 with [object Array] toString yields "i0,i1,.."', () => {
        let array = [1, 2, 3];
        assert.equal(array.toString(), "1,2,3");
    });
    it('#2 any [object xxx] is loose equal and strict equal to itself', () => {
        // [object Array]
        let array = [1, 2, 3];
        let array_itself = array;
        assert.equal(array, array_itself);
        assert.strictEqual(array, array_itself);
        //
        let ARRAY = new Array(1, 2, 3);
        let ARRAY_itself = ARRAY;
        assert.equal(ARRAY, ARRAY_itself);
        assert.strictEqual(ARRAY, ARRAY_itself);
        // [object Object]
        let obj = {a: 42, b: "abc"};
        let obj_itself = obj;
        assert.equal(obj, obj_itself);
        assert.strictEqual(obj, obj_itself);
        //
        let OBJ: any = new Object();
        OBJ.a = 42, OBJ.b = "abc";
        let OBJ_itself = OBJ;
        assert.equal(OBJ, OBJ_itself);
        assert.strictEqual(OBJ, OBJ_itself);
        // [object Function]
        let func = function funct() {
        };
        let func_itself = func;
        assert.equal(func, func_itself);
        assert.strictEqual(func, func_itself);
        //
        let FUNC = new Function();
        let FUNC_itself = FUNC;
        assert.equal(FUNC, FUNC_itself);
        assert.strictEqual(FUNC, FUNC_itself);
        // [object Regex]
    });
    it('#3 with [object Array] valueOf yields itself as primitive value', () => {
        let array = [1, 2, 3];
        let array_itself = array.valueOf();
        assert.strictEqual(array, array_itself);
    });
    it('#4 with [object Object] override valueOf and result is primitive', () => {
        let withValueOf = {
            valueOf: function () {
                return "42";
            }
        };
        assert.equal(withValueOf, 42);
    });
    it('#5.1 with [object Object] override valueOf is not primitive and toString result is primitive', () => {
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
    it('#5.2 with [object Object] override toString and result is primitive', () => {
        let withToString = {
            toString: function () {
                return "42";
            }
        };
        assert.equal(withToString, 42);
    });
    it('#6 with [object Array] override toString and result is primitive', () => {
        let withArray: any = [4, 2]; // [object Array], hence no primitive
        assert.equal(Object.prototype.toString.call(withArray.valueOf()), "[object Array]"); // gives [object Array],
        // hence toString is used in search of primtive.
        withArray.toString = function () { // Let's define toString
            return this.join(""); // "42"
        };
        assert.equal(withArray, 42);
    });
    it('#7.1 when not any coercible primitive is found, throw TypeError', () => {
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
    it('#7.2 when not any coercible primitive is found, throw TypeError', () => {
        let withNoPrimitive: any = Object.create(null); // has a null value for its [[Prototype]]
        assert.throws(function () {
            withNoPrimitive == 42
        }, TypeError); // TypeError: Cannot convert object to primitive value
    });
});