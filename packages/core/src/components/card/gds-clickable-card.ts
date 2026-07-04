import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsCard } from './gds-card.js';

@customElement('gds-clickable-card')
export class GdsClickableCard extends GdsCard {
  @property({ type: String }) href = '#';

  static styles = [
    ...GdsCard.styles,
    css`
      :host { display: block; cursor: pointer; }
      a {
        display: block; text-decoration: none; color: inherit; height: 100%;
      }
      .card { height: 100%; }
      .card:hover { box-shadow: var(--gds-shadow-lg); transform: translateY(-2px); }
    `,
  ];

  protected render() {
    const padMap: Record<string, string> = { sm: 'pad-sm', md: 'pad-md', lg: 'pad-lg', xl: 'pad-xl' };
    return html`
      <a href=${this.href}>
        <div class="card variant-${this.variant} ${padMap[this.padding] || 'pad-md'}">
          <div class="header"><slot name="header"></slot></div>
          <div class="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-clickable-card': GdsClickableCard; }
}