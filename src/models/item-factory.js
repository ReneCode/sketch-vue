
import ItemCircle from './item-circle';
import ItemRectangle from './item-rectangle';
import ItemPolygon from './item-polygon';

class ItemFactory {
  createFromSvg(svg) {
    switch (svg.type) {
      case 'rect':
        return ItemRectangle.createFromSvg(svg);
      case 'circle':
        return ItemCircle.createFromSvg(svg);
      case 'polygon':
        return ItemPolygon.createFromSvg(svg);
    }
    throw new Error("ItemFactory. bad svg type:" + svg.type);
  }
}

const itemFactory = new ItemFactory();
export default itemFactory;

