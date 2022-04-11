import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import videojs, {VideoJsPlayerOptions} from 'video.js';
import 'video.js/dist/video-js.css';
import {convertDataSetupStringToObject} from '~/converters';
import {generateUid} from '~/helpers';
import {DataSetup} from '~/types';

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

  /**
   * Invoked when the element is added to the page, useful for setup work which
   * requires access to the DOM. However, the element has not done it's initial
   * render here yet.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document.
   *
   * @category lifecycle
   */
  override connectedCallback() {
    super.connectedCallback();

    const dataSetup: DataSetup = convertDataSetupStringToObject(this.dataSetup);
    const componentWidth = this.width || dataSetup.width?.toString();

    if (componentWidth) {
      // update the host to match the video player size
      this.style.width = componentWidth;
      // update the width attribute to match the video player size
      this.width = componentWidth;
    } else {
      /**
       * When the `width` and `height` properties are not set, we want to mimic
       * video.js' ability to take up 100% of the containing elements w/h.
       *
       * Because our player is contained inside a custom element, we need to
       * manually set the width of the host _and_ the video element to be 100%
       * of the containing element.
       */

      // update the host width to be 100% of the containing element
      this.style.width = '100%';
      /**
       * videojs doesn't understand percentages, instead we approximate the
       * 100% width by setting the value to the element's offsetWidth.
       */
      const offsetWidth = this.offsetWidth.toString();
      /**
       * If the offsetWidth is 0, in other words there is not measurable
       * containing element height, we don't set a width value at all. This
       * allows VideoJS to fallback to rendering the video at its original size.
       */
      this.width = offsetWidth === '0' ? '' : offsetWidth;
    }
  }

  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   * @example
   * firstUpdated() {
   *   this.renderRoot.getElementById('my-text-area').focus();
   * }
   */
  override firstUpdated(): void {
    const player = this.videoRef?.value as HTMLVideoElement;
    /**
     * The options set here will override any options set in the dataSetup
     * attribute.
     *
     * The `sources` array mimics the `<video>` tag's `<source>` tag. The first
     * source in the array will be the default source.
     */
    const options = {
      controls: this.controls,
      height: this.height,
      sources: [
        {
          src: this.source,
          type: this.type,
        },
      ],
      width: this.width,
    } as DataSetup;

    console.info('ix-video: options', options);

    videojs(player, options as VideoJsPlayerOptions, () => {
      videojs.log('ix-video: player ready');
    });
  }

  /**
   * The default implementation of createRenderRoot creates an open shadow root
   * and adds to it any styles set in the static styles class field.
   *
   * To customize a component's render root, we implement createRenderRoot and
   * return the node you want the template to render into.
   * @category rendering
   */
  protected override createRenderRoot() {
    /**
     * This removes the shadow root and renders the elements as children of the
     * host element.
     *
     * This in turn removes our ability to use `css` and `cssPart`
     * in Lit. Our element  will not have access to DOM or style scoping, and
     * it will not be able to compose elements into its internal DOM.
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
