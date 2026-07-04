import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-number-input')
export class GdsNumberInput extends GdsBaseElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = -Infinity;
  @property({ type: Number }) max = Infinity;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) error = '';
  @property({ type: String }) label = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .label { display: block; font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium); margin-bottom: var(--gds-space-2); }
      .wrapper { display: flex; align-items: stretch; border: 1px solid var(--gds-color-border-strong); border-radius: var(--gds-radius-md); overflow: hidden; background: var(--gds-color-surface); transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default); }
      .wrapper:focus-within { border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .wrapper.error { border-color: var(--gds-color-danger); }
      .wrapper:has(button:disabled) { opacity: 0.5; }
      input { flex: 1; border: none; padding: var(--gds-space-2) var(--gds-space-3); font-size: var(--gds-font-size-sm); background: transparent; color: var(--gds-color-text); text-align: center; -moz-appearance: textfield; }
      input:focus { outline: none; }
      input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      button { border: none; background: var(--gds-color-bg-muted); color: var(--gds-color-text); padding: var(--gds-space-2) var(--gds-space-3); cursor: pointer; font-weight: var(--gds-font-weight-bold); font-size: var(--gds-font-size-md); transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      button:hover { background: var(--gds-color-surface-hover); }
      button:disabled { cursor: not-allowed; opacity: 0.5; }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <div class="wrapper ${this.error ? 'error' : ''}">
        <button @click=${() => this._decrement()} ?disabled=${this.disabled || this.value <= this.min} aria-label="Decrement">−</button>
        <input
          type="number"
          .value=${this.value}
          min=${this.min === -Infinity ? '' : this.min}
          max=${this.max === Infinity ? '' : this.max}
          step=${this.step}
          ?disabled=${this.disabled}
          aria-invalid=${!!this.error}
          @input=${this._onInput}
          @change=${this._onChange}
        />
        <button @click=${() => this._increment()} ?disabled=${this.disabled || this.value >= this.max} aria-label="Increment">+</button>
      </div>
      ${this.error ? html`<span class="error-msg">${this.error}</span>` : nothing}
    `;
  }

  private _onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = parseFloat(input.value) || 0;
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _onChange() {
    dispatchEvent(this, 'change', { value: this.value });
  }

  private _increment() {
    if (this.disabled || this.value >= this.max) return;
    this.value = Math.min(this.max, this.value + this.step);
    dispatchEvent(this, 'change', { value: this.value });
  }

  private _decrement() {
    if (this.disabled || this.value <= this.min) return;
    this.value = Math.max(this.min, this.value - this.step);
    dispatchEvent(this, 'change', { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-number-input': GdsNumberInput; }
}