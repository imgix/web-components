// Status codes
export const STATUS_CODE_QUERY_ERROR = 400;
export const STATUS_CODE_NOT_FOUND = 404;
export const STATUS_CODE_REDIRECT_OK = 302;

// Supported Parameters
export const VIDEO_PARAMETERS = {
  fm: 'hls',
};

/*
 * src: URL of the .video file to be rendered. Can be passed a relative path, in accompaniment with the `domain` prop, or an absolute URL.
 * domain: If the src URL is relative, it will be appended to the domain.
 * dataSetup: video.js modifiers, which will be passed on to video.js.
 */
export interface VideoProps {
  src: string;
  domain?: string;
  dataSetup?: string;
}
