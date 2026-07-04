import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import type { Orientation, Alignment } from '../../utils/types.js';

@customElement('gds-button-group')
export class GdsButtonGroup extends GdsBaseElement {
  @property({ type: String }) orientation: Orientation = 'horizontal';
  @property({ type: String }) alignment: Alignment = 'start';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host {
        display: inline-flex;
        gap: var(--gds-space-2);
        align-items: center;
      }
      :host([orientation='horizontal']) { flex-direction: row; }
      :host([orientation='vertical']) { flex-direction: column; }
      :host([alignment='start']) { justify-content: flex-start; }
      :host([alignment='center']) { justify-content: center; }
      :host([alignment='end']) { justify-content: flex-end; }
      :host([alignment='stretch']) { width: 100%; justify-content: stretch; }
      ::slotted(gds-button) { flex: 0 0 auto; }
      :host([alignment='stretch']) ::slotted(gds-button) { flex: 1 1 auto; }
    `,
  ];

  protected render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gds-button-group': GdsButtonGroup;
  }
}