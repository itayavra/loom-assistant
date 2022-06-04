import React from 'react';
import { render } from 'react-dom';
import { CopyButton } from './CopyButton';

export const addButton = (element: HTMLElement) => {
  const containerClass = element.parentElement?.className;
  const buttonElement = <CopyButton element={element} />;

  const containerElement = document.createElement('div');
  containerElement.setAttribute('class', containerClass || '');
  element.parentElement?.insertAdjacentElement('beforebegin', containerElement);
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
