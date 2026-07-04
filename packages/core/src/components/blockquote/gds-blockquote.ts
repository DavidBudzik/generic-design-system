import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-blockquote')
export class GdsBlockquote extends GdsBaseElement {
  @property({ type: String }) cite = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      blockquote {
        border-left: 4px solid var(--gds-color-primary);
        padding: var(--gds-space-4) var(--gds-space-6);
        margin: 0; color: var(--gds-color-text-muted);
        font-style: italic; font-size: var(--gds-font-size-md);
        line-height: var(--gds-line-height-relaxed);
      }
      cite { display: block; margin-top: var(--gds-space-3); font-size: var(--gds-font-size-sm); font-style: normal; color: var(--gds-color-text-subtle); }
    `,
  ];

  protected render() {
    return html`
      <blockquote>
        <slot></slot>
        ${this.cite ? html`<cite>— ${this.cite}</cite>` : nothing}
      </blockquote>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-blockquote': GdsBlockquote; }
}