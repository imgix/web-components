import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ref, createRef} from 'lit/directives/ref.js';

import videojs from 'video.js';

/**
 *
 * @fires ix-video-clicked - Indicates that the video has been clicked on
 * @csspart video - The video element
 */
@customElement('ix-video')
export class IxVideo extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  videoRef = createRef<HTMLVideoElement>();

  /**
   * The source of the HLS video playlist
   */
  @property({type: String})
  videoSrc = '';

  override render() {
    return html`
      <div>
        <h1>videoSrc: ${this.videoSrc}</h1>
        <video src=${this.videoSrc} controls id="ix-video-player" ${ref(this.videoRef)} part="video">
        </video>
      </div>
    `;
  }

  override firstUpdated(): void {
    videojs(this.videoRef?.value as HTMLVideoElement, {}, () => {
      videojs.log('Your player is ready!');
      console.log(this);
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ix-video': IxVideo;
  }
}
