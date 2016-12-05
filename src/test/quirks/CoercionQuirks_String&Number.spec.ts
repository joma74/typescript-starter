var assert = require('assert');

describe('CoercionQuirks#String&Number', () => {
    it('#1.1 toNumber via any numeric operation EXCEPT +', () => {
        let stringNumber : any = "3.14";
        assert.equal(stringNumber - 0, 3.14);
        assert.equal(stringNumber / 1, 3.14);
        assert.equal(stringNumber * 1, 3.14);
        assert.notStrictEqual(stringNumber + 0, 3.14); // but on +, yikes, see later
        assert.strictEqual(stringNumber + 0, "3.140"); // but on +, yikes, see later
    });
    it('#1.2 toNumber via native constructor', () => {
        assert.equal(Number("3.14"), 3.14);
    });
    it('#1.3 toNumber via native constructor fails with NaN on non-numeric characters', () => {
        assert.ok(isNaN(Number("42px")));
    });
    it('#1.4 toNumber via parseInt', () => {
        assert.equal(parseInt("42"), 42);
        assert.equal(parseInt("42px"), 42); // parseInt parses from left to right and stops on the first not-numeric character
        let float_1: any = 0.000008;
        assert.equal(parseInt(float_1), 0); // same as above
        let float_exp: any = 0.0000008;
        assert.equal(parseInt(float_exp), 8); // same as above, note "8e-7"
        assert.equal(parseInt("0x10"), 16); // ... excpet strings with a prefix of '0x' are considered hexadecimal
    });
    it('#1.5 toNumber via unary operator +', () => {
        let a = "3.14";
        assert.equal(+a, 3.14);
    });
    it('#1.6.1 toNumber via bitwise | (ToInt32) conversion', () => {
        assert.equal((0 | -0), 0); // ToInt32 conversion
        assert.equal((0 | NaN), 0); // ToInt32 conversion which is not 32-bit representable
        assert.equal((0 | Infinity), 0); // ToInt32 conversion which is not 32-bit representable
        assert.equal((0 | -Infinity), 0); // ToInt32 conversion which is not 32-bit representable
    });
    it('#1.6.2 toNumber via bitwise ~ (ToInt32) conversion', () => {
        // ~x is roughly the same as -(x+1)
        assert.equal(~-0, -1); // ToInt32 conversion
        assert.equal(~NaN, -1); // ToInt32 conversion which is not 32-bit representable
        assert.equal(~Infinity, -1); // ToInt32 conversion which is not 32-bit representable
        assert.equal(~-Infinity, -1); // ToInt32 conversion which is not 32-bit representable

    });
    it('#1.6.3 toNumber ~ conversion of sentinel numbers transform to appropriately boolean-coercible', () => {
        let a = "Hello World";
        // -1 is commonly called a "sentinel value," which basically means a value that's given an arbitrary semantic
        // meaning within the greater set of values of its same type.

        // Sentinel values for many functions - like indexOf() - return >= 0 values for "success" and -1 for "failure."
        assert.equal(a.indexOf("lo"), 3); // success case
        let bitwise_indexFound = ~a.indexOf("lo"); // 3 via bitwise yields -4
        assert.ok(bitwise_indexFound);

        assert.equal(a.indexOf("ol"), -1); // failure case
        let bitwise_indexNotFound = ~a.indexOf("ol"); // -1 via bitwise yields 0 -> false
        assert.ok(!bitwise_indexNotFound);
    });
    it('#1.7 octal parseInt with leading 0-s yiked pre ES5', () => {
        let hour = parseInt("08"); // as of ES5 assumes base-10
        assert.equal(hour, 8);
        let hour_base10 = parseInt("08", 10); // explicit set base to 10
        assert.equal(hour_base10, 8);
        let hour_base8 = parseInt("08", 8); // octal 8 is not defined
        assert.equal(hour_base8, 0);
    });
    it('#1.8 toNumber any whitspace(" ",\\n,\\r,\\t) is 0', () => {
        assert.equal(" ", 0);
        assert.equal("\n", 0);
        assert.equal(" \n\r\t", 0);
    });
    it('#8.1 to string via native constructors', () => {
        assert.equal(String(3.14), "3.14");
    });
    it('#8.2 to string of [object Array] via concatenation operator +', () => {
        let a: any = [1, 2];
        let b: any = [3, 4];
        assert.equal(a + b, "1,23,4"); // According to ES5 spec section 11.6.1, the + algorithm (when an object value
        // is an operand) will concatenate if either operand is either ALREADY A STRING, or IF THE FOLLOWING steps
        // PRODUCE a STRING representation. ... first calls the ToPrimitive abstract operation ... which then calls
        // the [[DefaultValue]] algorithm ... with a context hint of number. So:
        // 1. The valueOf() operation on the array will fail to produce a simple primitive
        // 2. So it then falls to a toString() representation. The two arrays thus become "1,2" and "3,4", respectively.
        // 3. As strings are returned, the + operation is interpreted as string concatenation.
        // Now, + concatenates the two strings as you'd normally expect: "1,23,4".
    });
    it('#8.3 to string of integer primitive via concatenation operator +', () => {
        assert.strictEqual(42 + "", "42"); // .. either operand is either ALREADY A STRING
        assert.strictEqual(42 + 0, 42); // .. neither operand will be a string
        assert.strictEqual(Number(42).valueOf(), 42); // .. neither operand will be a string as ToPrimitive/valueOf
        // yields a primitive value
        let stringNumber : any = "3.14";
        assert.notStrictEqual(stringNumber + 0, 3.14); // so nice, repeat it
        assert.strictEqual(stringNumber + 0, "3.140"); // so nice, repeat it
    });
    it('#8.4 to string via var object wrapper', () => {
        let a = 3.14;
        assert.equal(a.toString(), "3.14");
    });
});