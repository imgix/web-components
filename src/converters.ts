import {DataSetup} from './types';
/**
 * Validate dataSetup JSON string & convert it to a DataSetup object.
 * @param value
 * @returns {DataSetup}
 */
export const convertDataSetupStringToObject = (
  input: string | object | undefined
): DataSetup => {
  if (!input) {
    return {} as DataSetup;
  }
  let options = {} as DataSetup;
  // if typeof input is an object, return it
  if (typeof input === 'object') {
    return input as DataSetup;
  }
  // otherwise, attempt to parse it as JSON
  try {
    options = JSON.parse(input) as DataSetup;
  } catch (e) {
    console.error('ix-video: invalid video.js dataSetup options json string');
    console.error('ix-video: ' + e);
  }
  return options;
};
