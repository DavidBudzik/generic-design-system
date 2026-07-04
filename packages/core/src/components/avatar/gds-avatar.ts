import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Size } from '../../utils/types.js';

@customElement('gds-avatar')
export class GdsAvatar extends GdsBaseElement {
  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) size: Size = 'md';
  @property({ type: String }) fallback = '';
  @property({ type: String }) shape: 'circle' | 'square' = 'circle';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; }
      .avatar {
        display: inline-flex; align-items: center; justify-content: center;
        overflow: hidden; background: var(--gds-color-bg-muted);
        color: var(--gds-color-text-muted); font-weight: var(--gds-font-weight-semibold);
        border: 1px solid var(--gds-color-border);
      }
      .avatar.circle { border-radius: var(--gds-radius-full); }
      .avatar.square { border-radius: var(--gds-radius-md); }
      .avatar.size-sm { width: 1.5rem; height: 1.5rem; font-size: var(--gds-font-size-xs); }
      .avatar.size-md { width: 2.5rem; height: 2.5rem; font-size: var(--gds-font-size-sm); }
      .avatar.size-lg { width: 3.5rem; height: 3.5rem; font-size: var(--gds-font-size-md); }
      .avatar.size-xl { width: 5rem; height: 5rem; font-size: var(--gds-font-size-lg); }
      img { width: 100%; height: 100%; object-fit: cover; }
    `,
  ];

  protected render() {
    return html`
      <div class="avatar ${this.shape} size-${this.size}" title=${this.alt}>
        ${this.src
          ? html`<img src=${this.src} alt=${this.alt} />`
          : this.fallback
            ? html`<span>${this.fallback}</span>`
            : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-avatar': GdsAvatar; }
}