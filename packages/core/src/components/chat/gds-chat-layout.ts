import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-chat-layout')
export class GdsChatLayout extends GdsBaseElement {
  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: flex; flex-direction: column; height: 100%; max-height: 100vh; background: var(--gds-color-bg); }
      .header { flex-shrink: 0; border-bottom: 1px solid var(--gds-color-border); padding: var(--gds-space-3) var(--gds-space-4); background: var(--gds-color-surface); }
      .messages { flex: 1; overflow-y: auto; padding: var(--gds-space-2) 0; }
      .composer-area { flex-shrink: 0; padding: var(--gds-space-3) var(--gds-space-4); border-top: 1px solid var(--gds-color-border); background: var(--gds-color-surface); }
    `,
  ];

  protected render() {
    return html`
      <div class="header"><slot name="header"></slot></div>
      <div class="messages"><slot name="messages"></slot></div>
      <div class="composer-area"><slot name="composer"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-chat-layout': GdsChatLayout; }
}