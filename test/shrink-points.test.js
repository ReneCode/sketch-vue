
let should = require('chai').should();

import Point from '../src/models/point'
import shrinkPoints from '../src/models/shrink-points';

describe('shrink-points', () => {

  it('should not remove a point. points not in one row', () => {
    const points = []
      .concat(new Point(1, 0))
      .concat(new Point(5, 0))
      .concat(new Point(9, 5))
    points.length.should.be.equal(3);
    let newPoints = shrinkPoints(points);
    newPoints.length.should.be.equal(3);
  })

  it('should remove 1 point, points in one row', () => {
    const points = []
      .concat(new Point(1, 0))
      .concat(new Point(5, 0))
      .concat(new Point(9, 1))
    points.length.should.be.equal(3);
    let newPoints = shrinkPoints(points);
    newPoints.length.should.be.equal(2);
    newPoints[1].x.should.be.equal(9);
  })

  it('should remove 2 points. points in one row', () => {
    const points = []
      .concat(new Point(1, 0))
      .concat(new Point(5, 0))
      .concat(new Point(9, 1))
      .concat(new Point(10, 1))
    points.length.should.be.equal(4);
    let newPoints = shrinkPoints(points);
    newPoints.length.should.be.equal(2);
  })

  it('should remove 2 points', () => {
    const points = []
      .concat(new Point(1, 1))
      .concat(new Point(2, 2))
      .concat(new Point(3, 2.9))
      .concat(new Point(4, 4.2))
    points.length.should.be.equal(4);
    let newPoints = shrinkPoints(points);
    newPoints.length.should.be.equal(2);
    newPoints[1].x.should.be.equal(4);
  })

  it('should remove all points, results one line', () => {
    const points = []
      .concat(new Point(1, 1))
      .concat(new Point(2, 2.1))
      .concat(new Point(3, 2.8))
      .concat(new Point(4, 4))
      .concat(new Point(5, 5.1))
      .concat(new Point(6, 6.1))
      .concat(new Point(7, 7.1))
    points.length.should.be.equal(7);
    let newPoints = shrinkPoints(points);
    newPoints.length.should.be.equal(2);
  })

  it('should optimize points', () => {
    const points = []
      .concat(new Point(225, 352))
      .concat(new Point(226, 351))
      .concat(new Point(228, 351))
      .concat(new Point(230, 350))
      .concat(new Point(240, 346))
      .concat(new Point(246, 345))
      .concat(new Point(259, 342))
      .concat(new Point(275, 340))
      .concat(new Point(291, 340))
      .concat(new Point(305, 340))
      .concat(new Point(318, 340))
      .concat(new Point(330, 341))
      .concat(new Point(339, 343))
      .concat(new Point(346, 345))
      .concat(new Point(354, 349))
      .concat(new Point(357, 352))
      .concat(new Point(360, 354))
      .concat(new Point(363, 356))
      .concat(new Point(367, 358));
    points.length.should.be.equal(19);
    let newPoints = shrinkPoints(points);
    newPoints.length.should.be.lessThan(10);

  })
});
