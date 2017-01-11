var mockserver_server = require('mockserver-grunt');
var mockserver_client = require('mockserver-client').mockServerClient;
var mockserver_proxy = require('mockserver-client').proxyClient;
var Q = require('q');

var assert = require('assert');

describe('MockServer', function () {
    describe.skip('#prepare expectation', function () {
        it('#1 restart server', function () {
            function reflect(promise) {
                return promise.then(
                    function (v) {
                        console.log(v);
                        return {v: v, status: "resolved"}
                    },
                    function (e) {
                        console.log(e);
                        throw new Error(JSON.stringify({e: e, status: "rejected"}));
                    });
            }

            var serverOptions = {
                serverPort: 1080,
                proxyPort: 1090,
                verbose: true
            };
            var ms_start_P = Q.when(mockserver_server.start_mockserver(serverOptions))
                .then(mockserver_proxy("localhost", 1233).reset())
                .then(mockserver_client("localhost", serverOptions.serverPort).reset())
                .then(mockserver_proxy("localhost", serverOptions.proxyPort).dumpToLogs())
                .then(mockserver_server.stop_mockserver(serverOptions))
                .catch(function (error) {
                    console.log(error);
                    throw error;
                });

            return ms_start_P;
        });
    });
})
;