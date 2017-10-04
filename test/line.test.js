
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

  describe('angle', () => {

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
  })

  it('should rotate 45 deg', () => {
    const p1 = new Point(4, 9);
    const p2 = new Point(6, 6);
    const l1 = new Line(p1, p2);
    const angle1 = l1.angle();
    const angleRotate = Math.PI / 2;
    const line = l1.rotate(angleRotate)
    const angle = line.angle();

    angle.should.be.closeTo(angle1 + angleRotate, 0.0001)
  });

  describe('nearPoint', () => {
    describe('horizontal line', () => {
      it('should result true - point on line', () => {
        const p1 = new Point(4, 6);
        const p2 = new Point(6, 6);
        const line = new Line(p1, p2);
        const point = new Point(5, 7);
        const ok = line.nearPoint(point, 2);
        ok.should.be.true;
      })
      it('should result false - point on line but point to far', () => {
        const p1 = new Point(4, 6);
        const p2 = new Point(6, 6);
        const line = new Line(p1, p2);
        const point = new Point(5, 9);
        const ok = line.nearPoint(point, 2);
        ok.should.be.false;
      })
      it('should result true - point outside line but near p1', () => {
        const p1 = new Point(4, 6);
        const p2 = new Point(6, 6);
        const line = new Line(p1, p2);
        const point = new Point(3.5, 6);
        const ok = line.nearPoint(point, 2);
        ok.should.be.true;
      })
      it('should result true - point outside line and too far from p1', () => {
        const p1 = new Point(4, 6);
        const p2 = new Point(6, 6);
        const line = new Line(p1, p2);
        const point = new Point(1.9, 6);
        const ok = line.nearPoint(point, 2);
        ok.should.be.false;
      })
      it('should result true - point outside line but near p2', () => {
        const p1 = new Point(4, 6);
        const p2 = new Point(6, 6);
        const line = new Line(p1, p2);
        const point = new Point(6.5, 6);
        const ok = line.nearPoint(point, 2);
        ok.should.be.true;
      })
      it('should result true - point outside line but too far from p2', () => {
        const p1 = new Point(4, 6);
        const p2 = new Point(6, 6);
        const line = new Line(p1, p2);
        const point = new Point(8.1, 6);
        const ok = line.nearPoint(point, 2);
        ok.should.be.false;
      })
    })

    describe('vertical line', () => {
      it('should result true - point on line', () => {
        const p1 = new Point(4, 6);
        const p2 = new Point(4, 2);
        const line = new Line(p1, p2);
        const point = new Point(5, 3);
        const ok = line.nearPoint(point, 2);
        ok.should.be.true;
      })
      it('should result false - point on line but point to far', () => {
        const p1 = new Point(4, 6);
        const p2 = new Point(4, 2);
        const line = new Line(p1, p2);
        const point = new Point(7, 5);
        const ok = line.nearPoint(point, 2);
        ok.should.be.false;
      })
    })
  })

});
