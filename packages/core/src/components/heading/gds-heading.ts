import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-heading')
export class GdsHeading extends GdsBaseElement {
  @property({ type: Number }) level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  @property({ type: String }) size: string = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      h1 { font-size: var(--gds-font-size-2xl); font-weight: var(--gds-font-weight-bold); line-height: var(--gds-line-height-tight); }
      h2 { font-size: var(--gds-font-size-xl); font-weight: var(--gds-font-weight-semibold); line-height: var(--gds-line-height-tight); }
      h3 { font-size: var(--gds-font-size-lg); font-weight: var(--gds-font-weight-semibold); line-height: var(--gds-line-height-tight); }
      h4 { font-size: var(--gds-font-size-md); font-weight: var(--gds-font-weight-semibold); line-height: var(--gds-line-height-normal); }
      h5 { font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-semibold); line-height: var(--gds-line-height-normal); }
      h6 { font-size: var(--gds-font-size-xs); font-weight: var(--gds-font-weight-semibold); line-height: var(--gds-line-height-normal); text-transform: uppercase; letter-spacing: 0.05em; }
      .size-xs { font-size: var(--gds-font-size-xs) !important; }
      .size-sm { font-size: var(--gds-font-size-sm) !important; }
      .size-md { font-size: var(--gds-font-size-md) !important; }
      .size-lg { font-size: var(--gds-font-size-lg) !important; }
      .size-xl { font-size: var(--gds-font-size-xl) !important; }
      .size-2xl { font-size: var(--gds-font-size-2xl) !important; }
    `,
  ];

  protected render() {
    const tag = `h${this.level}` as keyof HTMLElementTagNameMap;
    const classes = this.size ? `size-${this.size}` : '';
    return html`<${tag} class=${classes}><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-heading': GdsHeading; }
}