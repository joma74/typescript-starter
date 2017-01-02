import TypicodeRepo from "main/promises/TypicodeRepository";
import * as nfetch from "node-fetch";
var assert = require('assert')
    , sinon = require('sinon')
    ;

describe('Promise', () => {
    describe('#gtk sinon spy', () => {
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
        it('#1.3 spy api call to typicode', sinon.test(() => {
            let postId_actual = 1;
            let fetchSpy = sinon.spy(nfetch, "default");
            return nfetch.default('http://jsonplaceholder.typicode.com/posts/1').then(r => {
                return r.json()
            }).then(data => {
                assert.deepEqual(data, {
                    userId: 1,
                    id: 1,
                    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
                });
                sinon.assert.callCount(fetchSpy, 1);
            });
        }));
    });
    describe('#gtk sinon stub', () => {
        it('#2.1 like a function, usage firstCall.args', sinon.test(() => {
            let stub = sinon.stub();
            stub('Hello', 'World'); //We can call a spy like a function
            assert.deepEqual(stub.firstCall.args, ['Hello', 'World']);
        }));
        it('#2.2 real api call to typicode', () => {
            // https://jakearchibald.com/2015/thats-so-fetch/
            return TypicodeRepo.fetchPost(1)
                .then(r => {
                    return r.json()
                })
                .then(data => assert.deepEqual(data, {
                    userId: 1,
                    id: 1,
                    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
                }))
                ;
        });
    });
})
;