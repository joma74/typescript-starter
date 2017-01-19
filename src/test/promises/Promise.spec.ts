import * as http from "http";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import OnPromise from "./DoOnPromise";
var Q = require('q');
chai.use(chaiAsPromised);
chai.config.truncateThreshold = 0; // disables chai's inspector truncating objects for the error messages
var expect = chai.expect;

describe('Promise', function () {
    describe('#out http package', function () {
        let options_forConnectRefused = {
            host: '127.0.0.1',
            port: 45678, // this MUST refuse a connect
            method: 'GET',
            path: '/api/v1/service'
        };
        it('#1 Node Promise - on refused connect then rejected', function () {
            let promiseUT = new Promise(function (resolve, reject) {
                let req = http.request(options_forConnectRefused, function (res) {
                    resolve(res);
                });
                req.on('error', function (err) {
                    reject(err);
                });
                // IMPORTANT
                req.end();
            });
            return expect(promiseUT).to.be.rejectedWith(Error, "connect ECONNREFUSED 127.0.0.1:45678");
        });
        it('#2 Q Promise - on refused connect then rejected', function () {
            let promiseUT = Q.Promise(function (resolve, reject) {
                let req = http.request(options_forConnectRefused, function (res) {
                    resolve(res);
                });
                req.on('error', function (err) {
                    reject(err);
                });
                // IMPORTANT
                req.end();
            });
            return expect(promiseUT).to.be.rejectedWith(Error, "connect ECONNREFUSED 127.0.0.1:45678");
        });
        it('#2 Q defer - on refused connect then rejected', function () {
            let dfd = Q.defer();

            (function get(params, dfd) {
                let req = http.request(params, function (res) {
                    dfd.resolve(res);
                });
                req.on('error', function (err) {
                    dfd.reject(err);
                });
                // IMPORTANT
                req.end();
            }(options_forConnectRefused, dfd)); // IIFE

            return expect(dfd.promise).to.be.rejectedWith(Error, "connect ECONNREFUSED 127.0.0.1:45678");
        });
    });
    describe('#we have aproblem wir apromises', function () {
        // https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
        console.log("");
        it('#1 expected sequence ' +
            'doSomething ' +
            '   -> doSomethingElse ' +
            '       -> finalHandler', function () {
            // console.log("");
            // console.log(this.test.title);
            let messagesACTUAL: string[] = [];
            let messagesExpected: string[] = [
                OnPromise.messagesSth[0],
                OnPromise.messagesSth[1],
                OnPromise.messagesSthOther[0],
                OnPromise.messagesSthOther[1],
                OnPromise.messagesFinal[0],
                OnPromise.messagesFinal[1]
            ];
            // Difference to #4 is that one does NOT get the result of the previous resolvement letsDoSth in letsDoSthOther
            // Difference to #3 is that letsDoSthOther does NOT get the result of the previous resolvement from letsDoSth
            return OnPromise.letsDoSth(messagesACTUAL)(undefined)
                .then(function () {
                    return OnPromise.letsDoSthOther(messagesACTUAL)(undefined);
                })
                .then(OnPromise.letsDoFinal(messagesACTUAL))
                .then(function doAssert() {
                    expect(messagesACTUAL).to.deep.equal(messagesExpected);
                });
        });
        it('#2 expected sequence ' +
            'doSomething ' +
            '   -> doSomethingOther ' +
            '   -> finalHandler', function () {
            // console.log("");
            // console.log(this.test.title);
            let messagesACTUAL: string[] = [];
            let messagesExpected: string[] = [
                OnPromise.messagesSth[0],
                OnPromise.messagesSth[1],
                OnPromise.messagesSthOther[0],
                OnPromise.messagesFinal[0],
                OnPromise.messagesSthOther[1],
                OnPromise.messagesFinal[1]
            ];
            // Difference to #1 and #4 is that one does NOT get the result of the previous resolvement letsDoSthOther in letsDoFinal
            return OnPromise.letsDoSth(messagesACTUAL)(undefined)
                .then(function () {
                    OnPromise.letsDoSthOther(messagesACTUAL)(undefined); // NOT RETURNING - this is a side effect resolving to 'undefined'
                })
                .then(OnPromise.letsDoFinal(messagesACTUAL))
                .then(function doAssert() {
                    expect(messagesACTUAL).to.deep.equal(messagesExpected);
                });
        });
        it('#3 expected sequence ' +
            'doSomething ' +
            'doSomethingOther ' +
            '   -> finalHandler', function () {
            // console.log("");
            // console.log(this.test.title);
            let messagesACTUAL: string[] = [];
            let messagesExpected: string[] = [
                OnPromise.messagesSth[0],
                OnPromise.messagesSthOther[0],
                OnPromise.messagesSth[1],
                OnPromise.messagesSthOther[1],
                OnPromise.messagesFinal[0],
                OnPromise.messagesFinal[1]
            ];
            // Difference to #1 is that letsDoSthOther WOULD get the result of the previous resolvement letsDoSth BUT is
            // started before that previous resolvement is available
            return OnPromise.letsDoSth(messagesACTUAL)(undefined)
                .then(OnPromise.letsDoSthOther(messagesACTUAL)(undefined) as any) // trick the compiler by explicit cast
                .then(OnPromise.letsDoFinal(messagesACTUAL))
                .then(function doAssert() {
                    expect(messagesACTUAL).to.deep.equal(messagesExpected);
                });
        });
        it('#4 expected sequence ' +
            'doSomething ' +
            '   ->doSomethingOther ' +
            '       -> finalHandler', function () {
            // console.log("");
            // console.log(this.test.title);
            let messagesACTUAL: string[] = [];
            let messagesExpected: string[] = [
                OnPromise.messagesSth[0],
                OnPromise.messagesSth[1],
                OnPromise.messagesSthOther[0],
                OnPromise.messagesSthOther[1],
                OnPromise.messagesFinal[0],
                OnPromise.messagesFinal[1]
            ];
            // Difference to #1 is that one gets the result of the previous resolvement letsDoSth in letsDoSthOther
            return OnPromise.letsDoSth(messagesACTUAL)(undefined)
                .then(OnPromise.letsDoSthOther(messagesACTUAL))
                .then(OnPromise.letsDoFinal(messagesACTUAL))
                .then(function doAssert() {
                    expect(messagesACTUAL).to.deep.equal(messagesExpected);
                });
        });
    });
    describe('#other superb obscure behaviors', function () {
        // https://jakearchibald.com/2014/resolve-not-opposite-of-reject/
        //
        // https://developers.google.com/web/fundamentals/getting-started/primers/promises
        // Queuing asynchronous actions
        // (1) When you return something from a then() callback, it's a bit magic. If you return a value, the next
        // then() is called with that value. However, if you return something promise-like, the next then() waits on
        // it, and is only called when that promise settles (succeeds/fails).
        //
        // (2) There's nothing special about catch(), it's just sugar for then(undefined, func), but it's more readable.
        //
        // (3) A catch catches every rejection/error of the then's before that catch
        // promis1.then(promise2).then(promise3).catch(catch1)
        // promis1 - | reject/error
        // | suc     |
        // promis2 - catch1
        // | suc     |
        // promis3 - | reject/error
        //
        // (4) Rejections happen when a promise is explicitly rejected, but also implicitly if an error is thrown in
        // the constructor callback. This means it's useful to do all your promise-related work inside the promise
        // constructor callback, so errors are automatically caught and become rejections.
        it("#1 resolving a rejection catches", function () {
            const reasonExpected: string = "because i want";
            return new Promise(function (resolve) {
                return resolve(Promise.reject(reasonExpected));
            }).catch(function (reason) {
                expect(reason).to.equal(reasonExpected);
            });
        })
        ;
        it("#2.1 resolving-to-undefined yields resolvement", function () {
            const reasonExpected: any = undefined;
            return expect(
                new Promise(function (resolve) {
                    return resolve(reasonExpected);
                })
            ).to.eventually.equal(reasonExpected);
        })
        ;
        it("#2.2 but thenning with a resolved-to-undefined follows the rejection path", function () {
            const reasonExpected: any = undefined;
            return expect(
                Promise.resolve(reasonExpected)
                    .then(
                        function () {
                            expect.fail();
                        },
                        function (reason) {
                            expect(reason).to.equal(reasonExpected);
                        })
            ).to.be.eventually.rejectedWith(reasonExpected);
        })
        ;
        it("#3.1 a rejection path must return an rejection to yield rejection", function () {
            const reasonExpected: any = undefined;
            return expect(
                Promise.reject(undefined)
                    .then(
                        null,
                        function (reason) {
                            expect(reason).to.equal(reasonExpected);
                            return Promise.reject(reason);
                        })
            ).to.eventually.rejectedWith(reasonExpected);
        })
        ;
        it("#3.2 a rejection path must return a resolvement to yield resolvement", function () {
            const reasonExpected: string = "do anything with me";
            return expect(
                Promise.reject(reasonExpected)
                    .then(
                        null,
                        function (reason) {
                            expect(reason).to.equal(reasonExpected)
                            return Promise.resolve(reasonExpected);
                        })
            ).to.eventually.equal(reasonExpected);
        })
        ;
        it("#4.1 a rejection path must return a value other than undefined to yield resolvement (if it is not thenned :)", function () {
            const reasonExpected: string = "do anything with me";
            return expect(
                Promise.reject(reasonExpected)
                    .then(
                        null,
                        function (reason) {
                            expect(reason).to.equal(reasonExpected)
                            return reason;
                        })
            ).to.eventually.equal(reasonExpected);
        })
        ;
        it("#4.2 a rejection path may return undefined to yield rejection", function () {
            const reasonExpected: any = undefined;
            const reasonActual: any = "Why not go crazy";
            return expect(
                Promise.reject(reasonActual)
                    .then(
                        null,
                        function (reason) {
                            expect(reason).to.equal(reasonActual)
                            return reasonExpected;
                        })
            ).to.eventually.equal(reasonExpected);
        })
        ;
        it("#4.3 a rejection path may return nothing to yield rejection with undefined", function () {
            const reasonExpected: any = undefined;
            const reasonActual: any = "Why not go crazy";
            return expect(
                Promise.reject(reasonActual)
                    .then(
                        null,
                        function (reason) {
                            expect(reason).to.equal(reasonActual);
                        })
            ).to.eventually.equal(reasonExpected);
        })
        ;
    });
})
;