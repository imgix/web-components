import {VideoJsPlayerOptions} from 'video.js';

export interface DataSetup
  extends Omit<VideoJsPlayerOptions, 'width' | 'height'> {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  width: number | string;
  height: number | string;
}

export interface AttributeOptions {
  source: string;
  controls: boolean;
  width: string;
  height: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
