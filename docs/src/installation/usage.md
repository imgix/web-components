# Usage

This library exports a collection of Web Components. Bellow is an example of how
to import and use the `IxVideo` web-component in your project.

To use the library in your project:

### React

```jsx
import * as React from 'react';
import {IxVideo} from '@imgix/web-components';
import {createComponent} from '@lit-labs/react';

// ... wrap the component with Lit's React wrapper
export const Video = createComponent(React, 'ix-video', IxVideo, {
  onError: 'error',
});

// ... use the component
function App() {
  const handleEvent = (e: any, type: string) => {
    console.info('ix-video: ' + type, e);
  };

  return (
    <div className="App">
      <div style={{height: 500, width: 500}}>
        <Video
          controls
          source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
          onError={(e) => handleEvent(e, 'error')}
        />
      </div>
    </div>
  );
}

export default App;
```

### Vue

```html
<script setup>
  import {IxVideo} from '@imgix/web-components';
  import {ref} from 'vue';
</script>
<script>
  // store a ref to the component
  const ixVideo = ref(null);
  export default {
    methods: {
      warn(message, event) {
        // event handler
        const video = ixVideo.value;
        console.warn(message, event.detail);
      },
      toggleControls() {
        // update component props
        const video = ixVideo.value;
        video.controls = !video.controls;
      },
    },
  };
</script>

<template>
  <div class="App">
    <button @click="() => toggleControls()">Toggle Controls</button>
    <ix-video
      ref="ixVideo"
      controls
      source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
      data-setup='{ "playbackRates": [0.5, 1, 1.5, 2] }'
      @error="(event) => warn('error:', event)"
    ></ix-video>
  </div>
</template>
```

Vue might show some warnings in the console if you don't declare your custom
element in it's configuration. To turn these warnings off, add the following:

```js
//vite.config.js
import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (name) => name.startsWith('ix-'),
        },
      },
    }),
  ],
});
```
