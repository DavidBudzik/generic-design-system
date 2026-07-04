import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Size, Variant } from '../../utils/types.js';

@customElement('gds-icon-button')
export class GdsIconButton extends GdsBaseElement {
  @property({ type: String }) icon = '';
  @property({ type: String }) label = '';
  @property({ type: String }) size: Size = 'md';
  @property({ type: String }) variant: Variant = 'ghost';
  @property({ type: Boolean }) disabled = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: var(--gds-radius-md);
        cursor: pointer;
        transition:
          background-color var(--gds-duration-fast) var(--gds-ease-default),
          border-color var(--gds-duration-fast) var(--gds-ease-default);
      }
      button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--gds-color-focus-ring);
      }
      button:disabled { opacity: 0.5; cursor: not-allowed; }
      button.size-sm { width: 1.75rem; height: 1.75rem; }
      button.size-md { width: 2.25rem; height: 2.25rem; }
      button.size-lg { width: 2.75rem; height: 2.75rem; }
      button.size-xl { width: 3.25rem; height: 3.25rem; }
      button.variant-primary { background: var(--gds-color-primary); color: var(--gds-color-on-primary); }
      button.variant-secondary { background: var(--gds-color-surface); color: var(--gds-color-text); border-color: var(--gds-color-border-strong); }
      button.variant-ghost { background: transparent; color: var(--gds-color-text); }
      button.variant-ghost:not(:disabled):hover { background: var(--gds-color-bg-muted); }
      button.variant-danger { background: var(--gds-color-danger); color: var(--gds-color-text-inverse); }
      button.variant-outline { background: transparent; color: var(--gds-color-primary); border-color: var(--gds-color-primary); }
    `,
  ];

  protected render() {
    return html`
      <button
        class="size-${this.size} variant-${this.variant}"
        ?disabled=${this.disabled}
        aria-label=${this.label}
        title=${this.label}
      >
        ${this.icon ? html`<span .innerHTML=${this.icon}></span>` : html`<slot></slot>`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-icon-button': GdsIconButton;
  }
}