import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Size } from '../../utils/types.js';

@customElement('gds-avatar-group')
export class GdsAvatarGroup extends GdsBaseElement {
  @property({ type: Number }) max = 5;
  @property({ type: String }) size: Size = 'md';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; }
      .group { display: inline-flex; }
      ::slotted(gds-avatar) { margin-left: -0.5rem; border: 2px solid var(--gds-color-bg); }
      ::slotted(gds-avatar:first-child) { margin-left: 0; }
      .overflow {
        display: inline-flex; align-items: center; justify-content: center;
        margin-left: -0.5rem; border: 2px solid var(--gds-color-bg);
        background: var(--gds-color-bg-muted); color: var(--gds-color-text-muted);
        border-radius: var(--gds-radius-full); font-size: var(--gds-font-size-xs);
        font-weight: var(--gds-font-weight-semibold);
      }
      .overflow.size-sm { width: 1.5rem; height: 1.5rem; }
      .overflow.size-md { width: 2.5rem; height: 2.5rem; font-size: var(--gds-font-size-sm); }
      .overflow.size-lg { width: 3.5rem; height: 3.5rem; font-size: var(--gds-font-size-md); }
      .overflow.size-xl { width: 5rem; height: 5rem; font-size: var(--gds-font-size-lg); }
    `,
  ];

  protected render() {
    const count = this.children.length;
    const overflow = count > this.max ? count - this.max : 0;
    return html`
      <div class="group">
        <slot></slot>
        ${overflow > 0
          ? html`<div class="overflow size-${this.size}">+${overflow}</div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-avatar-group': GdsAvatarGroup; }
}