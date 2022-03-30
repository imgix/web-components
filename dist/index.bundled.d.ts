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
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "ix-video": IxVideo;
    }
}
export { IxVideo };
//# sourceMappingURL=index.bundled.d.ts.map