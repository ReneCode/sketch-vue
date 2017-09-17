
import ItemCircle from './item-circle';
import ItemRectangle from './item-rectangle';
import ItemPolygon from './item-polygon';
import ItemPolyline from './item-polyline';

class ItemFactory {
  createFromSvg(svg) {
    switch (svg.type) {
      case 'rect':
        return ItemRectangle.createFromSvg(svg);
      case 'circle':
        return ItemCircle.createFromSvg(svg);
      case 'polygon':
        return ItemPolygon.createFromSvg(svg);
      case 'polyline':
        return ItemPolyline.createFromSvg(svg);
    }
    throw new Error("ItemFactory. bad svg type:" + svg.type);
  }
}

const itemFactory = new ItemFactory();
export default itemFactory;

