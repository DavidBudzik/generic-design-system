import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-card')
export class GdsCard extends GdsBaseElement {
  @property({ type: String }) variant: 'default' | 'outlined' | 'elevated' = 'default';
  @property({ type: String }) padding: string = 'md';
  @property({ type: Boolean }) interactive = false;
  @property({ type: String }) href = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .card {
        display: block; background: var(--gds-color-surface);
        border-radius: var(--gds-radius-lg); overflow: hidden;
        transition: box-shadow var(--gds-duration-fast) var(--gds-ease-default), transform var(--gds-duration-fast) var(--gds-ease-default);
      }
      .card.variant-default { border: 1px solid var(--gds-color-border); }
      .card.variant-outlined { border: 2px solid var(--gds-color-border-strong); }
      .card.variant-elevated { box-shadow: var(--gds-shadow-md); }
      :host([interactive]) .card:hover { box-shadow: var(--gds-shadow-lg); transform: translateY(-2px); cursor: pointer; }
      :host([interactive]) .card:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .pad-sm { padding: var(--gds-space-4); } .pad-md { padding: var(--gds-space-6); }
      .pad-lg { padding: var(--gds-space-8); } .pad-xl { padding: var(--gds-space-12); }
      .header { border-bottom: 1px solid var(--gds-color-border); padding: var(--gds-space-4) var(--gds-space-6); }
      .body { padding: var(--gds-space-6); }
      .footer { border-top: 1px solid var(--gds-color-border); padding: var(--gds-space-4) var(--gds-space-6); }
      .header:empty, .footer:empty { display: none; }
    `,
  ];

  protected render() {
    const padMap: Record<string, string> = { sm: 'pad-sm', md: 'pad-md', lg: 'pad-lg', xl: 'pad-xl' };
    return html`
      <div class="card variant-${this.variant} ${padMap[this.padding] || 'pad-md'}" tabindex=${this.interactive ? '0' : ''} role=${this.interactive ? 'button' : ''}>
        <div class="header"><slot name="header"></slot></div>
        <div class="body"><slot></slot></div>
        <div class="footer"><slot name="footer"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-card': GdsCard; }
}