import {VideoJsPlayerOptions} from 'video.js';

export interface DataSetup
  extends Omit<VideoJsPlayerOptions, 'width' | 'height'> {
  width?: number | string;
  height?: number | string;
  fixed?: boolean;
}
