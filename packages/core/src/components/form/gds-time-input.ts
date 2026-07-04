import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-time-input')
export class GdsTimeInput extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) error = '';
  @property({ type: String }) label = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .label { display: block; font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium); margin-bottom: var(--gds-space-2); }
      input {
        width: 100%; padding: var(--gds-space-2) var(--gds-space-3); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface); color: var(--gds-color-text);
        font-size: var(--gds-font-size-sm); font-family: var(--gds-font-sans); box-sizing: border-box;
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
      }
      input:focus { outline: none; border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      input:disabled { opacity: 0.5; cursor: not-allowed; }
      input.error { border-color: var(--gds-color-danger); }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <input
        type="time"
        .value=${this.value}
        ?disabled=${this.disabled}
        class=${this.error ? 'error' : ''}
        aria-invalid=${!!this.error}
        @input=${this._onInput}
        @change=${this._onChange}
      />
      ${this.error ? html`<span class="error-msg">${this.error}</span>` : nothing}
    `;
  }

  private _onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _onChange() {
    dispatchEvent(this, 'change', { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-time-input': GdsTimeInput; }
}