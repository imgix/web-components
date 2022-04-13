# imgix/web-components

imgix SDK team Web Component library.

# Install

> Note: this package has not yet been published so these example are not yet usable

Install this package in your project:

```bash
npm i @imgix/web-components
```

Or

```bash
yarn add @imgix/web-components
```

# Usage

This library exports a collection of Web Components. Bellow is an example of how
to import and use the `IxVideo` web-component in your project.

To use the library in your project:

### React

```jsx
import {IxVideo} from `@imgix/web-components`;
import { createComponent } from "@lit-labs/react";
// ... wrap the component with Lit's React wrapper
export const Video = createComponent(React, "ix-video", IxVideo, {
  onactivate: "activate",
  onchange: "change",
});
// ... use the component
function App() {
  return (
    <div className="App">
        <div style={{ height: 500, width: 500 }}>
          <Video
            width="480"
            height="255"
            controls
            source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
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
  import {IxVideo} from '@imgix/shared-wc';
</script>

<template>
  <div
    style="width: 500px; height: 500px; display: flex; justify-content: center; margin: auto"
  >
    <ix-video
      width="480"
      height="255"
      controls
      source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
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
npm test
```

For local testing during development, the `test:dev:watch` command will run your tests in Lit's development mode (with verbose errors) on every change to your source files:

```bash
npm test:watch
```

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
