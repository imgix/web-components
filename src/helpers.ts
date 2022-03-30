import {VideoJsPlayerOptions} from 'video.js';

/**
 * Set the attributes of the video element as the values of the
 * VideoJsPlayerOptions object if they are not already set and the attribute is
 * not null.
 * @returns {typeof VideoJsPlayerOptions}
 */
export const buildOptionsObj = (
  dataSetup: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  options: {
    source: string;
    controls: boolean;
    width: string;
    height: string;
  }
): VideoJsPlayerOptions => {
  const {source, controls, width, height} = options;

  if (!dataSetup.sources?.length && source.length) {
    dataSetup.sources = [
      {
        src: source,
        type: 'application/x-mpegURL',
      },
    ];
  }
  if (!dataSetup.controls && controls) {
    dataSetup.controls = controls;
  }
  if (!dataSetup.width && width.length) {
    dataSetup.width = width;
  }
  if (!dataSetup.height && height.length) {
    dataSetup.height = height;
  }

  return dataSetup as VideoJsPlayerOptions;
};
