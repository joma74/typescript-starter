import {Point2D, Point3D, iTakePoint2D} from "../../main/interfaces/Point";

var assert = require('assert');
describe('Point', () => {

    describe('#iTakePoint2D', () => {
        it('should accept type Point2D', () => {
            var sutTypePoint2d: Point2D = {x: 0, y: 10};
            var actualValue :string = iTakePoint2D(sutTypePoint2d);
            assert.equal(actualValue, '{"x":0,"y":10}');
        });
        it('should accept duck type Point3D', () => {
            var sutTypePoint3d: Point3D = {x: 0, y: 10, z: 20};
            var actualValue :string = iTakePoint2D(sutTypePoint3d);
            assert.equal(actualValue, '{"x":0,"y":10,"z":20}');
        });


    });
});


