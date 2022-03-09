---
layout: page.11ty.cjs
title: shared-wc ⌲ Home
---

# shared-wc

shared-wc is an imgix web components library.

## As easy as HTML

<section class="columns">
  <div>

`<ix-video>` is just an HTML element. You can it anywhere you can use HTML!

```html
<ix-video></ix-video>
```

  </div>
  <div>

<ix-video></ix-video>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<ix-video>` can be configured with attributed in plain HTML.

```html
<ix-video
  videoSrc="https://assets.imgix.net/videos/girl-reading-book-in-library.mp4"
></ix-video>
```

  </div>
  <div>

<ix-video videoSrc="https://assets.imgix.net/videos/girl-reading-book-in-library.mp4"></ix-video>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<ix-video>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const videoSrc =
  'https://assets.imgix.net/videos/girl-reading-book-in-library.mp4';

render(
  html`
    <h2>This is a &lt;ix-video&gt;</h2>
    <ix-video .videoSrc=${videoSrc}></ix-video>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;ix-video&gt;</h2>
<ix-video videoSrc="https://assets.imgix.net/videos/girl-reading-book-in-library.mp4"></ix-video>

  </div>
</section>
