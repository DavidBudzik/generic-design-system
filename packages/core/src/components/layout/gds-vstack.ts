import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Alignment, JustifyContent } from '../../utils/types.js';

@customElement('gds-vstack')
export class GdsVStack extends GdsBaseElement {
  @property({ type: String }) gap: string = 'md';
  @property({ type: String }) align: Alignment = 'stretch';
  @property({ type: String }) justify: JustifyContent = 'start';
  @property({ type: Boolean }) wrap = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: flex; flex-direction: column; }
      .vstack { display: flex; flex-direction: column; width: 100%; }
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
      <div class="vstack" style="
        gap: ${gapMap[this.gap] || gapMap['md']};
        align-items: ${alignMap[this.align] || 'stretch'};
        justify-content: ${justifyMap[this.justify] || 'flex-start'};
        flex-wrap: ${this.wrap ? 'wrap' : 'nowrap'};
      ">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-vstack': GdsVStack; }
}