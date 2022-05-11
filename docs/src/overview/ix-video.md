# 📹 ix-video

**ix-video** is a web component that makes it quick and easy to use our powerful video processing and delivery platform inside your web application.

The component is built on top of the [video.js](https://videojs.com) library, which is a free, open source, cross-platform video player library for the web that is used by millions of developers.

Features:

[🏎️ Fast, High-Quality Streaming By Default](#basic-usage)

[🎨 Fully customizable out of the box](#customization)

[📝 Support for all HTML5 video formats](#type)

[⚙️ Powerful configuration options](#video-js-configuration)

## Setup

::: tip Note

**HLS** is the default playback format for [imgix video](https://blog.imgix.com/2021/12/15/streaming-video-part-3-http-live-streaming) and the `ix-video` player.

HLS video playback leverages adaptive bitrate streaming **(ABS)** technology to deliver the smooth video quality in the quickest time possible.
:::

### Frontend Frameworks

If you're using the library in React or Vue, you might have to take some additional steps to get the component to work correctly.

#### Vue

Vue has great support for Web Components, so you can use the component in your Vue application without any additional steps.

However, Vue might show some warnings in the console if you don't declare your custom element in it's configuration. To turn these warnings off, you can add the following:

```js
// vite.config.js
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

#### React

React can render Web Components, but it has [trouble](https://custom-elements-everywhere.com/#react) passing React props to custom element properties and event listeners.

We recommend using a wrapper like [@lit-labs/react](https://github.com/lit/lit/tree/main/packages/labs/react#readme) to wrap the custom element in a React component that passes props and synthetic events to the custom element.

```jsx
import * as React from 'react';
import {createComponent} from '@lit-labs/react';
import {IxVideo} from '../src/index';

// wrap the component to ensure that ix-video custom events are handled correctly
export const Video = createComponent(React, 'ix-video', IxVideo, {
  onSeeked: 'seeked',
  onError: 'error',
});

// now we can use the events in react
<Video onSeeked={(e) => console.log(e)} />;
```

## Basic Usage

First import the component:

```js
import {IxVideo} from '@imgix/web-components';
```

We recommend you do this in the root of your application so that the custom elements are registered for the entire application.

Then, use the `ix-video` custom element and set the `source` attribute to the source URL of the HLS playlist:

<<< @/src/.vuepress/components/video/hls.vue

And you're ready to go 🎉.

<video-hls></video-hls>

## Attributes

The component is designed to mimic the `<video>` tag [API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes) as closely as possible. So most of the [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes) that are supported by the `<video>` tag are also supported by the `<ix-video>` tag.

You can find a list of the supported `<video>` element attributes [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

::: details click to see some of the other supported attributes

- [`autoplay`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-autoplay)
- [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-crossorigin)
- [`loop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-loop)
- [`muted`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-muted)
- [`playsinline`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-playsinline)
- [`poster`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster)
- [`preload`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)
  :::

Additionally, the following non-standard attributes are used:

| Attribute    |         Description          |           Default Value |
| ------------ | :--------------------------: | ----------------------: |
| `data-setup` |  video.js specific options   |                    `{}` |
| `fixed`      |  Turns on/off auto-resizing  |                 `false` |
| `source`     | The source URL for the video |             `undefined` |
| `type`       |     The video media type     | `application/x-mpegURL` |

### controls

> default: `true`

Show/hide the player controls.

### dataSetup

> default: `{}`

Set video.js specific options. See [video.js documentation](https://videojs.com/guides/options/) for examples.

### height

Set the video player's height. If `fixed` is set to `true`, the player will not automatically resize to fit inside the container's dimensions.

```html
<ix-video
  source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
  height="200"
  fixed="true"
  controls
>
</ix-video>
```

<ix-video
source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
height="200"
fixed="true"
controls

> </ix-video>

### poster

> default: undefined

The video's poster image URL. The `poster` attribute will automatically try to resize the poster image to fit the video player's dimensions.

```html
<ix-video
  controls
  poster="https://sdk-test.imgix.net/amsterdam.jpg"
  source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
>
</ix-video>
```

<ix-video
controls
poster="https://sdk-test.imgix.net/amsterdam.jpg"
source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"

> </ix-video>

### source

> default: undefined

The video's source URL. Should be used in combination with `type` attribute when the `source` is not an HLS source.

### type

> default: application/x-mpegURL

The media type of the video. Supports standard `video` media types and **HLS** media types.

```html
<ix-video
  controls
  preload="none"
  poster="https://sdk-test.imgix.net/amsterdam.jpg"
  source="https://assets.imgix.net/videos/girl-reading-book-in-library.mp4"
  type="video/mp4"
>
</ix-video>
```

<ix-video
controls
preload="none"
poster="https://sdk-test.imgix.net/amsterdam.jpg"
source="https://assets.imgix.net/videos/girl-reading-book-in-library.mp4"
type="video/mp4"

> </ix-video>

### width

> default: undefined

The width of the video player. When `fixed` is set to `true`, the player will not automatically resize to fit inside the container's dimensions.

```html
<ix-video
  source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
  width="200"
  controls
>
</ix-video>
```

<ix-video
source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
width="200"
controls

> </ix-video>

## Customization

The `ix-video` player uses [video-js](https://videojs.com/getting-started) and its default [skin](https://videojs.com/getting-started/#skinning) to style the player. Therefore, you can can target any of the video-js components and customize their appearance.

For example, if you want to change big play button color to red, you can do it by adding the following CSS class to the `ix-video` component:

<<< @/src/.vuepress/components/video/styles.vue#snippet{4-13,22}

Now, on first load, the player's big play button will look like this:

<video-styles></video-styles>

## Advanced Usage

### Restricting the player's size

You can restrict the video player's dimensions to a specific size one of two ways:

1. by styling its container.
2. by specifying the `width` and `height` attributes and
3. by adding the `fixed` attribute

<<< @/src/.vuepress/components/video/container.vue#snippet{3,10,15-17}

The `fixed` attribute will force the player to be a fixed size. This is useful if you want to use the player in a layout that has a fixed width.

Without the `fixed` attribute, the player will be responsive to the size of the container it is placed in.

You can resize this window to see the difference.

<video-container></video-container>

### Video.js configuration

`ix-video` accepts most of the `data-setup`
[options](https://videojs.com/guides/options) supported by video.js. This allows
you to customize the player's capabilities and behavior beyond what's available
to native `<video>` element.

For example, you can add playback speed support to the player by adding the
following data-setup option:

```html
<ix-video
  controls
  source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
  data-setup='{"playbackRates": [0.5, 1, 1.5, 2]}'
></ix-video>
```

Your video will now display the defined playback rate options on the bottom
right-hand side of the playback controls.

<ix-video
controls
source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
data-setup='{"playbackRates": [0.5, 1, 1.5, 2]}'

> </ix-video>

::: tip video.js plugins
We don't at this time offer explicit support for video.js plugins. You can refer
to their documentation for more information on how these can be used.
:::
