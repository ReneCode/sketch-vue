
import IaRectangle from './ia-rectangle';
import IaCircle from './ia-circle';
import IaPolygon from './ia-polygon';
import IaFreehand from './ia-freehand';
import IaSelect from '@/interaction/ia-select';
import IaDelete from './ia-delete';
import IaMove from './ia-move';
import IaOnePoint from './ia-one-point';
import IaTwoPoints from './ia-two-points';
import IaZoom from './ia-zoom';

class InteractionFactory {
  constructor(transform, tmpItems) {
    this.transform = transform;
    this.tmpItems = tmpItems;
  }

  create(name) {
    let interAction;
    switch (name) {
      case "iaZoom":
        interAction = new IaZoom(this.transform);
        break;
      case "iaFreehand":
        interAction = new IaFreehand(this.transform, this.tmpItems);
        break;
      case "iaPolygon":
        interAction = new IaPolygon(this.transform, this.tmpItems);
        break;
      case "iaCircle":
        interAction = new IaCircle(this.transform, this.tmpItems);
        break;
      case "iaRectangle":
        interAction = new IaRectangle(this.transform, this.tmpItems);
        break;
      case "iaSelect":
        interAction = new IaSelect(this.transform, this.tmpItems);
        break;
      case "iaDelete":
        interAction = new IaDelete(this.transform, this.tmpItems);
        break;
      case "iaMove":
        interAction = new IaMove(this.transform, this.tmpItems);
        break;
      case "iaTwoPoints":
        interAction = new IaTwoPoints(this.transform, this.tmpItems);
        break;
      case "iaOnePoint":
        interAction = new IaOnePoint(this.transform, this.tmpItems);
        break;
    }
    if (!interAction) {
      throw new Error("can not create Interaction: " + name);
    }
    interAction.name = name;
    return interAction;
  }
}

// ---------------

export default InteractionFactory;

