
import interaction from './index'

const iaMatrix = {
  'select': [
    'iaZoom',
    'iaMove',
    'iaKeyCommand',
    'iaSelect'
  ],

  'delete': [
    'iaZoom',
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
  ],

  'image': [
    'iaImage'
  ]

}

class InteractionMode {

  set(payload) {
    const mode = payload.mode;
    let ias = iaMatrix[mode];
    if (!ias) {
      throw new Error(`Invalid interaction mode: ${mode}`);
    }
    interaction.clear();
    for (const ia of ias) {
      interaction.start(ia, payload);
    }
  }
}

const interactionMode = new InteractionMode();
export default interactionMode;
