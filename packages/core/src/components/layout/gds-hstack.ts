import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Alignment, JustifyContent } from '../../utils/types.js';

@customElement('gds-hstack')
export class GdsHStack extends GdsBaseElement {
  @property({ type: String }) gap: string = 'md';
  @property({ type: String }) align: Alignment = 'center';
  @property({ type: String }) justify: JustifyContent = 'start';
  @property({ type: Boolean }) wrap = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: flex; flex-direction: row; }
      .hstack { display: flex; flex-direction: row; }
    `,
  ];

  protected render() {
    const gapMap: Record<string, string> = {
      '0': 'var(--gds-space-0)', 'sm': 'var(--gds-space-2)', 'md': 'var(--gds-space-4)',
      'lg': 'var(--gds-space-6)', 'xl': 'var(--gds-space-8)',
    };
    const justifyMap: Record<string, string> = {
      start: 'flex-start', center: 'center', end: 'flex-end',
      between: 'space-between', around: 'space-around', evenly: 'space-evenly',
    };
    const alignMap: Record<string, string> = {
      start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch',
    };
    return html`
      <div class="hstack" style="
        gap: ${gapMap[this.gap] || gapMap['md']};
        align-items: ${alignMap[this.align] || 'center'};
        justify-content: ${justifyMap[this.justify] || 'flex-start'};
        flex-wrap: ${this.wrap ? 'wrap' : 'nowrap'};
      ">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-hstack': GdsHStack; }
}