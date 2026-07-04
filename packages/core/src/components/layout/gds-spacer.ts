import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-spacer')
export class GdsSpacer extends GdsBaseElement {
  @property({ type: String }) size: string = 'md';
  @property({ type: String }) direction: string = 'both';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .spacer { display: block; }
    `,
  ];

  protected render() {
    const sizeMap: Record<string, string> = {
      '0': 'var(--gds-space-0)', 'sm': 'var(--gds-space-2)', 'md': 'var(--gds-space-4)',
      'lg': 'var(--gds-space-6)', 'xl': 'var(--gds-space-8)', '2xl': 'var(--gds-space-12)',
    };
    const s = sizeMap[this.size] || sizeMap['md'];
    const style =
      this.direction === 'horizontal' ? `width: ${s}; height: 0;` :
      this.direction === 'vertical' ? `height: ${s}; width: 0;` :
      `width: ${s}; height: ${s};`;
    return html`<div class="spacer" style="${style}"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-spacer': GdsSpacer; }
}