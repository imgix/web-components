import type {LitElement} from 'lit';
import {DefaultVideoEventsMap} from './constants';

export const generateUid = function () {
  let ID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

/**
 * Build a Map of the Lit element's attributes and their values.
 * @param customElement - The customElement to read the attributes from.
 * @returns {Map} An Map containing all the attributes of the element.
 */
export const buildAttributeMap = function (customElement: LitElement) {
  const attributes = customElement.getAttributeNames();
  const map = new Map();
  return attributes.reduce((acc: Map<string, string>, attr) => {
    acc.set(attr, customElement.getAttribute(attr) || '');
    return acc;
  }, map);
};

/**
 * Set all the attributes defined on the Lit element but not on the target
 * element to the target element.
 * @param {Map<string, string>} attributeMap - Map containing all the attributes of an element.
 * @param {HTMLElement} targetElement - The HTML element to set the attributes on.
 * @param {Array} excludeList - A list of attributes to exclude from the spread.
 * @returns void;
 */
export const spreadHostAttributesToElement = function (
  attributeMap: Map<string, string>,
  targetElement: HTMLElement,
  excludeList?: string[]
) {
  attributeMap.forEach((value, key) => {
    if (!excludeList || !excludeList.includes(key)) {
      targetElement?.setAttribute(key, value);
    }
  });
};

/**
 * Depending on the type of event, create an object that stores the event and
 * the video node's relevant attributes for that event.
 *
 * This is used to create custom event details that can be dispatched to the
 * component's event listeners.
 *
 * @param eventName - The name of the event to listen for.
 * @param event - The Event object that was dispatched.
 * @param video - The video element that the event was dispatched on.
 * @returns An object containing the `event` object and information about the
 * video.
 */
export const createEventDetails = (
  eventName: keyof typeof DefaultVideoEventsMap,
  event: Event,
  video?: HTMLVideoElement
) => {
  switch (eventName.toLowerCase()) {
    case 'abort':
    case 'emptied':
    case 'loadstart':
    case 'seeking':
    case 'stalled':
    case 'suspend': {
      return {event};
    }
    case 'canplay':
    case 'canplaythrough':
    case 'durationchange':
    case 'loadeddata':
    case 'progress':
    case 'timeupdate':
    case 'waiting': {
      return {
        buffered: video?.buffered,
        currentTime: video?.currentTime,
        duration: video?.duration,
        event,
      };
    }
    case 'ended':
    case 'pause':
    case 'play':
    case 'playing':
    case 'seeked': {
      return {
        currentTime: video?.currentTime,
        duration: video?.duration,
        event,
      };
    }
    case 'error': {
      return {event, error: video?.error};
    }
    case 'loadedmetadata': {
      return {
        buffered: video?.buffered,
        currentTime: video?.currentTime,
        duration: video?.duration,
        width: video?.videoWidth,
        height: video?.videoHeight,
        event,
      };
    }
    case 'ratechange': {
      return {
        currentTime: video?.currentTime,
        duration: video?.duration,
        playbackRate: video?.playbackRate,
        event,
      };
    }
    case 'volumechange': {
      return {
        currentTime: video?.currentTime,
        duration: video?.duration,
        volume: video?.volume,
        muted: video?.muted,
        event,
      };
    }
    default:
      return {event};
  }
};
