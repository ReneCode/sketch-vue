
import IaRectangle from './ia/ia-rectangle';
import IaCircle from './ia/ia-circle';
import IaPolygon from './ia/ia-polygon';
import IaFreehand from './ia/ia-freehand';
import IaSelect from './ia/ia-select';
import IaDelete from './ia/ia-delete';
import IaCircleCursor from './ia/ia-circle-cursor';
import IaKeyCommand from './ia/ia-key-command';
import IaMove from './ia/ia-move';
import IaOnePoint from './ia/ia-one-point';
import IaTwoPoints from './ia/ia-two-points';
import IaZoom from './ia/ia-zoom';
import IaPickItems from './ia/ia-pick-items';
import IaPanning from './ia/ia-panning';
import IaImage from './ia/ia-image';

class InteractionFactory {
  constructor(transform) {
    this.transform = transform;
  }

  create(name) {
    let interAction;
    switch (name) {
      case "iaCircleCursor":
        interAction = new IaCircleCursor(this.transform);
        break;
      case "iaKeyCommand":
        interAction = new IaKeyCommand(this.transform);
        break;
      case "iaPanning":
        interAction = new IaPanning(this.transform);
        break;
      case "iaPickItems":
        interAction = new IaPickItems(this.transform);
        break;
      case "iaZoom":
        interAction = new IaZoom(this.transform);
        break;
      case "iaFreehand":
        interAction = new IaFreehand(this.transform);
        break;
      case "iaPolygon":
        interAction = new IaPolygon(this.transform);
        break;
      case "iaCircle":
        interAction = new IaCircle(this.transform);
        break;
      case "iaRectangle":
        interAction = new IaRectangle(this.transform);
        break;
      case "iaSelect":
        interAction = new IaSelect(this.transform);
        break;
      case "iaDelete":
        interAction = new IaDelete(this.transform);
        break;
      case "iaMove":
        interAction = new IaMove(this.transform);
        break;
      case "iaTwoPoints":
        interAction = new IaTwoPoints(this.transform);
        break;
      case "iaOnePoint":
        interAction = new IaOnePoint(this.transform);
        break;
      case "iaImage":
        interAction = new IaImage(this.transform);
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

