import IaBase from './ia-base'
import ItemCircle from '@/models/item-circle';
import Point from '@/models/point';
import temporaryItemList from '@/store/temporary-item-list';

export default class IaCircleCursor extends IaBase {
  circleScreenRadius = 15;
  circleScreenStrokeWith = 2;
  circleRadius = 0;
  circleFill = "gray";

  getCircleRadius() {
    return this.circleRadius;
  }

  start(options) {
    if (options.circleFill) {
      this.circleFill = options.circleFill;
    }
    this.createCursor();
  }

  stop() {
    this.cursor = null;
  }

  onMouseMove(event) {
    const point = this.getSVGPoint(event);
    this.cursor.setPosition(point);
  }

  onMouseWheel() {
    this.updateCircleRadius();
  }

  createCursor() {
    if (!this.cursor) {
      const pt = new Point(0, 0)
      this.circleRadius = this.screenDistanceToSVGDistance(this.circleScreenRadius);
      this.cursor = new ItemCircle(pt, this.circleRadius);
      this.cursor.svg.stroke = "#111";
      this.cursor.svg.strokeWidth = this.screenDistanceToSVGDistance(this.circleScreenStrokeWith);
      this.cursor.svg.fill = this.circleFill;
      temporaryItemList.add(this.cursor);
    }
  }

  updateCircleRadius() {
    this.circleRadius = this.screenDistanceToSVGDistance(this.circleScreenRadius);
    this.cursor.setRadius(this.circleRadius);
    this.cursor.svg.strokeWidth = this.screenDistanceToSVGDistance(this.circleScreenStrokeWith);
  }
}
