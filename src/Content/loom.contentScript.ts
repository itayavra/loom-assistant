import { addButton, startScript } from './utils';
import { LOOM_ASSISTANT_CLASS } from './CopyButton';

const injectionNeeded = () => {
  return document.getElementsByClassName(LOOM_ASSISTANT_CLASS).length === 0;
};

const getButtonElement = () => {
  return document.querySelector('[data-testid="share-modal-button"]');
};

startScript(async (observer) => {
  if (!injectionNeeded()) {
    return;
  }

  const button = getButtonElement();
  console.log('share-modal-button:', button);

  if (!button) {
    return;
  }

  addButton(button as any);
  observer.disconnect();
});
