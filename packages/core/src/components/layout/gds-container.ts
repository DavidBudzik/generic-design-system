import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { MaxWidth } from '../../utils/types.js';

@customElement('gds-container')
export class GdsContainer extends GdsBaseElement {
  @property({ type: String }) maxWidth: MaxWidth = 'lg';
  @property({ type: String }) padding: string = 'md';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
    `,
  ];

  protected render() {
    const maxWMap: Record<string, string> = {
      sm: '40rem', md: '48rem', lg: '60rem', xl: '80rem', full: '100%',
    };
    const padMap: Record<string, string> = {
      '0': 'var(--gds-space-0)', 'sm': 'var(--gds-space-4)', 'md': 'var(--gds-space-6)',
      'lg': 'var(--gds-space-8)', 'xl': 'var(--gds-space-12)',
    };
    return html`
      <div class="container" style="
        max-width: ${maxWMap[this.maxWidth] || maxWMap['lg']};
        padding-left: ${padMap[this.padding] || padMap['md']};
        padding-right: ${padMap[this.padding] || padMap['md']};
      ">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-container': GdsContainer; }
}