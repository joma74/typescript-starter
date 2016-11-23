var assert = require('assert')
var fs = require('fs');

describe('Jsonquirks', () => {
    it('#1.1 not-JSON-safes to undefined', () => {
        assert.equal(JSON.stringify(
            undefined
            ),
            undefined);
        assert.equal(JSON.stringify(
            function () {
            }),
            undefined);
    });
    it('#1.2 not-JSON-safes in arrays to null or omitted', () => {
        // but on arrays they are omitted and replaced with null
        assert.equal(JSON.stringify(
            [
                1,
                undefined,
                function () {
                },
                4
            ]),
            "[1,null,null,4]");
        assert.equal(JSON.stringify(
            {
                a: 2,
                b: function () {
                }
            }),
            '{"a":2}');
    });
    it('#2 dequirk not-JSON-safes and circular refs with .toJson()', () => {
        let o: any = {};
        let a: any = {
            b: 42,
            c: o,
            d: function () {
            }
        };
        o.e = a; // create a circular reference
        // define a custom JSON value serialization
        a.toJSON = function () {
            // only include the `b` property for serialization
            return {b: this.b};
        };
        assert.equal(JSON.stringify(a), '{"b":42}');
    });
    it('#3.1 JSON replacer with inclusion per property name array', () => {
        let a = {
            b: 42,
            c: "42",
            d: [1, 2, 3]
        };
        let jsonString = JSON.stringify(a, ["b", "c"]); // each specifies a property name that is allowed to be included
        assert.equal(jsonString, '{"b":42,"c":"42"}');
    });
    it('#3.2 JSON replacer with function', () => {
        let a = {
            b: 42,
            c: "42",
            d: [1, 2, 3]
        };
        let jsonString = JSON.stringify(a, function (key, value) {
            if (key === "d") return undefined; // To skip a key in the serialization, return explicitly or implicitly undefined.
            if (key !== "c") return value; // Else return the value
        });
        assert.equal(jsonString, '{"b":42}');
    });
    it('#4.1 JSON prettyPrint with 3 spaces', () => {
        let a = {
            b: 42,
            c: "42",
            d: [1, 2, 3]
        };
        let jsonStringActual = JSON.stringify(a, null, 3);
        let jsonStringExpected = fs.readFileSync(__dirname + '/assets/JsonPrettyPrintWith3Spaces.json').toString();
        assert.equal(jsonStringActual, jsonStringExpected);
    });
    it('#4.2 JSON prettyPrint with tabs', () => {
        let a = {
            b: 42,
            c: "42",
            d: [1, 2, 3]
        };
        let jsonStringActual = JSON.stringify(a, null, "\t");
        let jsonStringExpected = fs.readFileSync(__dirname + '/assets/JsonPrettyPrintWithTabs.json').toString();
        assert.equal(jsonStringActual, jsonStringExpected);
    });
});
