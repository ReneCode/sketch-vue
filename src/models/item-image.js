
import ItemBase from './item-base';
import Point from './point';

class ItemImage extends ItemBase {
  constructor(pt, imageUrl) {
    super(0);
    pt = pt || new Point();
    imageUrl = imageUrl || "";
    let svg = {
      type: 'image',
      x: pt.x,
      y: pt.y,
      imageUrl: imageUrl
    }
    this.svg = svg;
  }

  static createFromSvg(svg) {
    let image = new ItemImage();
    Object.assign(image.svg, svg);
    return image;
  }

  clone() {
    let newImage = new ItemImage();
    const clone = JSON.parse(JSON.stringify(this));
    Object.assign(newImage, clone);
    return newImage;
  }

  move(delta) {
    this.svg.x += delta.x;
    this.svg.y += delta.y;
  }

  setPosition(pt) {
    this.svg.x = pt.x;
    this.svg.y = pt.y;
  }

  nearPoint(point, radius) {
    let p2p = new Point(this.svg.x, this.svg.y).sub(point);
    const distance = p2p.length();
    return distance <= radius;
  }
}

export default ItemImage;
