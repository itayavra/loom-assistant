/* global chrome */
import React, { useEffect, useState } from 'react';
export const LOOM_ASSISTANT_CLASS = 'loom-assistant-class';
import './content.styles.scss';

export function CopyButton({ element }: { element: HTMLElement }) {
  const buttonClass = `${element.className} ${LOOM_ASSISTANT_CLASS}`;
  const defaultButtonText = 'Copy gif';
  const [buttonText, setButtonText] = useState<string>(defaultButtonText);
  const [gifUrl, setGifUrl] = useState<string>();

  useEffect(() => {
    chrome.storage.sync.get(['gifUrl'], function ({ gifUrl }: { gifUrl: string }) {
      setGifUrl(gifUrl);
    });
  }, []);

  const copyGif = () => {
    const gitHtml = `
    <a href="${location.href}">
      <img
        style="max-width: 300px"
        src="${gifUrl}"
      />
    </a>
  `;
    document.oncopy = function (event) {
      event.clipboardData?.setData('text/html', gitHtml);
      event.preventDefault();
    };
    document.execCommand('copy', false);
  };

  const onClick = () => {
    if (!gifUrl) {
      return;
    }

    copyGif();
    setButtonText('Copied!');
    setTimeout(() => {
      setButtonText(defaultButtonText);
    }, 2000);
  };

  return (
    <div title={gifUrl ? '' : 'Please set a gif URL in the Loom Assistant options'}>
      <button className={buttonClass} disabled={!gifUrl} onClick={onClick}>
        <span>{buttonText}</span>
      </button>
    </div>
  );
}
