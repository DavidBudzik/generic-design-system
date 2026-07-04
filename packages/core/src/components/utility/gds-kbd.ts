import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-kbd')
export class GdsKbd extends GdsBaseElement {
  @property({ type: Array }) keys: string[] = [];

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; gap: var(--gds-space-1); }
      kbd {
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 1.5rem; height: 1.5rem; padding: 0 var(--gds-space-1);
        font-family: var(--gds-font-mono); font-size: var(--gds-font-size-xs);
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border-strong);
        border-bottom-width: 2px; border-radius: var(--gds-radius-sm);
        color: var(--gds-color-text); line-height: 1;
      }
      .sep { color: var(--gds-color-text-subtle); font-size: var(--gds-font-size-xs); user-select: none; }
    `,
  ];

  protected render() {
    return html`
      ${this.keys.map((key, i) => html`
        ${i > 0 ? html`<span class="sep">+</span>` : ''}
        <kbd>${key}</kbd>
      `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-kbd': GdsKbd; }
}