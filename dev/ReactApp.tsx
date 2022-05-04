import {createComponent} from '@lit-labs/react';
import {IxVideo} from '../src/index';

//eslint-disable-next-line
const React = (window as any).React as typeof import('react');
//eslint-disable-next-line
const ReactDOM = (window as any).ReactDOM as typeof import('react-dom');
export const Video = createComponent(React, 'ix-video', IxVideo, {
  onSeeked: 'seeked',
  onError: 'error',
});

const dataSetup = JSON.stringify({
  playbackRates: [0.5, 1, 1.5, 2],
});

export function App() {
  const [hasControls, setHadControls] = React.useState(true);
  const [fixed, setFixed] = React.useState(false);
  const [playerWidth, setPlayerWidth] = React.useState(0);
  // eslint-disable-next-line
  const handleEvent = (e: any, type: string) => {
    console.log('ix-video: ' + type, e);
  };
  const handleClick = () => {
    setHadControls(!hasControls);
  };
  const handleFixed = () => {
    setFixed(!fixed);
  };

  const updateWith = () => {
    setPlayerWidth(playerWidth + 100);
  };
  return (
    <>
      <div className="App">
        <header className="App-header">
          <button onClick={handleClick}>Toggle controls</button>
          <button onClick={handleFixed}>Toggle fixed</button>
          <button onClick={updateWith}>Increase width +100</button>
          <div className="mobile">
            <Video
              controls={hasControls}
              source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
              data-setup={dataSetup}
              data-test-id="react-player"
              className="my-custom-class"
              onError={(e) => handleEvent(e, 'error')}
              onSeeked={(e) => handleEvent(e, 'seeked')}
              poster="https://sdk-test.imgix.net/amsterdam.jpg"
              width={playerWidth ? playerWidth + '' : undefined}
              fixed={fixed}
            />
          </div>
        </header>
      </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
