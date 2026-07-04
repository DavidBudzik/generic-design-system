import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Alignment, Orientation } from '../../utils/types.js';

@customElement('gds-toolbar')
export class GdsToolbar extends GdsBaseElement {
  @property({ type: String }) orientation: Orientation = 'horizontal';
  @property({ type: String }) alignment: Alignment = 'start';
  @property({ type: String }) gap: string = 'sm';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: flex; }
      :host([orientation='horizontal']) { flex-direction: row; }
      :host([orientation='vertical']) { flex-direction: column; }
      :host([alignment='start']) { justify-content: flex-start; }
      :host([alignment='center']) { justify-content: center; }
      :host([alignment='end']) { justify-content: flex-end; }
      :host([alignment='stretch']) { justify-content: stretch; }
      .toolbar { display: flex; align-items: center; gap: var(--gds-space-2); width: 100%; }
      :host([orientation='vertical']) .toolbar { flex-direction: column; align-items: stretch; }
    `,
  ];

  protected render() {
    const gapMap: Record<string, string> = {
      '0': 'var(--gds-space-0)',
      'sm': 'var(--gds-space-2)',
      'md': 'var(--gds-space-4)',
      'lg': 'var(--gds-space-6)',
      'xl': 'var(--gds-space-8)',
    };
    return html`
      <div class="toolbar" style="gap: ${gapMap[this.gap] || gapMap['sm']}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-toolbar': GdsToolbar;
  }
}