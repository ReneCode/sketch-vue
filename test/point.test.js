
let should = require('chai').should();

import Point from '../src/models/point'

describe('Point', () => {
  it('should construct Point()', () => {
    const pt = new Point(4, 6);
    pt.x.should.be.equal(4);
    pt.y.should.be.equal(6);
    (pt instanceof Point).should.be.true
  });

  it('should add Point()', () => {
    const p1 = new Point(4, 6);
    const p2 = new Point(2, 3);
    const pt = p1.add(p2);
    pt.x.should.be.equal(4 + 2);
    pt.y.should.be.equal(6 + 3);
  });

  it('should rotate 90 def', () => {
    const p1 = new Point(10, 2);
    const pt = p1.rotate(Math.PI / 2);
    pt.x.should.be.closeTo(-2, 0.00001);
    pt.y.should.be.closeTo(10, 0.00001);
  });

  it('should rotate -90 def', () => {
    const p1 = new Point(10, 2);
    const pt = p1.rotate(-Math.PI / 2);
    pt.x.should.be.closeTo(2, 0.00001);
    pt.y.should.be.closeTo(-10, 0.00001);
  });

  it('should scale point', () => {
    const p1 = new Point(10, 2);
    const pt = p1.scale(6, 7);
    pt.x.should.be.closeTo(60, 0.00001);
    pt.y.should.be.closeTo(14, 0.00001);
  });

  it('should calc cross product. left orientation > 0', () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(1, 3);
    p1.cross(p2).should.be.greaterThan(0);
  });

  it('should calc cross product. right orientation < 0', () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(1, 1.5);
    p1.cross(p2).should.be.lessThan(0);
  });

  it('should calc rotatedAngle +90', () => {
    const p1 = new Point(1, 1);
    const p2 = p1.rotate(Math.PI / 2);
    const angle = p1.rotatedAngle(p2);
    angle.should.be.closeTo(Math.PI / 2, 0.001);
  })

  it('should calc rotatedAngle -90', () => {
    const p1 = new Point(1, 1);
    const p2 = p1.rotate(-Math.PI / 2);
    const angle = p1.rotatedAngle(p2);
    angle.should.be.closeTo(-Math.PI / 2, 0.001);
  })

});
