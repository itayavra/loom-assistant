import React, { ChangeEvent, useEffect, useState } from 'react';
import './Options.scss';

const Options: React.FC = () => {
  const [gifUrl, setGifUrl] = useState<string>();
  const [isFormPristine, setIsFormPristine] = useState<boolean>(true);

  useEffect(() => {
    chrome.storage.sync.get(['gifUrl'], ({ gifUrl }: any) => {
      setGifUrl(gifUrl);
    });
  }, []);

  const onSave = (event: any) => {
    if (isFormPristine) {
      return;
    }

    chrome.storage.sync.set({ gifUrl });
    event.preventDefault();
    setIsFormPristine(true);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGifUrl(event.target.value);
    setIsFormPristine(false);
  };

  return (
    <>
      <div className="root row">
        <div className="col-lg-6">
          <div className="card options-panel">
            <div className="card-header">
              <h3 className="card-title">Options</h3>
            </div>

            <div className="card-body">
              <form>
                <div className="row g-3">
                  <div className="col-lg-12">
                    <label className="form-label">Gif address:</label>
                    <input
                      className="form-control"
                      value={gifUrl}
                      onChange={onChange}
                      placeholder="Enter gif address"
                    />
                  </div>
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={onSave}
                      disabled={isFormPristine}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6 gif-container">
          <img className="gif-url" src={gifUrl} />
        </div>
      </div>
    </>
  );
};

export default Options;
