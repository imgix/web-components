import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import videojs, {VideoJsPlayerOptions} from 'video.js';
import 'video.js/dist/video-js.css';
import {DefaultVideoEventsMap} from '~/constants';
import {convertDataSetupStringToObject} from '~/converters';
import {
  buildAttributeMap,
  createEventDetails,
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
  /**
   * ------------------------------------------------------------------------
   * Instance Variables
   * ------------------------------------------------------------------------
   */

  /**
   * HTMLVideoElement reference.
   * @default Ref<HTMLVideoElement>
   */
  videoRef = createRef<HTMLVideoElement>();

  /**
   * ------------------------------------------------------------------------
   * Component Properties
   * ------------------------------------------------------------------------
   */

  /**
   * Show/hide the video controls
   * @default true
   */
  @property({type: Boolean, attribute: 'controls', reflect: true})
  controls = false;

  /**
   * Video player height
   */
  @property({reflect: true, attribute: 'height'})
  height: string | undefined = undefined;

  /**
   * The source of the video
   */
  @property({reflect: true})
  source: string | undefined = undefined;

  /**
   * MIME type of the video
   */
  @property({reflect: true})
  type = 'application/x-mpegURL';

  /**
   * Video player width
   */
  @property({reflect: true})
  width: string | undefined = undefined;

  /**
   * Video.js data-setup options json string. Users should not set them same
   * options on both on the element and in data-setup. If they do, data-setup
   * takes precedence.
   * @see https://docs.videojs.com/tutorial-options.html
   */
  @property({
    attribute: 'data-setup',
    converter: (value: string | null) =>
      convertDataSetupStringToObject(value ?? ''),
  })
  dataSetup: DataSetup = {};

  @property({type: Boolean})
  fixed = false;

  /**
   * ------------------------------------------------------------------------
   * Component State
   * ------------------------------------------------------------------------
   */
  @state()
  /**
   * Generate a unique ID for the video element.
   *
   * We need to do this to avoid collisions with other video elements, since
   * we've disabled the shadow dom. This ID is also used to dispose of the
   * video player when the element is removed from the DOM.
   */
  uid = generateUid();
  /**
   * Store videojs options object in a state property.
   *
   * This allows us to read the component's properties, format them in a way
   * that video.js can read, and, if needed, merge them with the data-setup
   * options. Storing this in state keeps the component properties from being
   * overwritten.
   */
  options = {
    width: this.width ?? 'auto',
    height: this.height ?? 'auto',
    controls: this.controls,
    sources: this.source ? [{src: this.source, type: this.type}] : [],
    fluid: !this.fixed,
  } as DataSetup;
  vjsPlayer: videojs.Player | undefined = undefined;

  /**
   * ------------------------------------------------------------------------
   * Instance Methods
   * ------------------------------------------------------------------------
   */

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
      'class',
    ];
    spreadHostAttributesToElement(attributeMap, player, excludeList);
  }

  private _addEventListener = (
    type: keyof typeof DefaultVideoEventsMap,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) => {
    const event = DefaultVideoEventsMap[type];
    this.videoRef?.value?.addEventListener(event, listener, options);
  };

  private _removeEventListener = (
    type: keyof typeof DefaultVideoEventsMap,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) => {
    const event = DefaultVideoEventsMap[type];
    this.videoRef?.value?.removeEventListener(event, listener, options);
  };

  /**
   * ------------------------------------------------------------------------
   * Render Lifecycle Methods
   * ------------------------------------------------------------------------
   */
  override render() {
    return html`
      <video
        ${ref(this.videoRef)}
        class="video-js vjs-default-skin ${this.className}"
        id="ix-video-${this.uid}"
        part="video"
      ></video>
    `;
  }

  override firstUpdated(): void {
    const dataSetup = convertDataSetupStringToObject(this.dataSetup);
    const options = {
      width: this.width ?? '',
      height: this.height ?? '',
      controls: this.controls,
      sources: this.source ? [{src: this.source, type: this.type}] : [],
      fluid: !this.fixed,
    };
    /**
     * Merging the data-setup options with the element options allows users to
     * set VJS-specific options on the element. We assume users will not set the
     * same option twice, and explain as much in the docs.
     */
    this.options = {...options, ...dataSetup};
    const player = this.videoRef?.value as HTMLVideoElement;

    this._spreadHostAttributesToPlayer(player);

    // add built-in <video> event listeners to ix-video so we can dispatch
    // custom events to the custom element
    Object.keys(DefaultVideoEventsMap).forEach((_type) => {
      const type = _type as keyof typeof DefaultVideoEventsMap;
      this._addEventListener(type, (event: Event) => {
        this.dispatchEvent(
          new CustomEvent(DefaultVideoEventsMap[type], {
            detail: createEventDetails(type, event, this.videoRef?.value),
          })
        );
      });
    });

    if (!this.options.width) {
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
       * containing element height, we set the width value to 'auto'. This
       * allows VideoJS to fallback to rendering the video at its original size.
       */
      this.style.width = '100%'; // update the host element width
      this.options.width = this.offsetWidth || 'auto'; // update the video element width
    } else {
      /**
       * When the `width` and `height` properties are set, we want change the
       * host elements dimensions to match.
       */
      this.style.width = this.options.width + 'px';
      if (this.options.height) {
        this.style.height = this.options.height + 'px';
      }
    }

    // Need to set a display value otherwise w/h styles are not applied
    this.style.display = 'block';

    // Initialize the videojs player, which will modify the DOM to add the
    // video player and its controls.
    const vjsPLayer = videojs(
      player,
      this.options as VideoJsPlayerOptions,
      () => {
        console.log('ix-video: player ready');
        // Prevent VJS error logging in console
        videojs.log.level('off');
      }
    );
    // store a reference to the videojs player in state
    this.vjsPlayer = vjsPLayer;
  }

  override disconnectedCallback(): void {
    // Remove the VJS markup when the element is removed from the DOM.
    super.disconnectedCallback();
    const player = videojs.getPlayer(`ix-video-${this.uid}`);
    player?.dispose();

    // Remove DefaultVideoEventsMap event listeners
    Object.keys(DefaultVideoEventsMap).forEach((_type) => {
      const type = _type as keyof typeof DefaultVideoEventsMap;
      this._removeEventListener(type, (event: Event) => {
        this.dispatchEvent(
          new CustomEvent(DefaultVideoEventsMap[type], {
            detail: createEventDetails(type, event, this.videoRef?.value),
          })
        );
      });
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
