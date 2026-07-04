import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-text-area')
export class GdsTextArea extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Number }) rows = 4;
  @property({ type: String }) resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) error = '';
  @property({ type: String }) label = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; }
      .label { display: block; font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium); margin-bottom: var(--gds-space-2); }
      textarea {
        width: 100%; border: 1px solid var(--gds-color-border-strong); border-radius: var(--gds-radius-md);
        background: var(--gds-color-surface); color: var(--gds-color-text);
        font-family: var(--gds-font-sans); font-size: var(--gds-font-size-sm);
        padding: var(--gds-space-3); box-sizing: border-box;
        transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
      }
      textarea:focus { outline: none; border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      textarea:disabled { opacity: 0.5; cursor: not-allowed; }
      textarea:read-only { background: var(--gds-color-bg-muted); }
      textarea.error { border-color: var(--gds-color-danger); }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <textarea
        rows=${this.rows}
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        class=${this.error ? 'error' : ''}
        style="resize: ${this.resize};"
        aria-invalid=${!!this.error}
        @input=${this._onInput}
        @change=${this._onChange}
      ></textarea>
      ${this.error ? html`<span class="error-msg">${this.error}</span>` : nothing}
    `;
  }

  private _onInput(e: Event) {
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    dispatchEvent(this, 'input', { value: this.value });
  }

  private _onChange() {
    dispatchEvent(this, 'change', { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-text-area': GdsTextArea; }
}