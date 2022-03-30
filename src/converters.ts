import {VideoJsPlayerOptions} from 'video.js';

/**
 * Validate dataSetup JSON string & convert it to a VideoJsPlayerOptions object.
 * @param value
 * @returns {VideoJsPlayerOptions}
 */
export const convertOptionsStringToObject = (
  optionsJsonString: string | null
): VideoJsPlayerOptions => {
  let options = {} as VideoJsPlayerOptions;
  if (!optionsJsonString) {
    return options;
  }
  if (typeof optionsJsonString === 'string') {
    // validate that it's a valid json string
    try {
      options = JSON.parse(optionsJsonString) as VideoJsPlayerOptions;
    } catch (e) {
      console.error('ix-video: invalid video.js dataSetup options json string');
      console.error('ix-video: ' + e);
    }
  }
  return options;
};
