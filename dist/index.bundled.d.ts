import { LitElement } from "lit";
/**
 * @csspart video - The video element
 */
declare class IxVideo extends LitElement {
    //  TODO: style video.js classes
    // static override styles = css``;
    videoRef: import("lit-html/directives/ref").Ref<HTMLVideoElement>;
    /**
     * The source of the HLS video playlist
     */
    source: string;
    /**
     * Video player width
     */
    width: string;
    /**
     * Video player height
     */
    height: string;
    /**
     * Show/hide the video controls
     * @default true
     */
    controls: boolean;
    /**
     * Video.js dataSetup options json string. Converts to a VideoJsPlayerOptions
     * object. If not set, defaults to {}. If invalid json, defaults to {}.
     * @see https://docs.videojs.com/tutorial-options.html
     */
    dataSetup: string;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    /**
     * This is a hack to disable Shadow DOM in lit-element. Removes the shadowRoot
     * and renders the elements as children of the host element.
     *
     * This also impedes our ability to use `css` and `cssPart` in lit-element.
     * Styling is instead done in the style tag.
     */
    protected createRenderRoot(): this;
}
declare global {
    interface HTMLElementTagNameMap {
        "ix-video": IxVideo;
    }
}
export { IxVideo };
//# sourceMappingURL=index.bundled.d.ts.map