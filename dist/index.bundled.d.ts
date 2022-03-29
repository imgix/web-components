import { LitElement } from "lit";
/**
 * @csspart video - The video element
 */
declare class IxVideo extends LitElement {
    videoRef: import("lit-html/directives/ref").Ref<HTMLVideoElement>;
    /**
     * The source of the HLS video playlist
     */
    videoSrc: string;
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