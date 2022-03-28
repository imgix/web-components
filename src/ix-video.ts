import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

/**
 * @csspart video - The video element
 */
@customElement('ix-video')
export class IxVideo extends LitElement {
  videoRef = createRef<HTMLVideoElement>();

  /**
   * The source of the HLS video playlist
   */
  @property({type: String})
  videoSrc = '';
  override render() {
    return html`
      <style>
        #ix-video-player {
          width: 450px;
          height: 250px;
        }
      </style>
      <video
        ${ref(this.videoRef)}
        autoplay
        class="video-js vjs-default-skin"
        controls
        id="ix-video-player"
        part="video"
        src=${this.videoSrc}
      ></video>
    `;
  }

  override firstUpdated(): void {
    videojs(this.videoRef?.value as HTMLVideoElement, {}, () => {
      videojs.log('Your player is ready!');
      console.log(this);
    });
  }

  /**
   * This is a hack to disable Shadow DOM in lit-element. Removes the shadowRoot
   * and renders the elements as children of the host element.
   *
   * This also impedes our ability to use `css` and `cssPart` in lit-element.
   * Styling is instead done in the style tag.
   */
  protected override createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ix-video': IxVideo;
  }
}
