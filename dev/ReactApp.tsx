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
  // eslint-disable-next-line
  const handleEvent = (e: any, type: string) => {
    console.log('ix-video: ' + type, e);
  };
  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="mobile">
            <Video
              controls
              source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
              data-setup={dataSetup}
              data-test-id="react-player"
              className="my-custom-class"
              onError={(e) => handleEvent(e, 'error')}
              onSeeked={(e) => handleEvent(e, 'seeked')}
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
