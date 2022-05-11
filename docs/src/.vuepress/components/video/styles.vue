<template>
  <div>
    <style>
      .red-play > .vjs-big-play-button {
        background-color: red;
        color: white;
        transition: background-color ease-in-out 0.2s;
      }
      .red-play > .video-js:hover > .vjs-big-play-button {
        background-color: coral;
        color: white;
        transition: background-color 0.2s;
      }
      .video-js:hover {
        cursor: pointer;
      }
    </style>
    <!-- 
      * Add `red-play` class to ix-video that will make the play button red
    -->
    <ix-video
      class="red-play"
      controls
      source="https://assets.imgix.video/videos/girl-reading-book-in-library.mp4"
    ></ix-video>
  </div>
</template>
