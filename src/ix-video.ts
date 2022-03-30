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
