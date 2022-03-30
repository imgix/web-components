import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import {styleMap} from 'lit/directives/style-map.js';
import videojs, {VideoJsPlayerOptions} from 'video.js';
import 'video.js/dist/video-js.css';
import {convertOptionsStringToObject} from './converters';
import {buildOptionsObj} from './helpers';

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
  width = '';

  /**
   * Video player height
   */
  @property({type: String})
  height = '';

  /**
   * Show/hide the video controls
   * @default true
   */
  @property({type: Boolean, attribute: 'controls'})
  controls = false;

  /**
   * Video.js dataSetup options json string. Converts to a VideoJsPlayerOptions
   * object. If not set, defaults to {}. If invalid json, defaults to {}.
   * @see https://docs.videojs.com/tutorial-options.html
   */
  @property({
    type: String,
    converter: (value) => convertOptionsStringToObject(value),
  })
  dataSetup = {} as VideoJsPlayerOptions;

  override render() {
    // if no w/h attr set, we default to 100% of parent dimensions.
    const noWidthOrHeight = !this.width.length && !this.height.length;
    return html`
      <video
        ${ref(this.videoRef)}
        style=${noWidthOrHeight &&
        styleMap({
          width: '100%',
          height: '100%',
        })}
        class="video-js vjs-default-skin"
        id="ix-video-player"
        part="video"
      ></video>
    `;
  }

  override firstUpdated(): void {
    const player = this.videoRef?.value as HTMLVideoElement;
    const options = buildOptionsObj(this.dataSetup, {
      source: this.source,
      controls: this.controls,
      width: this.width,
      height: this.height,
    });
    videojs(player, options, () => {
      videojs.log('player ready');
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
