import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Orientation } from '../../utils/types.js';

@customElement('gds-divider')
export class GdsDivider extends GdsBaseElement {
  @property({ type: String }) orientation: Orientation = 'horizontal';
  @property({ type: String }) thickness: string = '1px';
  @property({ type: String }) color: string = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .divider { background: var(--gds-color-border); }
      .divider.horizontal { width: 100%; height: 1px; }
      .divider.vertical { height: 100%; width: 1px; min-height: 1em; }
    `,
  ];

  protected render() {
    const isH = this.orientation === 'horizontal';
    const color = this.color || 'var(--gds-color-border)';
    return html`
      <div
        class="divider ${isH ? 'horizontal' : 'vertical'}"
        style="${isH ? 'height' : 'width'}: ${this.thickness}; background: ${color};"
        role="separator"
        aria-orientation=${this.orientation}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-divider': GdsDivider; }
}