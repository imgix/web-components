import {html, LitElement, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import videojs, {VideoJsPlayerOptions} from 'video.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - video-js.css is not typed
import vjsStyles from 'video.js/dist/video-js.css';
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
  // Will insert a style tag to the document head. If we had the shadow-dom
  // enabled, this would mean the styles would be scoped to this component.
  static override styles = vjsStyles;
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
    type: Object,
    attribute: 'data-setup',
    converter: (value: string | null) =>
      convertDataSetupStringToObject(value ?? ''),
  })
  dataSetup = {};

  @property({type: Boolean})
  fixed = false;

  @property({type: String})
  poster: string | undefined = undefined;

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
      'poster',
    ];
    spreadHostAttributesToElement(attributeMap, player, excludeList);
  }

  private _addEventListener = (
    type: keyof typeof DefaultVideoEventsMap,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) => {
    this.videoRef?.value?.addEventListener(type, listener, options);
  };

  private _removeEventListener = (
    type: keyof typeof DefaultVideoEventsMap,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) => {
    this.videoRef?.value?.removeEventListener(type, listener, options);
  };

  /**
   * Add an event listener for every `<video>` event to `<ix-video>` and
   * dispatch a custom event with the same name. This allows us to emulate the
   * native `<video>` events on the custom element.
   * @returns {void} void;
   * @private
   * @memberof IxVideo
   */
  private _bubbleUpEventListeners = () => {
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
  };

  /**
   * Remove every `<video>` event listener from to `<ix-video>` and dispatch a
   * custom event with the same name. This should be invoked during cleanup,
   * when the video player is removed from the DOM.
   * @returns {void} void;
   * @private
   * @memberof IxVideo
   */
  private _removeEventListeners = () => {
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
  };

  /**
   * Get the updated video player's options and merge them with the data-setup
   * options.
   *
   * Merging the data-setup options with the element options allows users to
   * set VJS-specific options on the element. We assume users will not set the
   * same option twice, and explain as much in the docs.
   *
   * @see https://docs.videojs.com/tutorial-options.html
   * @returns {void} void;
   * @private
   * @memberof IxVideo
   */
  private _getOptions = () => {
    return {
      width: this.width ?? '',
      height: this.height ?? '',
      controls: this.controls,
      sources: this.source ? [{src: this.source, type: this.type}] : [],
      fluid: !this.fixed,
      ...this.dataSetup,
    };
  };

  /**
   * Update the host style properties to match the style object.
   * @param {CSSStyleDeclaration} styles - CSSStyleDeclaration style object
   * @returns {void} void;
   */
  private _setStyles = (styles: CSSStyleDeclaration) => {
    for (const key in styles) {
      if (styles.hasOwnProperty(key)) {
        const value = styles[key];
        this.style.setProperty(key, value);
      }
    }
  };

  private _getPoster = () => {
    const width = this.width || this.videoRef.value?.offsetWidth || '';
    const height = this.height || this.videoRef.value?.offsetHeight || '';
    if (this.poster?.includes('://')) {
      return `${this.poster}?w=${width}&h=${height}`;
    }
    return null;
  };

  /**
   * ------------------------------------------------------------------------
   * Render Lifecycle Methods
   * ------------------------------------------------------------------------
   */
  override render() {
    return html`
      <style>
        .vjs-poster {
          background-size: cover;
        }
      </style>
      <video
        ${ref(this.videoRef)}
        class="video-js vjs-default-skin vjs-big-play-centered ${this
          .className}"
        id="ix-video-${this.uid}"
        part="video"
      ></video>
    `;
  }

  override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    const {controls, height, width, fluid} = this._getOptions();
    let stylesChanged = false;

    // For each changed property, update the the vjsPlayer attribute value
    changed.forEach((_, propName) => {
      if (propName === 'source') {
        this.vjsPlayer?.src(
          this.source ? [{src: this.source, type: this.type}] : []
        );
      }
      if (propName === 'controls') {
        this.vjsPlayer?.controls(!!controls);
      }
      if (propName === 'height' && height) {
        this.vjsPlayer?.height(Number(height));
        stylesChanged = true;
      }
      if (propName === 'width' && width) {
        this.vjsPlayer?.width(Number(width));
        stylesChanged = true;
      }
      if (propName === 'fixed') {
        this.vjsPlayer?.fluid(!!fluid);
        stylesChanged = true;
      }
      if (propName === 'poster') {
        // Update the player poster to match the video element dimensions
        const poster = this._getPoster();
        poster && this.vjsPlayer?.poster(poster);
      }
    });

    // If width/heigh/fixed props change, update ix-video's style properties.
    if (stylesChanged) {
      const newStyles = {
        width: width ? width + 'px' : '100%',
        height: height ? height + 'px' : '100%',
        // Need to set a display value otherwise w/h styles are not applied
        display: 'block',
      } as CSSStyleDeclaration;
      this._setStyles(newStyles);
    }
  }

  override firstUpdated(): void {
    const player = this.videoRef?.value as HTMLVideoElement;
    const options = this._getOptions() as DataSetup;

    this._spreadHostAttributesToPlayer(player);
    this._bubbleUpEventListeners();

    // Initialize the videojs player, which will modify the DOM to add the
    // video player and its controls.
    const vjsPlayer = videojs(player, options as VideoJsPlayerOptions, () => {
      console.log('ix-video: player ready');
      // Prevent VJS error logging in console
      videojs.log.level('off');
      // Update the player poster to match the video element dimensions
      const poster = this._getPoster();
      poster && vjsPlayer.poster(poster);
    });
    // store a reference to the videojs player in state
    this.vjsPlayer = vjsPlayer;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    // Remove the VJS markup when the element is removed from the DOM.
    const player = videojs.getPlayer(`ix-video-${this.uid}`);
    player?.dispose();

    // Remove DefaultVideoEventsMap event listeners
    this._removeEventListeners();
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
