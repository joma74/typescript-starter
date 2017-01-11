import TypicodeRepo from "main/typicode/TypicodeRepository";
import * as nfetch from "node-fetch";
var assert = require('assert')
    , sinon = require('sinon')
    , fs = require('fs')
    ;

describe('Sinon', () => {
    describe('#spy', () => {
        // http://sinonjs.org/docs/#sinonspy
        it('#1.1 like a function, usage firstCall.args', sinon.test(() => {
            let spy = sinon.spy();
            spy('Hello', 'World'); //We can call a spy like a function
            assert.deepEqual(spy.firstCall.args, ['Hello', 'World']);
        }));
        it('#1.2 usage callCount, restore', sinon.test(() => {
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
        }));
        it('#1.3.1 real api call to typicode', sinon.test(() => {
            let jsonStringExpected = fs.readFileSync(__dirname + '/assets/Post_1.json').toString();
            let postId_actual = 1;
            // https://jakearchibald.com/2015/thats-so-fetch/
            return TypicodeRepo.fetchPost(postId_actual)
                .then(r => {
                    return r.json()
                })
                .then(jsonStringActual => {
                    assert.deepEqual(jsonStringActual, JSON.parse(jsonStringExpected))
                })
                ;
        }));
        it('#1.3.2 spy api call to typicode', sinon.test(() => {
            let jsonStringExpected = fs.readFileSync(__dirname + '/assets/Post_1.json').toString();
            let postId_actual = 1;
            let fetchSpy = sinon.spy(nfetch, "default"); // "fetch" of nfetch is translated to node_fetch_1.default
            return TypicodeRepo.fetchPost(postId_actual)
                .then(r => {
                    return r.json()
                })
                .then(jsonStringActual => {
                    assert.deepEqual(jsonStringActual, JSON.parse(jsonStringExpected));
                    sinon.assert.calledOnce(fetchSpy.withArgs(TypicodeRepo.getPostUrlOfAsString(postId_actual)));
                })
                ;
        }));
    });
    describe('#stub', () => {
        it('#2.1 like a function, usage firstCall.args', sinon.test(() => {
            let stub = sinon.stub();
            stub('Hello', 'World'); //We can call a spy like a function
            assert.deepEqual(stub.firstCall.args, ['Hello', 'World']);
        }));
    });
})
;