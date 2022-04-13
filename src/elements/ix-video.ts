import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import videojs, {VideoJsPlayerOptions} from 'video.js';
import 'video.js/dist/video-js.css';
import {convertDataSetupStringToObject} from '~/converters';
import {
  buildAttributeMap,
  generateUid,
  spreadHostAttributesToElement,
} from '~/helpers';
import {DataSetup} from '~/types';

/**
 * ix-video is a custom element that can be used to display a video.
 * It wraps the video.js player in a LitElement.
 * @class IxVideo
 * @extends {LitElement}
 * @property {string} source - Required. The source URL of the video.
 * @property {string} controls - Whether or not the video should display controls. Defaults to false.
 * @property {string} dataSetup - A dataSetup JSON string used by video.js. Defaults to an empty string.
 * @property {string} height - The height of the video. Defaults to an empty string.
 * @property {string} type - The type of the video. Default: 'application/x-mpegURL'.
 * @property {string} width - The width of the video. Defaults to an empty string.
 */
@customElement('ix-video')
export class IxVideo extends LitElement {
  videoRef = createRef<HTMLVideoElement>();

  /**
   * Show/hide the video controls
   * @default true
   */
  @property({type: Boolean, attribute: 'controls'})
  controls = false;

  /**
   * Video player height
   */
  @property({type: String})
  height = '';

  /**
   * The source of the video
   */
  @property({type: String})
  source = '';

  /**
   * MIME type of the video
   * @default 'application/x-mpegURL'
   */
  @property({type: String})
  type = 'application/x-mpegURL';

  /**
   * Video player width
   */
  @property({type: String})
  width = '';

  /**
   * Video.js dataSetup options json string.
   * @see https://docs.videojs.com/tutorial-options.html
   */
  @property({
    type: String,
  })
  dataSetup = '{}';

  /**
   * Generate a unique ID for the video element.
   *
   * We need to do this to avoid collisions with other video elements, since
   * we've disabled the shadow dom.
   */
  @state()
  uid = generateUid();

  /**
   * Build the video.js player options object.
   * @returns {DataSetup} video.js player options object;
   */
  _buildOptions(): DataSetup {
    const {controls, height, source, type, width} = this;
    return {
      controls,
      height,
      sources: source ? [{src: source, type}] : [],
      width,
    } as DataSetup;
  }

  /**
   * Set all the attributes defined on the `<ix-video>` element and not on the
   * `<video>` element to the `<video>` element.
   *
   * We do this because we want to support all `<video>` attributes but
   * we don't want to override the custom element's attributes.
   *
   * @returns void;
   */
  _spreadHostAttributesToPlayer(player: HTMLVideoElement) {
    const attributeMap = buildAttributeMap(this);
    const excludeList = [
      'controls',
      'dataSetup',
      'height',
      'source',
      'style',
      'type',
      'width',
      'data-test-id',
    ];
    spreadHostAttributesToElement(attributeMap, player, excludeList);
  }

  override render() {
    return html`
      <video
        ${ref(this.videoRef)}
        class="video-js vjs-default-skin"
        id="ix-video-${this.uid}"
        part="video"
        data-setup=${this.dataSetup}
      ></video>
    `;
  }

  override connectedCallback() {
    super.connectedCallback();

    const dataSetup: DataSetup = convertDataSetupStringToObject(this.dataSetup);
    const componentWidth = this.width || dataSetup.width?.toString();

    if (componentWidth) {
      this.style.width = componentWidth; // update the host element width
      this.width = componentWidth; // update the video element width
    } else {
      /**
       * When the `width` and `height` properties are not set, we want to mimic
       * video.js' ability to take up 100% of the containing elements w/h.
       *
       * Because our player is contained inside a custom element, we need to
       * manually set the width of the host _and_ the video element to be 100%
       * of the containing element.
       *
       * Because videojs doesn't understand percentages, instead we approximate
       * 100% width value by setting the value to the element's offsetWidth.
       *
       * If the offsetWidth is 0, in other words there is no measurable
       * containing element height, we don't set a width value at all. This
       * allows VideoJS to fallback to rendering the video at its original size.
       */
      this.style.width = '100%'; // update the host element width
      const offsetWidth = this.offsetWidth.toString();
      this.width = offsetWidth === '0' ? '' : offsetWidth; // update video width
    }
  }

  override firstUpdated(): void {
    const player = this.videoRef?.value as HTMLVideoElement;
    this._spreadHostAttributesToPlayer(player);
    const options = this._buildOptions();
    // The options set here will override the dataSetup options.
    // Video.js will take care of merging the two for us.
    videojs(player, options as VideoJsPlayerOptions, () => {
      videojs.log('ix-video: player ready');
    });
  }

  protected override createRenderRoot() {
    /**
     * Remove the shadow root and renders the elements as children of the host.
     *
     * This is necessary because Video.js assumes access to the parent document.
     * Moreover, Video.js also uses custom `@fontface` rules, which are not
     * supported by Lit and more generally web-components. You can read more
     * about the `@fontface` issues here:
     * https://bugs.chromium.org/p/chromium/issues/detail?id=336876#c28
     */
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ix-video': IxVideo;
  }
}
