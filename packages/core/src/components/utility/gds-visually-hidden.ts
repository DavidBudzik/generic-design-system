import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-visually-hidden')
export class GdsVisuallyHidden extends GdsBaseElement {
  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
    `,
  ];

  protected render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-visually-hidden': GdsVisuallyHidden; }
}