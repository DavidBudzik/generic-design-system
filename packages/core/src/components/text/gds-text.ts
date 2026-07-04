import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-text')
export class GdsText extends GdsBaseElement {
  @property({ type: String }) size: string = 'md';
  @property({ type: String }) weight: string = 'normal';
  @property({ type: String }) color: string = '';
  @property({ type: String }) align: string = '';
  @property({ type: Boolean }) truncate = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; }
      .text { margin: 0; }
      .size-xs { font-size: var(--gds-font-size-xs); }
      .size-sm { font-size: var(--gds-font-size-sm); }
      .size-md { font-size: var(--gds-font-size-md); }
      .size-lg { font-size: var(--gds-font-size-lg); }
      .size-xl { font-size: var(--gds-font-size-xl); }
      .size-2xl { font-size: var(--gds-font-size-2xl); }
      .weight-normal { font-weight: var(--gds-font-weight-normal); }
      .weight-medium { font-weight: var(--gds-font-weight-medium); }
      .weight-semibold { font-weight: var(--gds-font-weight-semibold); }
      .weight-bold { font-weight: var(--gds-font-weight-bold); }
      .color-default { color: var(--gds-color-text); }
      .color-muted { color: var(--gds-color-text-muted); }
      .color-subtle { color: var(--gds-color-text-subtle); }
      .color-primary { color: var(--gds-color-primary); }
      .align-left { text-align: left; } .align-center { text-align: center; }
      .align-right { text-align: right; } .align-justify { text-align: justify; }
      .truncate {
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        max-width: 100%;
      }
    `,
  ];

  protected render() {
    const classes = [
      'text', `size-${this.size}`, `weight-${this.weight}`,
      this.color ? `color-${this.color}` : 'color-default',
      this.align ? `align-${this.align}` : '',
      this.truncate ? 'truncate' : '',
    ].filter(Boolean).join(' ');
    return html`<p class=${classes}><slot></slot></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-text': GdsText; }
}