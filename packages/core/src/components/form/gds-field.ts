import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';

@customElement('gds-field')
export class GdsField extends GdsBaseElement {
  @property({ type: String }) label = '';
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) required = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .label {
        display: flex; align-items: center; gap: var(--gds-space-1);
        font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium);
        color: var(--gds-color-text); margin-bottom: var(--gds-space-2);
      }
      .required-mark { color: var(--gds-color-danger); }
      .field-content { display: block; }
      .hint { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); margin-top: var(--gds-space-1); }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      ${this.label
        ? html`<label class="label">${this.label}${this.required ? html`<span class="required-mark">*</span>` : nothing}</label>`
        : nothing}
      <div class="field-content"><slot></slot></div>
      ${this.error
        ? html`<span class="error-msg">${this.error}</span>`
        : this.hint
          ? html`<span class="hint">${this.hint}</span>`
          : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-field': GdsField; }
}