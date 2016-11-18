import {
    loopArrayInDelayedCallback_quirked,
    loopArrayInDelayedCallback_fix_1_forIn,
    fetchedCast,
    timeoutMs,
    loopArrayInDelayedCallback_fix_5_IFFE,
    loopArrayInDelayedCallback_fix_2_forOf,
    loopArrayInDelayedCallback_fix_3_forEach,
    loopArrayInDelayedCallback_fix_4_every
} from "main/quirks/Varquirks";

var assert = require('assert');

describe('Varquirks', () => {
    describe('#loopArrayInDelayedCallback_quirked', () => {
        it('should quirkly fetch any fetchedCast to Alex', (done) => {
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
    describe('#loopArrayInDelayedCallback_fix_1_forIn', () => {
        it('should fetch any fetchedCast to it´s cast', (done) => {
            loopArrayInDelayedCallback_fix_1_forIn();
            setTimeout(function () {
                assert.equal(fetchedCast.length, 3);
                assert.equal(fetchedCast[0], "Marty");
                assert.equal(fetchedCast[1], "Melman");
                assert.equal(fetchedCast[2], "Alex");
                done();
            }, timeoutMs + 250);
        });
    });
    describe('#loopArrayInDelayedCallback_fix_2_forOf', () => {
        it('should fetch any fetchedCast to it´s cast', (done) => {
            loopArrayInDelayedCallback_fix_2_forOf();
            setTimeout(function () {
                assert.equal(fetchedCast.length, 3);
                assert.equal(fetchedCast[0], "Marty");
                assert.equal(fetchedCast[1], "Melman");
                assert.equal(fetchedCast[2], "Alex");
                done();
            }, timeoutMs + 250);
        });
    });
    describe('#loopArrayInDelayedCallback_fix_3_forEach', () => {
        it('should fetch any fetchedCast to it´s cast', (done) => {
            loopArrayInDelayedCallback_fix_3_forEach();
            setTimeout(function () {
                assert.equal(fetchedCast.length, 3);
                assert.equal(fetchedCast[0], "Marty");
                assert.equal(fetchedCast[1], "Melman");
                assert.equal(fetchedCast[2], "Alex");
                done();
            }, timeoutMs + 250);
        });
    });
    describe('#loopArrayInDelayedCallback_fix_4_every', () => {
        it('should fetch any fetchedCast to it´s cast', (done) => {
            loopArrayInDelayedCallback_fix_4_every();
            setTimeout(function () {
                assert.equal(fetchedCast.length, 3);
                assert.equal(fetchedCast[0], "Marty");
                assert.equal(fetchedCast[1], "Melman");
                assert.equal(fetchedCast[2], "Alex");
                done();
            }, timeoutMs + 250);
        });
    });
    describe('#loopArrayInDelayedCallback_fix_5_IFFE', () => {
        it('should fetch any fetchedCast to it´s cast', (done) => {
            loopArrayInDelayedCallback_fix_5_IFFE();
            setTimeout(function () {
                assert.equal(fetchedCast.length, 3);
                assert.equal(fetchedCast[0], "Marty");
                assert.equal(fetchedCast[1], "Melman");
                assert.equal(fetchedCast[2], "Alex");
                done();
            }, timeoutMs + 250);
        });
    });
});
