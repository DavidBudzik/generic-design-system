import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-code')
export class GdsCode extends GdsBaseElement {
  @property({ type: String }) language = '';
  @property({ type: Boolean }) inline = true;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline; }
      :host(:not([inline])) { display: block; }
      code {
        font-family: var(--gds-font-mono);
        font-size: 0.875em;
        background: var(--gds-color-bg-muted);
        color: var(--gds-color-text);
        padding: 0.125em 0.375em;
        border-radius: var(--gds-radius-sm);
      }
      pre {
        margin: 0; padding: var(--gds-space-4);
        background: var(--gds-color-bg-muted); border-radius: var(--gds-radius-md);
        overflow-x: auto;
      }
      pre code { background: none; padding: 0; font-size: var(--gds-font-size-sm); }
    `,
  ];

  protected render() {
    return this.inline
      ? html`<code><slot></slot></code>`
      : html`<pre><code class="language-${this.language || 'plaintext'}"><slot></slot></code></pre>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-code': GdsCode; }
}