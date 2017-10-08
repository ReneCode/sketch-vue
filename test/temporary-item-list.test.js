
let should = require('chai').should();

import Line from '../src/models/line'
import ItemCircle from '../src/models/item-circle';
import Point from '../src/models/point';

import temporaryItemList from '../src/store/temporary-item-list';

describe('temporaryItemList', () => {
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

  it('should removeItem', () => {
    const pt = new Point(40, 30)
    const circle = new ItemCircle(pt, 20);
    temporaryItemList.add(circle);
    temporaryItemList.remove(circle).should.be.equal(true);
    temporaryItemList.getItems().should.be.deep.equal([]);
  })

  it('should removeItem and let the others', () => {
    const c1 = new ItemCircle(new Point(40, 30), 20);
    const c2 = new ItemCircle(new Point(10, 20), 30);
    temporaryItemList.add(c1);
    temporaryItemList.add(c2);
    temporaryItemList.remove(c1);
    temporaryItemList.getItems().should.be.deep.equal([c2]);
  })

  it('should not remove Item that is not in the list', () => {
    const c1 = new ItemCircle(new Point(40, 30), 20);
    const c2 = new ItemCircle(new Point(10, 20), 30);
    temporaryItemList.add(c1);
    temporaryItemList.remove(c2).should.be.equal(false);
    temporaryItemList.getItems().should.be.deep.equal([c1]);
  })

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

});
