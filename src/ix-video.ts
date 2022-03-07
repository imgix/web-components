import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

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

  /**
   * The source of the HLS video playlist
   */
  @property({type: String})
  videoSrc = '';

  override render() {
    return html`
      <div>
        <h1>videoSrc: ${this.videoSrc}</h1>
        <video controls @click=${this._onClick} part="video">
          <!-- <source src="${this
            .videoSrc}" type="application/x-mpegURL" /> -->
          <source src="${this.videoSrc}" type="video/mp4" />
        </video>
      </div>
    `;
  }

  private _onClick() {
    this.dispatchEvent(new CustomEvent('ix-video-clicked'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ix-video': IxVideo;
  }
}
