# imgix/web-components

imgix SDK team Web Component library.

[![npm version](https://img.shields.io/npm/v/@imgix/web-components.svg)](https://www.npmjs.com/package/@imgix/web-components)
[![circleci](https://circleci.com/gh/imgix/web-components/tree/next.svg?style=shield&circle-token=ae497a4aade0e744c31dc29c97b967a8011ef8af)](https://circleci.com/gh/imgix/web-components/?branch=next)

# Install

Install this package in your project:

```bash
npm i @imgix/web-components
```

Or

```bash
yarn add @imgix/web-components
```

# Usage

This library exports a collection of Web Components. Below is an example of how
to import and use the `IxVideo` web-component in your project.

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

You will need to signal to the Vue compiler that this component is a custom element by adding the following:

```js
//vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with ix- as custom elements
          isCustomElement: (name) => name.startsWith('ix-'),
        }
      }))
  }
```

Or with Vite:

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

### HTML

```html
<script type="module">
  import {IxVideo} from './node_modules/@imgix/web-components/dist/index.bundled.js';
</script>
<!-- Alternatively, the component can be loaded via a CDN -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@imgix/web-components@1.0.0/dist/index.bundled.js"></script>
<body>
    <ix-video
      controls
      source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
      data-setup='{ "playbackRates": [0.5, 1, 1.5, 2] }'
    ></ix-video>
</body>
```

# Development

## Setup

Install dependencies:

```bash
npm i
```

## Build

This repo uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

## Testing

This repo uses Cypress to run e2e tests.

Tests can be run with the `test` script, which will run your tests against Lit's development mode (with more verbose errors):

```bash
npm run test
```

For local e2e testing during development, you can run `npm run dev` and `npm run cypress:open` to start the development server and open the Cypress UI.

Alternatively the `test:prod` command will run your tests in Lit's production mode.

## Dev Server

This repo uses Vite to bundle and serve the component files for local development.

To run the dev server and open the project in a new browser tab:

```bash
npm run dev
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:3000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run dev:prod`.

## Editing

If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't already have it installed.

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

## Bundling and minification

This project uses Rollup to bundle and minify the TypeScript component files
into a single file in `dist/`. THe rollup config is located at
`rollup.config.js`.
