import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Size } from '../../utils/types.js';

@customElement('gds-text-input')
export class GdsTextInput extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) type: string = 'text';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) error = '';
  @property({ type: String }) size: Size = 'md';
  @property({ type: String }) icon = '';
  @property({ type: String }) label = '';
  @property({ type: String }) supportingText = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .label { display: block; font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium); color: var(--gds-color-text); margin-bottom: var(--gds-space-2); }
      .input-wrapper { position: relative; display: flex; align-items: center; }
      .input-icon { position: absolute; left: var(--gds-space-3); display: inline-flex; color: var(--gds-color-text-muted); pointer-events: none; }
      input {
        width: 100%; border: 1px solid var(--gds-color-border-strong); border-radius: var(--gds-radius-md);
        background: var(--gds-color-surface); color: var(--gds-color-text);
        font-family: var(--gds-font-sans); transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
        box-sizing: border-box;
      }
      input:focus { outline: none; border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      input:disabled { opacity: 0.5; cursor: not-allowed; }
      input:read-only { background: var(--gds-color-bg-muted); }
      input.size-sm { padding: var(--gds-space-1) var(--gds-space-3); font-size: var(--gds-font-size-xs); }
      input.size-md { padding: var(--gds-space-2) var(--gds-space-3); font-size: var(--gds-font-size-sm); }
      input.size-lg { padding: var(--gds-space-3) var(--gds-space-4); font-size: var(--gds-font-size-md); }
      input.size-xl { padding: var(--gds-space-4) var(--gds-space-5); font-size: var(--gds-font-size-lg); }
      input.has-icon { padding-left: 2.5rem; }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
      input.error { border-color: var(--gds-color-danger); }
      input.error:focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.3); }
      .supporting-text { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-text-muted); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <div class="input-wrapper">
        ${this.icon ? html`<span class="input-icon" .innerHTML=${this.icon}></span>` : nothing}
        <input
          type=${this.type}
          class="size-${this.size} ${this.error ? 'error' : ''} ${this.icon ? 'has-icon' : ''}"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          aria-invalid=${!!this.error}
          aria-describedby=${this.error ? 'error-msg' : (this.supportingText ? 'support-text' : '')}
          @input=${this._onInput}
          @change=${this._onChange}
        />
      </div>
      ${this.supportingText && !this.error ? html`<span class="supporting-text" id="support-text">${this.supportingText}</span>` : nothing}
      ${this.error ? html`<span class="error-msg" id="error-msg">${this.error}</span>` : nothing}
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
  interface HTMLElementTagNameMap { 'gds-text-input': GdsTextInput; }
}