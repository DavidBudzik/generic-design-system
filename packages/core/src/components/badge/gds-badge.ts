import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Size, StatusVariant } from '../../utils/types.js';

@customElement('gds-badge')
export class GdsBadge extends GdsBaseElement {
  @property({ type: String }) variant: StatusVariant = 'info';
  @property({ type: String }) size: Size = 'sm';
  @property({ type: Boolean }) dot = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; }
      .badge {
        display: inline-flex; align-items: center; gap: var(--gds-space-1);
        border-radius: var(--gds-radius-full); font-weight: var(--gds-font-weight-semibold);
        line-height: 1; white-space: nowrap;
      }
      .badge.size-sm { padding: 0.125rem var(--gds-space-2); font-size: var(--gds-font-size-xs); }
      .badge.size-md { padding: var(--gds-space-1) var(--gds-space-3); font-size: var(--gds-font-size-sm); }
      .badge.size-lg { padding: var(--gds-space-2) var(--gds-space-4); font-size: var(--gds-font-size-md); }
      .badge.size-xl { padding: var(--gds-space-3) var(--gds-space-5); font-size: var(--gds-font-size-lg); }
      .badge.variant-info { background: rgba(14,165,233,0.12); color: var(--gds-color-info); }
      .badge.variant-success { background: rgba(22,163,74,0.12); color: var(--gds-color-success); }
      .badge.variant-warning { background: rgba(217,119,6,0.12); color: var(--gds-color-warning); }
      .badge.variant-danger { background: rgba(220,38,38,0.12); color: var(--gds-color-danger); }
      .dot {
        display: inline-block; border-radius: var(--gds-radius-full);
        width: 0.4rem; height: 0.4rem; background: currentColor;
      }
    `,
  ];

  protected render() {
    return html`
      <span class="badge size-${this.size} variant-${this.variant}">
        ${this.dot ? html`<span class="dot"></span>` : nothing}
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-badge': GdsBadge; }
}