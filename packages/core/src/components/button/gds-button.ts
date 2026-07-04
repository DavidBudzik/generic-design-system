import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Size, Variant } from '../../utils/types.js';

@customElement('gds-button')
export class GdsButton extends GdsBaseElement {
  @property({ type: String }) label = '';
  @property({ type: String }) variant: Variant = 'primary';
  @property({ type: String }) size: Size = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) icon = '';
  @property({ type: String }) iconPosition: 'left' | 'right' = 'left';
  @property({ type: Boolean }) fullWidth = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host {
        display: inline-flex;
        width: var(--gds-btn-width, auto);
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--gds-space-2);
        width: 100%;
        border: 1px solid transparent;
        border-radius: var(--gds-radius-md);
        font-family: var(--gds-font-sans);
        font-weight: var(--gds-font-weight-semibold);
        cursor: pointer;
        transition:
          background-color var(--gds-duration-fast) var(--gds-ease-default),
          border-color var(--gds-duration-fast) var(--gds-ease-default),
          box-shadow var(--gds-duration-fast) var(--gds-ease-default);
        white-space: nowrap;
        user-select: none;
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--gds-color-focus-ring);
      }
      .icon { display: inline-flex; flex-shrink: 0; }

      /* Sizes */
      button.size-sm { padding: var(--gds-space-1) var(--gds-space-3); font-size: var(--gds-font-size-xs); }
      button.size-md { padding: var(--gds-space-2) var(--gds-space-4); font-size: var(--gds-font-size-sm); }
      button.size-lg { padding: var(--gds-space-3) var(--gds-space-5); font-size: var(--gds-font-size-md); }
      button.size-xl { padding: var(--gds-space-4) var(--gds-space-6); font-size: var(--gds-font-size-lg); }

      /* Variants */
      button.variant-primary {
        background-color: var(--gds-color-primary);
        color: var(--gds-color-on-primary);
      }
      button.variant-primary:not(:disabled):hover { background-color: var(--gds-color-primary-hover); }
      button.variant-primary:not(:disabled):active { background-color: var(--gds-color-primary-active); }

      button.variant-secondary {
        background-color: var(--gds-color-surface);
        color: var(--gds-color-text);
        border-color: var(--gds-color-border-strong);
      }
      button.variant-secondary:not(:disabled):hover { background-color: var(--gds-color-surface-hover); }

      button.variant-ghost {
        background-color: transparent;
        color: var(--gds-color-text);
      }
      button.variant-ghost:not(:disabled):hover { background-color: var(--gds-color-bg-muted); }

      button.variant-danger {
        background-color: var(--gds-color-danger);
        color: var(--gds-color-text-inverse);
      }
      button.variant-danger:not(:disabled):hover { filter: brightness(0.9); }

      button.variant-outline {
        background-color: transparent;
        color: var(--gds-color-primary);
        border-color: var(--gds-color-primary);
      }
      button.variant-outline:not(:disabled):hover { background-color: var(--gds-color-primary); color: var(--gds-color-on-primary); }

      :host([full-width]) { display: flex; width: 100%; }

      .spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: var(--gds-radius-full);
        animation: spin 0.6s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `,
  ];

  protected render() {
    const iconHtml = this.icon ? html`<span class="icon" .innerHTML=${this.icon}></span>` : nothing;
    const spinner = this.loading ? html`<span class="spinner"></span>` : nothing;

    return html`
      <button
        class="variant-${this.variant} size-${this.size}"
        ?disabled=${this.disabled || this.loading}
        aria-label=${this.label || nothing}
        aria-busy=${this.loading}
      >
        ${spinner}
        ${this.iconPosition === 'left' ? iconHtml : nothing}
        ${this.label ? html`<span class="label">${this.label}</span>` : html`<slot></slot>`}
        ${this.iconPosition === 'right' ? iconHtml : nothing}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-button': GdsButton;
  }
}