import IaBase from './ia-base'
import interaction from '../../interaction';

export default class IaPickItems extends IaBase {
  start(options) {
    this.options = options;
    this.iaCircleCursor = interaction.start('iaCircleCursor');
  }

  stop() {
    interaction.stop(this.iaCircleCursor);
  }

  onMouseDown(event) {
    const point = this.getSVGPoint(event);
    const circlePickRadius = this.iaCircleCursor.getRadius();
    const pickedItems = this.pickItems(point, circlePickRadius);
    this.dispatch('onMouseDown', event, pickedItems);
  }

  dispatch(eventName, event, items) {
    if (this.options && this.options.callbackName) {
      const payload = {
        eventName: eventName,
        event: event,
        items: items
      };
      interaction.dispatch(this.options.callbackName, payload);
    }
  }
}
