
let should = require('chai').should();

import Point from '../src/models/point'
import Line from '../src/models/line'

describe('Line', () => {
  it('should construct Line()', () => {
    const p1 = new Point(4, 6);
    const p2 = new Point(2, 3);
    const line = new Line(p1, p2);
    line.p1.should.be.deep.equal(p1);
    (line instanceof Line).should.be.true;
  });

  it('should calc angle 45 deg', () => {
    const p1 = new Point(4, 6);
    const p2 = new Point(6, 8);
    const line = new Line(p1, p2);
    const angle = line.angle();
    angle.should.be.equal(Math.PI / 4)
  });

  it('should calc angle 90 deg', () => {
    const p1 = new Point(4, 6);
    const p2 = new Point(4, 8);
    const line = new Line(p1, p2);
    const angle = line.angle();
    angle.should.be.equal(Math.PI / 2)
  });

  it('should calc angle 135 deg', () => {
    const p1 = new Point(4, 6);
    const p2 = new Point(2, 8);
    const line = new Line(p1, p2);
    const angle = line.angle();
    angle.should.be.equal(Math.PI * 3 / 4)
  });

  it('should calc angle 180 deg', () => {
    const p1 = new Point(4, 6);
    const p2 = new Point(2, 6);
    const line = new Line(p1, p2);
    const angle = line.angle();
    angle.should.be.equal(Math.PI)
  });

  it.skip('should rotate 45 deg', () => {
    const p1 = new Point(4, 6);
    const p2 = new Point(6, 6);
    const l1 = new Line(p1, p2);
    l1.angle().should.be.equal(0)
    const line = l1.rotate(Math.PI / 4)
    const angle = line.angle();
    angle.should.be.equal(Math.PI / 4)
  });
});
