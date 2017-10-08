
import interaction from './index'

const iaMatrix = {
  'select': [
    'iaZoom',
    'iaMove',
    'iaKeyCommand',
    'iaSelect'
  ],

  'delete': [
    'iaDelete'
  ],

  'panning': [
    'iaPanning'
  ],

  'rectangle': [
    'iaRectangle'
  ],

  'circle': [
    'iaCircle'
  ],

  'polygon': [
    'iaPolygon'
  ],

  'freehand': [
    'iaFreehand'
  ]

}

class InteractionMode {

  set({ projectId, pageId, mode }) {
    let ias = iaMatrix[mode];
    if (!ias) {
      console.log("no valid interaction mode:", mode);
      return;
    }
    interaction.clear();
    for (const ia of ias) {
      interaction.start(ia, { projectId, pageId });
    }
  }
}

const interactionMode = new InteractionMode();
export default interactionMode;
