import PromiseUtils from "../../main/quirks/PromiseUtils";
var mockserver_server = require('mockserver-grunt');
var mockserver_client = require('mockserver-client').mockServerClient;

var assert = require('assert');

describe('MockServer', function () {
    describe('#prepare expectation', function () {
        it('#1 promise based restart server', function () {

            this.timeout(4000);

            let serverOptions_a = {
                serverPort: 10080,
                proxyPort: 10090,
                verbose: false,
                logDir: "./lib/test/mockserver/MockServer#1",
                logConfig: "./src/test/mockserver/mockserver-logback.xml"
            };

            function startServer() {
                return PromiseUtils.reflect(mockserver_server.start_mockserver(serverOptions_a));
            }

            function stopServer() {
                return PromiseUtils.reflect(mockserver_server.stop_mockserver(serverOptions_a));
            }

            const expectationsExpected_1: any = {
                "httpRequest": {"path": "/somePath", "body": ""},
                "httpResponse": {
                    "statusCode": 203,
                    "headers": [{
                        "name": "Content-Type",
                        "values": ["application/json; charset=utf-8"]
                    }, {"name": "Cache-Control", "values": ["no-cache, no-store"]}],
                    "body": "{\"name\":\"value\"}",
                    "delay": {"timeUnit": "MICROSECONDS", "value": 0}
                },
                "times": {"remainingTimes": 1, "unlimited": false},
                "timeToLive": {"unlimited": true}
            };

            const expectationsExpected_2: any = {
                "httpRequest": {"path": "/otherPath", "body": ""},
                "httpResponse": {
                    "statusCode": 204,
                    "headers": [{
                        "name": "Content-Type",
                        "values": ["application/json; charset=utf-8"]
                    }, {"name": "Cache-Control", "values": ["no-cache, no-store"]}],
                    "body": "{\"name\":\"other value\"}",
                    "delay": {"timeUnit": "MICROSECONDS", "value": 0}
                },
                "times": {"remainingTimes": 1, "unlimited": false},
                "timeToLive": {"unlimited": true}
            };

            var ms_start_P = startServer()
                .then(mockserver_client("localhost", serverOptions_a.serverPort).mockSimpleResponse.bind(null, '/somePath', {name: 'value'}, 203))
                .then(mockserver_client("localhost", serverOptions_a.serverPort).mockSimpleResponse.bind(null, '/otherPath', {name: 'other value'}, 204))
                .then(mockserver_client("localhost", serverOptions_a.serverPort).retrieveExpectations.bind(null, null))
                .then((excpectations: any[]) => {
                    assert.equal(excpectations.length, 2);
                    assert.deepEqual(excpectations[0], expectationsExpected_1);
                    assert.deepEqual(excpectations[1], expectationsExpected_2)
                })
                .then(mockserver_client("localhost", serverOptions_a.serverPort).reset)
                .catch(function (error) {
                    console.error(error);
                }).then(stopServer);


            return ms_start_P;
        });

        it('#2 async based restart server', async function () {

            let mockserver_server = require('mockserver-grunt');

            this.timeout(4000);

            let serverOptions_b = {
                serverPort: 20080,
                proxyPort: 20090,
                verbose: false,
                logDir: "./lib/test/mockserver/MockServer#2",
                logConfig: "./src/test/mockserver/mockserver-logback.xml"
            };

            const messageExpected = "connect ECONNREFUSED 127.0.0.1:20080";
            let response;
            response = await PromiseUtils.reflect(mockserver_server.stop_mockserver(serverOptions_b));
            // assert.equal(response.r.message, messageExpected);
            assert.equal(response.s, PromiseUtils.ISREJECTED);

            response = await PromiseUtils.reflect(mockserver_server.start_mockserver(serverOptions_b));
            assert.equal(response.r.statusCode, 202);
            assert.equal(response.s, PromiseUtils.ISRESOLVED);

            response = await PromiseUtils.reflect(mockserver_server.stop_mockserver(serverOptions_b));
            assert.equal(response.s, PromiseUtils.ISRESOLVED);
        });
    });
})
;