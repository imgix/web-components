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
  //  TODO: style video.js classes
  // static override styles = css``;
  videoRef = createRef<HTMLVideoElement>();

  /**
   * The source of the HLS video playlist
   */
  @property({type: String})
  source = '';

  /**
   * Video player width
   */
  @property({type: String})
  width = '100%';

  /**
   * Video player height
   */
  @property({type: String})
  height = '100%';

  override render() {
    return html`
      <link
        href="https://vjs.zencdn.net/7.18.1/video-js.css"
        rel="stylesheet"
      />
      <style>
        #ix-video-player {
          width: ${this.width};
          height: ${this.height};
        }
      </style>
      <video
        ${ref(this.videoRef)}
        class="video-js vjs-default-skin"
        controls
        id="ix-video-player"
        part="video"
      >
        <source src="${this.source}" type="application/x-mpegURL" />
      </video>
    `;
  }

  override firstUpdated(): void {
    videojs(this.videoRef?.value as HTMLVideoElement, {}, () => {
      videojs.log('Your player is ready!');
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ix-video': IxVideo;
  }
}
