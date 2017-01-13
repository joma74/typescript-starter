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
            console.log("");
            console.log(this.test.title);
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
            console.log("");
            console.log(this.test.title);
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
            console.log("");
            console.log(this.test.title);
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
            console.log("");
            console.log(this.test.title);
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
})
;