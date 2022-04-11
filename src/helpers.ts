import type {LitElement} from 'lit';

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
