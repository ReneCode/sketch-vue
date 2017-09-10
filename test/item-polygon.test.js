
let should = require('chai').should();

import ItemPolygon from '../src/model/item-polygon'
import Point from '../src/model/point'

describe('ItemPolygon', () => {
  it('should construct ItemPolygon()', () => {
    let item = new ItemPolygon();
    item.svg.type.should.be.equal('polygon');
    (item instanceof ItemPolygon).should.be.true
  });

  it('should addPoint to ItemPolygon()', () => {
    let item = new ItemPolygon();
    const pt = new Point(50, 100);
    item.addPoint(pt);
    item.svg.points.length.should.be.equal(1);
    (item.svg.points[0] instanceof Point).should.be.true;
    item.svg.points[0].x.should.be.equal(50);
    item.svg.points[0].y.should.be.equal(100);
  });

  /*
  it('should construct ItemRectangle(p1,p2)', () => {
    const p1 = new Point(50, 100);
    const p2 = new Point(150, 300);
    let item = new ItemRectangle(p1, p2);
    item.svg.type.should.be.equal('rect');
    item.svg.x.should.be.equal(50);
    item.svg.y.should.be.equal(100);
    item.svg.width.should.be.equal(100);
    item.svg.height.should.be.equal(200);
  });

  it('should clone ItemRectangle', () => {
    const p1 = new Point(50, 100);
    const p2 = new Point(150, 300);
    const org = new ItemRectangle(p1, p2);
    const item = org.clone();
    item.svg.type.should.be.equal('rect');
    item.svg.x.should.be.equal(50);
    item.svg.y.should.be.equal(100);
    item.svg.width.should.be.equal(100);
    item.svg.height.should.be.equal(200);
    (item instanceof ItemRectangle).should.be.true
  });

  it('should move() ItemRectangle', () => {
    const p1 = new Point(50, 100);
    const p2 = new Point(150, 300);
    const item = new ItemRectangle(p1, p2);
    const delta = new Point(10, 20);
    item.move(delta);
    item.svg.x.should.be.equal(60);
    item.svg.y.should.be.equal(120);
  });

  it('move() should not modify orginal ItemRectangle', () => {
    const p1 = new Point(50, 100);
    const p2 = new Point(150, 300);
    const org = new ItemRectangle(p1, p2);
    const item = org.clone();
    const delta = new Point(10, 20);
    item.move(delta);
    item.svg.type.should.be.equal('rect');
    item.svg.x.should.be.equal(60);
    item.svg.y.should.be.equal(120);
    org.svg.x.should.be.equal(50);
    org.svg.y.should.be.equal(100);
  });
  */
});
