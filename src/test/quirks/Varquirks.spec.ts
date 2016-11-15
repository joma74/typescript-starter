import {
    loopArrayInDelayedCallback_quirked, loopArrayInDelayedCallback_fix_1, fetchedCast, timeoutMs,
    loopArrayInDelayedCallback_fix_2
} from "main/quirks/Varquirks";

var assert = require('assert');

describe('Varquirks', () => {
    describe('#loopArrayInDelayedCallback_quirked', () => {
        it('should quirk fetch any fetchedCast to Alex', (done) => {
            loopArrayInDelayedCallback_quirked();
            setTimeout(function () {
                assert.equal(fetchedCast.length, 3);
                assert.equal(fetchedCast[0], "Alex");
                assert.equal(fetchedCast[1], "Alex");
                assert.equal(fetchedCast[2], "Alex");
                done();
            }, timeoutMs + 250);
        });
    });
    describe('#loopArrayInDelayedCallback_fix_1', () => {
        it('should fetch any fetchedCast to it´s cast', (done) => {
            loopArrayInDelayedCallback_fix_1();
            setTimeout(function () {
                assert.equal(fetchedCast.length, 3);
                assert.equal(fetchedCast[0], "Marty");
                assert.equal(fetchedCast[1], "Melman");
                assert.equal(fetchedCast[2], "Alex");
                done();
            }, timeoutMs + 500);
        });
    });
    describe('#loopArrayInDelayedCallback_fix_2', () => {
        it('should fetch any fetchedCast to it´s cast', (done) => {
            loopArrayInDelayedCallback_fix_2();
            setTimeout(function () {
                assert.equal(fetchedCast.length, 3);
                assert.equal(fetchedCast[0], "Marty");
                assert.equal(fetchedCast[1], "Melman");
                assert.equal(fetchedCast[2], "Alex");
                done();
            }, timeoutMs + 500);
        });
    });
});
