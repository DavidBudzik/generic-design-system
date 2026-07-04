import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-citation')
export class GdsCitation extends GdsBaseElement {
  @property({ type: String }) href = '';
  @property({ type: String }) author = '';
  @property({ type: String }) date = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline; }
      .citation {
        display: inline; font-size: var(--gds-font-size-sm);
        color: var(--gds-color-text-muted); font-style: normal;
      }
      a { color: var(--gds-color-primary); text-decoration: underline; }
      .meta { color: var(--gds-color-text-subtle); margin-left: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      <span class="citation">
        ${this.href
          ? html`<a href=${this.href}>${this.author || this.href}</a>`
          : html`<span>${this.author}</span>`}
        ${this.date ? html`<span class="meta">(${this.date})</span>` : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-citation': GdsCitation; }
}