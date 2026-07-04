import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-grid')
export class GdsGrid extends GdsBaseElement {
  @property({ type: String }) columns: string = '1';
  @property({ type: String }) rows: string = 'auto';
  @property({ type: String }) gap: string = 'md';
  @property({ type: String }) areas: string = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .grid { display: grid; width: 100%; }
    `,
  ];

  protected render() {
    const gapMap: Record<string, string> = {
      '0': 'var(--gds-space-0)', 'sm': 'var(--gds-space-2)', 'md': 'var(--gds-space-4)',
      'lg': 'var(--gds-space-6)', 'xl': 'var(--gds-space-8)',
    };
    const styleParts: string[] = [
      `gap: ${gapMap[this.gap] || gapMap['md']}`,
      `grid-template-columns: ${this.columns}`,
      `grid-template-rows: ${this.rows}`,
    ];
    if (this.areas) styleParts.push(`grid-template-areas: ${this.areas}`);
    return html`
      <div class="grid" style="${styleParts.join('; ')}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-grid': GdsGrid; }
}