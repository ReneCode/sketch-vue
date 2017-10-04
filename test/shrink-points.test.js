
let should = require('chai').should();

import Point from '../src/models/point'
import shrinkPoints from '../src/models/shrink-points';

describe('shrink-points', () => {
  it('should remove 2 points', () => {
    const points = []
      .concat(new Point(1, 1))
      .concat(new Point(2, 2.1))
      .concat(new Point(3, 2.8))
      .concat(new Point(4, 4))
    points.length.should.be.equal(4);
    let newPoints = shrinkPoints(points, 0.2);
    newPoints.length.should.be.equal(2);
    newPoints[1].x.should.be.equal(4);
  })

  it('should remove 4 points', () => {
    const points = []
      .concat(new Point(1, 1))
      .concat(new Point(2, 2.1))
      .concat(new Point(3, 2.8))
      .concat(new Point(4, 4))
      .concat(new Point(5, 5))
      .concat(new Point(6, 6))
      .concat(new Point(7, 7))
    points.length.should.be.equal(7);
    let newPoints = shrinkPoints(points, 0.2);
    newPoints.length.should.be.equal(3);
  })

});
