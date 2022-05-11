<script setup>
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
