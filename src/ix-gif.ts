import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 *
 * @fires ix-gif-clicked - Indicates that the gif has been clicked on
 * @csspart gif - The gif element
 */
@customElement('ix-gif')
export class IxGif extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  /**
   * The source of the GIF
   */
  @property({type: String})
  gifSrc = 'default';

  override render() {
    return html`
      <div>
        <h1>gifSrc: ${this.gifSrc}</h1>
        <img @click=${this._onClick} part="gif" />
      </div>
    `;
  }

  private _onClick() {
    this.dispatchEvent(new CustomEvent('ix-gif-clicked'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ix-gif': IxGif;
  }
}
