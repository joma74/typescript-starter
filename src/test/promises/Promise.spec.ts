import * as http from "http";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
var Q = require('q');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Promise', function () {
    describe('#http package', function () {
        let options_forConnectRefused = {
            host: '127.0.0.1',
            port: 45678, // this MUST error
            method: 'GET',
            path: '/api/v1/service'
        };
        it('#1 Node Promise - on refused connect then rejected', function () {
            let promiseUT = new Promise(function (resolve, reject) {
                let req = http.request(options_forConnectRefused, function (res) {
                    resolve(res);
                });
                req.once('error', function (err) {
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
                req.once('error', function (err) {
                    reject(err);
                });
                // IMPORTANT
                req.end();
            });
            return expect(promiseUT).to.be.rejectedWith(Error, "connect ECONNREFUSED 127.0.0.1:45678");
        });
        it('#2 Q defer - on refused connect then rejected', function () {
            let promiseUT = Q.defer();

            (function get(params, promiseUT) {
                let req = http.request(params, function (res) {
                    promiseUT.resove(res);
                });
                req.once('error', function (err) {
                    promiseUT.reject(err);
                });
                // IMPORTANT
                req.end();
            }(options_forConnectRefused, promiseUT)); // IIFE

            return expect(promiseUT.promise).to.be.rejectedWith(Error, "connect ECONNREFUSED 127.0.0.1:45678");
        });
    });
})
;