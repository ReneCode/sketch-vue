
let should = require('chai').should();

import Point from '../src/models/point'
import Line from '../src/models/line'
import distanceLinePoint from '../src/models/distance-line-point';

describe('distance line point', () => {
  it('should calc 3d distance-line-point', () => {
    const line = new Line(
      new Point(1, 3, -3),
      new Point(-1, 1, -1)
    );
    const pt = new Point(7, 9, -6);
    let result = distanceLinePoint(line, pt);

    result.lamda.should.be.equal(-2.5);
    result.f.should.be.deep.equal({ x: 6, y: 8, z: -8 })
    result.distance.should.be.deep.closeTo(Math.sqrt(6), 0.0001)
  })

  it('should calc distance & lamda 0..1', () => {
    const line = new Line(
      new Point(5, 3),
      new Point(10, 3)
    );
    const pt = new Point(7, 9);
    let result = distanceLinePoint(line, pt);
    result.distance.should.be.equal(6);
    result.lamda.should.be.lessThan(1);
    result.lamda.should.be.above(0);
  });

  it('should result lamda > 1', () => {
    const line = new Line(
      new Point(5, 3),
      new Point(10, 3)
    );
    const pt = new Point(17, 9);
    let result = distanceLinePoint(line, pt);
    result.lamda.should.be.above(1);
  });

  it('should result lamda < 0', () => {
    const line = new Line(
      new Point(5, 3),
      new Point(10, 3)
    );
    const pt = new Point(0, 9);
    let result = distanceLinePoint(line, pt);
    result.lamda.should.be.lessThan(0);
  });

});
