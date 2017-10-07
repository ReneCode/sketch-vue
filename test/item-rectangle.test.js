
let should = require('chai').should();

import ItemRectangle from '../src/models/item-rectangle'
import Point from '../src/models/point'

describe('ItemRectangle', () => {
  it('should construct ItemRectangle()', () => {
    let item = new ItemRectangle();
    item.svg.type.should.be.equal('rect');
    item.svg.x.should.be.equal(0);
    item.svg.y.should.be.equal(0);
    item.svg.width.should.be.equal(0);
    item.svg.height.should.be.equal(0);
    (item instanceof ItemRectangle).should.be.true
  });

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

  it('should return topLine()', () => {
    const p1 = new Point(50, 100);
    const p2 = new Point(150, 300);
    const rectangle = new ItemRectangle(p1, p2);
    const line = rectangle.topLine()
    line.p1.should.be.deep.equal(new Point(50, 100))
    line.p2.should.be.deep.equal(new Point(150, 100))
  });

  it('should return bottomLine()', () => {
    const p1 = new Point(50, 100);
    const p2 = new Point(150, 300);
    const rectangle = new ItemRectangle(p1, p2);
    const line = rectangle.bottomLine()
    line.p1.should.be.deep.equal(new Point(50, 300))
    line.p2.should.be.deep.equal(new Point(150, 300))
  });

  it('should return leftLine()', () => {
    const p1 = new Point(50, 100);
    const p2 = new Point(150, 300);
    const rectangle = new ItemRectangle(p1, p2);
    const line = rectangle.leftLine()
    line.p1.should.be.deep.equal(new Point(50, 100))
    line.p2.should.be.deep.equal(new Point(50, 300))
  });

  it('should return rightLine()', () => {
    const p1 = new Point(50, 100);
    const p2 = new Point(150, 300);
    const rectangle = new ItemRectangle(p1, p2);
    const line = rectangle.rightLine();
    line.p1.should.be.deep.equal(new Point(150, 100))
    line.p2.should.be.deep.equal(new Point(150, 300))
  });
});
