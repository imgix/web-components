import { LitElement } from "lit";
import { VideoJsPlayerOptions } from "video.js";
interface DataSetup extends Omit<VideoJsPlayerOptions, "width" | "height"> {
    width: number | string;
    height: number | string;
}
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
    videoRef: import("lit-html/directives/ref").Ref<HTMLVideoElement>;
    /**
     * Show/hide the video controls
     * @default true
     */
    controls: boolean;
    /**
     * Video player height
     */
    height: string;
    /**
     * The source of the video
     */
    source: string;
    /**
     * MIME type of the video
     * @default 'application/x-mpegURL'
     */
    type: string;
    /**
     * Video player width
     */
    width: string;
    /**
     * Video.js data-setup options json string. Users should not set them same
     * options on both on the element and in data-setup. If they do, data-setup
     * takes precedence.
     * @see https://docs.videojs.com/tutorial-options.html
     */
    dataSetup: string;
    /**
     * Generate a unique ID for the video element.
     *
     * We need to do this to avoid collisions with other video elements, since
     * we've disabled the shadow dom.
     */
    uid: string;
    options: DataSetup;
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
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    protected createRenderRoot(): this;
}
declare global {
    interface HTMLElementTagNameMap {
        "ix-video": IxVideo;
    }
}
export { IxVideo };
//# sourceMappingURL=index.bundled.d.ts.map