import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Size, Variant } from '../../utils/types.js';

@customElement('gds-link')
export class GdsLink extends GdsBaseElement {
  @property({ type: String }) href = '#';
  @property({ type: String }) target = '';
  @property({ type: String }) rel = '';
  @property({ type: String }) size: Size = 'md';
  @property({ type: String }) variant: Variant = 'primary';
  @property({ type: Boolean }) underline = true;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; }
      a {
        display: inline-flex;
        align-items: center;
        gap: var(--gds-space-1);
        text-decoration: none;
        transition: color var(--gds-duration-fast) var(--gds-ease-default);
        cursor: pointer;
      }
      a:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--gds-color-focus-ring);
        border-radius: var(--gds-radius-sm);
      }
      a.size-sm { font-size: var(--gds-font-size-xs); }
      a.size-md { font-size: var(--gds-font-size-sm); }
      a.size-lg { font-size: var(--gds-font-size-md); }
      a.size-xl { font-size: var(--gds-font-size-lg); }
      a.variant-primary { color: var(--gds-color-primary); }
      a.variant-primary:hover { color: var(--gds-color-primary-hover); }
      a.variant-secondary { color: var(--gds-color-secondary); }
      a.variant-secondary:hover { color: var(--gds-color-secondary-hover); }
      a.variant-ghost { color: var(--gds-color-text); }
      a.variant-ghost:hover { color: var(--gds-color-text-muted); }
      a.variant-danger { color: var(--gds-color-danger); }
      a.variant-outline { color: var(--gds-color-primary); border-bottom: 1px solid var(--gds-color-primary); }
      :host([underline]) a { text-decoration: underline; text-underline-offset: 0.15em; }
    `,
  ];

  protected render() {
    return html`
      <a
        href=${this.href}
        target=${this.target || nothing}
        rel=${this.rel || nothing}
        class="size-${this.size} variant-${this.variant}"
      >
        <slot></slot>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-link': GdsLink;
  }
}