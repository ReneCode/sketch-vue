
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

  it('clone() should create Point instances', () => {
    let item = new ItemPolygon();
    const pt = new Point(50, 100);
    item.addPoint(pt);
    const clone = item.clone();
    clone.svg.points.length.should.be.equal(1);
    (clone.svg.points[0] instanceof Point).should.be.true;
    clone.svg.points[0].x.should.be.equal(50);
    clone.svg.points[0].y.should.be.equal(100);
  });

});
