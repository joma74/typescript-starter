var assert = require('assert');

describe('CoercionQuirks#Date', () => {
    it('#1 explicit to number via unary', () => {
        assert.equal(+new Date("2016-11-26T11:31:40.335Z"), 1480159900335);
    });
    it('#2 explicit to number via getTime()', () => {
        assert.equal(new Date("2016-11-26T11:31:40.335Z").getTime(), 1480159900335);
    });
});