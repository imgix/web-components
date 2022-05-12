/// <reference types="video.js" />
import { LitElement, PropertyValues } from "lit";
import videojs from "video.js";
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
declare class IxVideo extends LitElement {
    // Will insert a style tag to the document head. If we had the shadow-dom
    // enabled, this would mean the styles would be scoped to this component.
    static styles: any;
    /**
     * ------------------------------------------------------------------------
     * Instance Variables
     * ------------------------------------------------------------------------
     */
    /**
     * HTMLVideoElement reference.
     * @default Ref<HTMLVideoElement>
     */
    videoRef: import("lit-html/directives/ref").Ref<HTMLVideoElement>;
    /**
     * ------------------------------------------------------------------------
     * Component Properties
     * ------------------------------------------------------------------------
     */
    /**
     * Show/hide the video controls
     * @default true
     */
    controls: boolean;
    /**
     * Video player height
     */
    height: string | undefined;
    /**
     * The source of the video
     */
    source: string | undefined;
    /**
     * MIME type of the video
     */
    type: string;
    /**
     * Video player width
     */
    width: string | undefined;
    /**
     * Video.js data-setup options json string. Users should not set them same
     * options on both on the element and in data-setup. If they do, data-setup
     * takes precedence.
     * @see https://docs.videojs.com/tutorial-options.html
     */
    dataSetup: {};
    fixed: boolean;
    poster: string | undefined;
    /**
     * ------------------------------------------------------------------------
     * Component State
     * ------------------------------------------------------------------------
     */
    /**
     * Generate a unique ID for the video element.
     *
     * We need to do this to avoid collisions with other video elements, since
     * we've disabled the shadow dom. This ID is also used to dispose of the
     * video player when the element is removed from the DOM.
     */
    uid: string;
    vjsPlayer: videojs.Player | undefined;
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
    _spreadHostAttributesToPlayer(player: HTMLVideoElement): void;
    private _addEventListener;
    private _removeEventListener;
    /**
     * Add an event listener for every `<video>` event to `<ix-video>` and
     * dispatch a custom event with the same name. This allows us to emulate the
     * native `<video>` events on the custom element.
     * @returns {void} void;
     * @private
     * @memberof IxVideo
     */
    private _bubbleUpEventListeners;
    /**
     * Remove every `<video>` event listener from to `<ix-video>` and dispatch a
     * custom event with the same name. This should be invoked during cleanup,
     * when the video player is removed from the DOM.
     * @returns {void} void;
     * @private
     * @memberof IxVideo
     */
    private _removeEventListeners;
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
    private _getOptions;
    /**
     * Update the host style properties to match the style object.
     * @param {CSSStyleDeclaration} styles - CSSStyleDeclaration style object
     * @returns {void} void;
     */
    private _setStyles;
    private _getPoster;
    /**
     * ------------------------------------------------------------------------
     * Render Lifecycle Methods
     * ------------------------------------------------------------------------
     */
    render(): import("lit-html").TemplateResult<1>;
    updated(changed: PropertyValues<this>): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    protected createRenderRoot(): this;
}
declare global {
    interface HTMLElementTagNameMap {
        "ix-video": IxVideo;
    }
}
export { IxVideo };
//# sourceMappingURL=index.bundled.d.ts.map