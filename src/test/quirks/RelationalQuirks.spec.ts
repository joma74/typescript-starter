var assert = require('assert');

describe('RelationalQuirks', () => {
    it('#1 a < b forces toNumber if any side is a number', () => {
        let a :any = [42];
        let b :any = ["43"];
        assert.ok(a < b);
    });
    it('#2 a < b forces lexicographic ToPrimitive if both sides are a strings', () => {
        let a :any = ["42"];
        let b :any = ["043"];
        assert.ok(a > b);
    });
    it('#3 Yikes, a <= b does !(b < a)', () => {
        let a : any = { b: 42 };
        let b :any = { b: 43 };
        assert.ok(a != b);
        assert.ok(a <= b);
        assert.ok(a >= b);
    });
});