var assert = require('assert');
var sinon = require('sinon');

describe('Promise', () => {
    describe('#gtk sinon spy', () => {
        // http://sinonjs.org/docs/#sinonspy
        it('#1.1 like a function, usage firstCall.args', () => {
            let spy = sinon.spy();
            spy('Hello', 'World'); //We can call a spy like a function
            assert.deepEqual(spy.firstCall.args, ['Hello', 'World'])
        });
        it('#1.2 usage callCount, restore', () => {
            const expected1: string = 'Darth Vader';
            const expected2: string = 'Luke Skywalker';
            const expected3: string = 'Princess Leia';
            interface User {
                setName(name: string): void;
                getName(): string;
            }
            let user: User = {
                setName: function (name: string): void {
                    this.name = name;
                },
                getName: function (): string {
                    return this.name;
                }
            };
            let setNameSpy = sinon.spy(user, 'setName');
            user.setName(expected1);
            sinon.assert.calledOnce(setNameSpy.withArgs(expected1));
            sinon.assert.callCount(setNameSpy, 1);
            assert.equal(user.getName(), expected1);
            user.setName(expected2);
            sinon.assert.calledOnce(setNameSpy.withArgs(expected2));
            sinon.assert.callCount(setNameSpy, 2);
            assert.equal(user.getName(), expected2);
            setNameSpy.restore();
            user.setName(expected3); // after restore() sinon does not spy anymore
            sinon.assert.calledOnce(setNameSpy.withArgs(expected1));
            sinon.assert.calledOnce(setNameSpy.withArgs(expected2));
            sinon.assert.callCount(setNameSpy, 2);
        });
    });
});