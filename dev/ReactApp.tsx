import {createComponent} from '@lit-labs/react';
import {IxVideo} from '../src/index';

//eslint-disable-next-line
const React = (window as any).React as typeof import('react');
//eslint-disable-next-line
const ReactDOM = (window as any).ReactDOM as typeof import('react-dom');
export const Video = createComponent(React, 'ix-video', IxVideo, {
  onSeeked: 'seeked',
});

const dataSetup = JSON.stringify({
  playbackRates: [0.5, 1, 1.5, 2],
});

export function App() {
  // eslint-disable-next-line
  const handleSeeked = (e: any) => {
    console.log('ix-video: seeked', e);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div style={{height: 500, width: 500}}>
          <Video
            width="480"
            height="255"
            controls
            source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
            data-setup={dataSetup}
            data-test-id="react-player"
            className="my-custom-class"
            onSeeked={handleSeeked}
          />
        </div>
      </header>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
