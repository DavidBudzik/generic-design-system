import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { StatusVariant } from '../../utils/types.js';

@customElement('gds-statusdot')
export class GdsStatusdot extends GdsBaseElement {
  @property({ type: String }) variant: StatusVariant = 'success';
  @property({ type: String }) size: string = 'md';
  @property({ type: Boolean }) pulse = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; gap: var(--gds-space-2); }
      .dot { border-radius: var(--gds-radius-full); flex-shrink: 0; }
      .dot.size-sm { width: 0.5rem; height: 0.5rem; }
      .dot.size-md { width: 0.625rem; height: 0.625rem; }
      .dot.size-lg { width: 0.875rem; height: 0.875rem; }
      .dot.size-xl { width: 1.25rem; height: 1.25rem; }
      .dot.variant-info { background: var(--gds-color-info); }
      .dot.variant-success { background: var(--gds-color-success); }
      .dot.variant-warning { background: var(--gds-color-warning); }
      .dot.variant-danger { background: var(--gds-color-danger); }
      .dot.pulse { animation: gds-dot-pulse 1.5s ease-in-out infinite; }
      @keyframes gds-dot-pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 currentColor; } 50% { opacity: 0.7; box-shadow: 0 0 0 4px transparent; } }
      ::slotted(*) { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); }
    `,
  ];

  protected render() {
    return html`
      <span class="dot size-${this.size} variant-${this.variant} ${this.pulse ? 'pulse' : ''}"></span>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-statusdot': GdsStatusdot; }
}