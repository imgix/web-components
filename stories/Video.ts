import {html} from 'lit-html';
import '../src';

export interface VideoProps {
  videoSrc?: string;
  onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export const Video = ({videoSrc, onClick}: VideoProps) => {
  return html` <ix-video @click=${onClick} videoSrc=${videoSrc}></ix-video> `;
};
