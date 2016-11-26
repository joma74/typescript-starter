var assert = require('assert');

describe('CoercionQuirks#ToBoolean#Of[object ...]', () => {
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
    it('#1.4 +0/-0 is contained list, undefined', () => {
        assert.equal(Boolean(+0), false);
        assert.equal(Boolean(-0), false);
    });
    it('#1.5 NaN is contained in falsy list', () => {
        assert.equal(Boolean(NaN), false);
    });
    it('#1.6 \"\" is contained in falsy list', () => {
        assert.equal(Boolean(""), false);
    });
});