import IaBase from './ia-base'
import interaction from './index';
import undoRedoList from '@/store/modules/undo-redo-list';
import selectionList from '@/store/selectionList';

export default class IaKeyCommand extends IaBase {
  start() {
  }

  onKeyDown(event) {
    console.log("Key:", event.key);
    switch (event.key.toLowerCase()) {
      case 'f':
        interaction.startOnly('iaFreehand');
        break;
      case 'c':
        interaction.startOnly('iaCircle');
        break;
      case 'r':
        interaction.startOnly('iaRectangle');
        break;
      case 'p':
        interaction.startOnly('iaPolygon');
        break;
      case 'z':
        if (event.metaKey) {
          selectionList.clear();
          undoRedoList.undo();
        }
        break;
      default:
        return;
    }
    return "stop";
  }

}
