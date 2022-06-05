import React, { useEffect, useState } from 'react';
export const LOOM_ASSISTANT_CLASS = 'loom-assistant-class';
// @ts-ignore
import { ReactComponent as Copy } from './Copy.svg';
import './CopyButton.scss';

export function CopyButton({ element }: { element: HTMLElement }) {
  const buttonClass = `${element.className} ${LOOM_ASSISTANT_CLASS}`;
  const [gifUrl, setGifUrl] = useState<string>();
  const [copyInProgress, setCopyInProgress] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.sync.get(['gifUrl'], ({ gifUrl }: any) => {
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

    setCopyInProgress(true);
    copyGif();

    setTimeout(() => {
      setCopyInProgress(false);
    }, 2000);
  };

  return (
    <div
      title={gifUrl ? '' : 'Please set a gif URL in the Loom Assistant options'}
    >
      <button className={buttonClass} disabled={!gifUrl} onClick={onClick}>
        <div className="icon-container">
          <Copy />
        </div>
        <span>{copyInProgress ? 'Copied!' : 'Copy with gif'}</span>
      </button>
    </div>
  );
}
