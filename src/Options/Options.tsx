import React, { ChangeEvent, useEffect, useState } from "react";
import "./Options.scss";

const Options: React.FC = () => {
  const [gifUrl, setGifUrl] = useState<string>();
  const [isFormPristine, setIsFormPristine] = useState<boolean>(true);

  useEffect(() => {
    chrome.storage.sync.get(["gifUrl"], ({ gifUrl }: any) => {
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
          <div className="panel panel-default options-panel">
            <div className="panel-heading">
              <h3 className="panel-title">Options:</h3>
            </div>

            <div className="panel-body">
              <form>
                <div className="form-group">
                  <label>Gif URL:</label>
                  <input
                    className="form-control"
                    value={gifUrl}
                    onChange={onChange}
                    placeholder="Enter gif URL"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={onSave}
                  disabled={isFormPristine}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <img className="gif-url" src={gifUrl} />
        </div>
      </div>
    </>
  );
};

export default Options;
