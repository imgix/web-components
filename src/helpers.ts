import {AttributeOptions, DataSetup} from './types';

/**
 * Set and or override the dataSetup options for the video.js player instance to
 * the given options. The options are usually the ix-video attribute values.
 * @returns {typeof VideoJsPlayerOptions}
 */
export const buildOptionsObj = (
  dataSetup: DataSetup, // eslint-disable-line @typescript-eslint/no-explicit-any
  options: AttributeOptions
): DataSetup => {
  const {source} = options;

  // Write options to dataSetup
  Object.keys(options).forEach((key) => {
    if (options[key].toString().length) {
      if (key === 'source') {
        return;
      }
      dataSetup[key] = options[key];
    }
  });
  // Assume source attribute is always an HLS source.
  if (options.source.length)
    dataSetup.sources = [
      {
        src: source,
        type: 'application/x-mpegURL',
      },
    ];

  return dataSetup;
};

/**
 * Create a style object that defaults to 100% width and height if:
 * 1. No width or height is set on the ix-video element
 * 2. The dataSetup attribute is not set
 * 3. The dataSetup attribute is set but has no width or height values
 * @param {DataSetup} dataSetup  - The dataSetup videojs options object
 * @param {string} width - The ix-video with attribute value
 * @param {string} height - The ix-video height attribute value
 * @returns A style object with width and height properties
 */
export const createStyleDefaults = (
  dataSetup: DataSetup,
  width: string,
  height: string
) => {
  // if no attribute width or height and no dataSetup width or height,
  // we default to 100% of parent dimensions.
  const noWidthOrHeight =
    !width.length &&
    !height.length &&
    !dataSetup.width.toString().length &&
    !dataSetup.height.toString().length;
  return {
    width: noWidthOrHeight ? '100%' : '',
    height: noWidthOrHeight ? '100%' : '',
  };
};
