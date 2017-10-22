
let should = require('chai').should();

import ItemPolyline from '../src/models/item-polyline'
import ItemPolygon from '../src/models/item-polygon'
import ItemImage from '../src/models/item-image'

import itemFactory from '../src/models/item-factory'

describe('ItemFactory', () => {
  it('should ItemPolyline', () => {
    const svg = {
      type: "polyline",
      stroke: "red",
      points: [
        { x: 10, y: 110 },
        { x: 20, y: 120 }
      ]
    }

    let item = itemFactory.createFromSvg(svg);
    (item instanceof ItemPolyline).should.be.true
    item.svg.type.should.be.equal('polyline');
    item.svg.stroke.should.be.equal('red');
    item.svg.points.length.should.be.equal(2);
  });

  it('should ItemPolygon', () => {
    const svg = {
      type: "polygon",
      stroke: "red",
      points: [
        { x: 10, y: 110 },
        { x: 20, y: 120 }
      ]
    }

    let item = itemFactory.createFromSvg(svg);
    (item instanceof ItemPolygon).should.be.true
    item.svg.type.should.be.equal('polygon');
    item.svg.stroke.should.be.equal('red');
    item.svg.points.length.should.be.equal(2);
  });

  it('should ItemImage', () => {
    const svg = {
      type: "image",
      x: 42,
      y: 33,
      imageUrl: "pic.png"
    }

    let item = itemFactory.createFromSvg(svg);
    (item instanceof ItemImage).should.be.true
    item.svg.type.should.be.equal('image');
    item.svg.x.should.be.equal(42);
    item.svg.y.should.be.equal(33);
    item.svg.imageUrl.should.be.equal('pic.png');
  });

});
