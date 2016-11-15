import * as validation from "main/validation/AllValidators";
var assert = require('assert');

describe('ZipCodeValidator', () => {
    describe('#isAcceptable', () => {
        it('should accept valid american zipcode', () => {
            let actualValue = "98052";
            var zipCodeValidator: validation.ZipCodeValidator = new validation.ZipCodeValidator();
            assert.equal(zipCodeValidator.isAcceptable(actualValue), true);
        });
        it('should not accept invalid american zipcode', () => {
            let actualValue = "abc";
            var zipCodeValidator: validation.ZipCodeValidator = new validation.ZipCodeValidator();
            assert.equal(zipCodeValidator.isAcceptable(actualValue), false);
        });
    });
});
