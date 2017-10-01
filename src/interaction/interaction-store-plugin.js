
import interactionMode from './interaction-mode';

const interactionStorePlugin = (store) => {
  store.subscribe((mutation, state) => {
    // is called AFTER every mutation
    if (mutation.type === 'setInteractionMode') {
      interactionMode.set(mutation.payload);
    }
  });
}

export default interactionStorePlugin;
