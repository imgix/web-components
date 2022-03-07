import {assert, fixture} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {IxGif} from '../ix-gif.js';

suite('ix-gif', () => {
  test('should be defined', () => {
    const el = document.createElement('ix-gif');
    assert.instanceOf(el, IxGif);
  });

  test('should render with default values', async () => {
    const el = await fixture(html`<ix-gif></ix-gif>`);
    assert.shadowDom.equal(
      el,
      `
    `
    );
  });

  test('renders with a set gifSrc', async () => {
    const el = await fixture(html`<ix-gif gifSrc="Test"></ix-gif>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>gifSrc: Test</h1>
      <slot></slot>
    `
    );
  });

  test.skip('handles a click', async () => {});

  test.skip('styling applied', async () => {
    const el = (await fixture(html`<ix-gif></ix-gif>`)) as IxGif;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
