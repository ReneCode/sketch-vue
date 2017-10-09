
let should = require('chai').should();

import Line from '../src/models/line'
import ItemCircle from '../src/models/item-circle';
import Point from '../src/models/point';

import temporaryItemList from '../src/store/temporary-item-list';

describe.only('temporaryItemList', () => {
  beforeEach('clear item list', () => {
    temporaryItemList.clear();
  })

  it('should getItems', () => {
    temporaryItemList.should.be.a('object');
    temporaryItemList.getItems().should.be.deep.equal([]);
  })

  it('should addItem', () => {
    const pt = new Point(40, 30)
    const circle = new ItemCircle(pt, 20);
    temporaryItemList.add(circle);
    temporaryItemList.getItems().should.be.deep.equal([circle]);
  })

  describe('#remove', () => {
    it('should remove item', () => {
      const pt = new Point(40, 30)
      const circle = new ItemCircle(pt, 20);
      temporaryItemList.add(circle);
      temporaryItemList.remove(circle).should.be.equal(true);
      temporaryItemList.getItems().should.be.deep.equal([]);
    })

    it('should remove item and leave the others', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      temporaryItemList.add(c1);
      temporaryItemList.add(c2);
      temporaryItemList.remove(c1);
      temporaryItemList.getItems().should.be.deep.equal([c2]);
    })

    it('should not remove item that is not in the list', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      temporaryItemList.add(c1);
      temporaryItemList.remove(c2).should.be.equal(false);
      temporaryItemList.getItems().should.be.deep.equal([c1]);
    })
  })

  describe('#clear', () => {
    it('should clear list', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      temporaryItemList.add(c1);
      temporaryItemList.add(c2);
      temporaryItemList.clear();
      temporaryItemList.getItems().should.be.deep.equal([]);
    })

    it('should clear list with lamda function', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      temporaryItemList.add(c1);
      temporaryItemList.add(c2);
      temporaryItemList.clear(item => item === c1);
      temporaryItemList.getItems().should.be.deep.equal([c2]);
    })
  })

  describe('#contains', () => {
    it('should return true on one existing item', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      temporaryItemList.add(c1);
      temporaryItemList.add(c2);
      temporaryItemList.contains(c1).should.be.true;
    })
    it('should return false on one not existing item', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      temporaryItemList.add(c1);
      temporaryItemList.contains(c2).should.be.false;
    })
    it('should return true on two existing items', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      const c3 = new ItemCircle(new Point(20, 10), 40);
      temporaryItemList.add(c1);
      temporaryItemList.add(c2);
      temporaryItemList.add(c3);
      temporaryItemList.contains([c1, c2]).should.be.true;
    })
    it('should return false on two items - one existing, one not', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      const c3 = new ItemCircle(new Point(20, 10), 40);
      temporaryItemList.add(c1);
      temporaryItemList.add(c3);
      temporaryItemList.contains([c1, c2]).should.be.false;
    })
    it('should return true on empty items-array', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      temporaryItemList.add(c1);
      temporaryItemList.add(c2);
      temporaryItemList.contains([]).should.be.true;
    })
    it('should return false on items-array with no existing item', () => {
      const c1 = new ItemCircle(new Point(40, 30), 20);
      const c2 = new ItemCircle(new Point(10, 20), 30);
      const c3 = new ItemCircle(new Point(20, 10), 40);
      temporaryItemList.add(c1);
      temporaryItemList.add(c2);
      temporaryItemList.contains([c3]).should.be.false;
    })
  })

});
