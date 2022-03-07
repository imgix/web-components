import {assert, fixture} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {IxVideo} from '../ix-video.js';

suite('ix-video', () => {
  test('should be defined', () => {
    const el = document.createElement('ix-video');
    assert.instanceOf(el, IxVideo);
  });

  test('should render with default values', async () => {
    const el = await fixture(html`<ix-video></ix-video>`);
    assert.shadowDom.equal(
      el,
      `
    `
    );
  });

  test('renders with a set videoSrc', async () => {
    const el = await fixture(html`<ix-video videoSrc="Test"></ix-video>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>videoSrc: Test</h1>
      <slot></slot>
    `
    );
  });

  test.skip('handles a click', async () => {});

  test.skip('styling applied', async () => {
    const el = (await fixture(html`<ix-video></ix-video>`)) as IxVideo;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
