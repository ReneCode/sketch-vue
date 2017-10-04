
import interaction from './index'

const iaMatrix = {
  'select': [
    'iaZoom',
    'iaSelect',
    'iaDelete',
    'iaMove',
    'iaCursor'
  ],

  'rectangle': [
    // 'iaZoom',
    'iaRectangle'
  ],

  'circle': [
    // 'iaZoom',
    'iaCircle'
  ],

  'polygon': [
    // 'iaZoom',
    'iaPolygon'
  ],

  'freehand': [
    // 'iaZoom',
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
