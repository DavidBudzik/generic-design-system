import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { StatusVariant } from '../../utils/types.js';

@customElement('gds-banner')
export class GdsBanner extends GdsBaseElement {
  @property({ type: String }) variant: StatusVariant = 'info';
  @property({ type: Boolean }) dismissible = false;
  @property({ type: String }) icon = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .banner {
        display: flex; align-items: flex-start; gap: var(--gds-space-3);
        padding: var(--gds-space-4) var(--gds-space-5); border-radius: var(--gds-radius-md);
        border: 1px solid transparent; font-size: var(--gds-font-size-sm);
      }
      .banner.variant-info { background: rgba(14,165,233,0.08); border-color: rgba(14,165,233,0.25); color: var(--gds-color-info); }
      .banner.variant-success { background: rgba(22,163,74,0.08); border-color: rgba(22,163,74,0.25); color: var(--gds-color-success); }
      .banner.variant-warning { background: rgba(217,119,6,0.08); border-color: rgba(217,119,6,0.25); color: var(--gds-color-warning); }
      .banner.variant-danger { background: rgba(220,38,38,0.08); border-color: rgba(220,38,38,0.25); color: var(--gds-color-danger); }
      .content { flex: 1; color: var(--gds-color-text); }
      .content ::slotted(*) { color: var(--gds-color-text); }
      .close-btn {
        flex-shrink: 0; border: none; background: transparent; cursor: pointer;
        color: currentColor; opacity: 0.7; padding: 0; line-height: 0;
      }
      .close-btn:hover { opacity: 1; }
    `,
  ];

  protected render() {
    return html`
      <div class="banner variant-${this.variant}" role="alert">
        ${this.icon ? html`<span class="icon" .innerHTML=${this.icon}></span>` : nothing}
        <div class="content"><slot></slot></div>
        ${this.dismissible
          ? html`<button class="close-btn" @click=${this._dismiss} aria-label="Dismiss">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>`
          : nothing}
      </div>
    `;
  }

  private _dismiss() {
    dispatchEvent(this, 'dismiss', {});
    this.remove();
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-banner': GdsBanner; }
}