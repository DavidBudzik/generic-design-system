import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-spinner')
export class GdsSpinner extends GdsBaseElement {
  @property({ type: String }) size: string = 'md';
  @property({ type: String }) color = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; justify-content: center; }
      svg { animation: gds-spin 0.8s linear infinite; }
      @keyframes gds-spin { to { transform: rotate(360deg); } }
    `,
  ];

  protected render() {
    const sizeMap: Record<string, number> = { sm: 16, md: 24, lg: 32, xl: 48 };
    const s = sizeMap[this.size] || 24;
    const stroke = this.color || 'var(--gds-color-primary)';
    return html`
      <svg width=${s} height=${s} viewBox="0 0 24 24" fill="none" style="color: ${stroke};">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none" />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-spinner': GdsSpinner; }
}