
let should = require('chai').should();

import ItemCircle from '../src/models/item-circle'
import Point from '../src/models/point'

describe('ItemCircle', () => {
  it('should construct ItemCircle()', () => {
    let item = new ItemCircle(new Point(30, 40), 50);
    item.svg.type.should.be.equal('circle');
    item.svg.x.should.be.equal(30);
    item.svg.y.should.be.equal(40);
    item.svg.radius.should.be.equal(50);
    (item instanceof ItemCircle).should.be.true
  });

  describe('nearPoint', () => {
    it('should return true on large point outside', () => {
      const item = new ItemCircle(new Point(100, 200), 50);
      const point = new Point(160, 200);
      const found = item.nearPoint(point, 15);
      found.should.be.true;
    });
    it('should return false on small point outside', () => {
      const item = new ItemCircle(new Point(100, 200), 50);
      const point = new Point(160, 200);
      const found = item.nearPoint(point, 8);
      found.should.be.false;
    });
    it('should return true on large point inside', () => {
      const item = new ItemCircle(new Point(100, 200), 50);
      const point = new Point(100, 240);
      const found = item.nearPoint(point, 15);
      found.should.be.true;
    });
    it('should return false on small point inside', () => {
      const item = new ItemCircle(new Point(100, 200), 50);
      const point = new Point(100, 240);
      const found = item.nearPoint(point, 8);
      found.should.be.false;
    });
  });

});
