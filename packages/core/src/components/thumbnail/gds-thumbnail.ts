import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Size } from '../../utils/types.js';

@customElement('gds-thumbnail')
export class GdsThumbnail extends GdsBaseElement {
  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) ratio: string = '1/1';
  @property({ type: String }) size: Size = 'md';
  @property({ type: Boolean }) rounded = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-block; }
      .thumb {
        display: block; overflow: hidden; background: var(--gds-color-bg-muted);
        border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-md);
        position: relative;
      }
      .thumb.rounded { border-radius: var(--gds-radius-full); }
      .thumb.size-sm { width: 2rem; } .thumb.size-md { width: 3rem; }
      .thumb.size-lg { width: 5rem; } .thumb.size-xl { width: 8rem; }
      img { width: 100%; height: 100%; object-fit: cover; display: block; }
    `,
  ];

  protected render() {
    const [w, h] = this.ratio.split('/').map((n) => parseFloat(n.trim()));
    const pct = h && w ? (h / w) * 100 : 100;
    return html`
      <div class="thumb size-${this.size} ${this.rounded ? 'rounded' : ''}" style="padding-top: ${pct}%;">
        ${this.src ? html`<img src=${this.src} alt=${this.alt} style="position:absolute;top:0;left:0;" />` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-thumbnail': GdsThumbnail; }
}