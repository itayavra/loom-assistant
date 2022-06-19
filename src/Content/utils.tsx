import React from 'react';
import { render } from 'react-dom';
import { CopyButton } from './CopyButton';

export const addButton = (element: HTMLElement) => {
  const containerElement = document.createElement('div');
  element.insertAdjacentElement('beforebegin', containerElement);

  const buttonElement = <CopyButton element={element} />;
  render(buttonElement, containerElement);
};

export const startScript = (
  onDomChange: (
    observer: MutationObserver,
    mutationRecords: MutationRecord[]
  ) => void
) => {
  const observer = new MutationObserver(async (mutationsList) => {
    onDomChange(observer, mutationsList);
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};
