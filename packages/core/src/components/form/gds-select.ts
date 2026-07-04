import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@customElement('gds-select')
export class GdsSelect extends GdsBaseElement {
  @property({ type: String }) value = '';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) placeholder = 'Select...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) error = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: block; width: 100%; position: relative; }
      .label { display: block; font-size: var(--gds-font-size-sm); font-weight: var(--gds-font-weight-medium); margin-bottom: var(--gds-space-2); }
      .trigger {
        display: flex; align-items: center; justify-content: space-between;
        width: 100%; padding: var(--gds-space-2) var(--gds-space-3); border: 1px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-md); background: var(--gds-color-surface); color: var(--gds-color-text);
        cursor: pointer; font-size: var(--gds-font-size-sm); transition: border-color var(--gds-duration-fast) var(--gds-ease-default), box-shadow var(--gds-duration-fast) var(--gds-ease-default);
      }
      .trigger:hover { border-color: var(--gds-color-primary); }
      .trigger:focus-visible { outline: none; border-color: var(--gds-color-primary); box-shadow: 0 0 0 3px var(--gds-color-focus-ring); }
      .trigger.error { border-color: var(--gds-color-danger); }
      .trigger.disabled { opacity: 0.5; cursor: not-allowed; }
      .chevron { transition: transform var(--gds-duration-fast) var(--gds-ease-default); }
      :host([open]) .chevron { transform: rotate(180deg); }
      .menu {
        position: absolute; top: 100%; left: 0; right: 0; z-index: var(--gds-z-dropdown);
        background: var(--gds-color-surface); border: 1px solid var(--gds-color-border); border-radius: var(--gds-radius-md);
        box-shadow: var(--gds-shadow-lg); margin-top: var(--gds-space-1); max-height: 16rem; overflow-y: auto; display: none;
      }
      :host([open]) .menu { display: block; }
      .option { padding: var(--gds-space-2) var(--gds-space-3); cursor: pointer; font-size: var(--gds-font-size-sm); color: var(--gds-color-text); transition: background var(--gds-duration-fast) var(--gds-ease-default); }
      .option:hover { background: var(--gds-color-bg-muted); }
      .option.selected { background: rgba(37,99,235,0.08); color: var(--gds-color-primary); font-weight: var(--gds-font-weight-medium); }
      .option.disabled { opacity: 0.5; cursor: not-allowed; }
      .placeholder-text { color: var(--gds-color-text-subtle); }
      .backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: calc(var(--gds-z-dropdown) - 1); display: none; }
      :host([open]) .backdrop { display: block; }
      .error-msg { display: block; font-size: var(--gds-font-size-xs); color: var(--gds-color-danger); margin-top: var(--gds-space-1); }
    `,
  ];

  protected render() {
    const selected = this.options.find((o) => o.value === this.value);
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <button
        class="trigger ${this.error ? 'error' : ''} ${this.disabled ? 'disabled' : ''}"
        @click=${this._toggle}
        ?disabled=${this.disabled}
        aria-haspopup="listbox"
        ?aria-expanded=${this.open}
      >
        <span class=${selected ? '' : 'placeholder-text'}>${selected ? selected.label : this.placeholder}</span>
        <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="backdrop" @click=${this._close}></div>
      <div class="menu" role="listbox">
        ${this.options.map(
          (opt) => html`
            <div
              class="option ${opt.value === this.value ? 'selected' : ''} ${opt.disabled ? 'disabled' : ''}"
              role="option"
              aria-selected=${opt.value === this.value}
              @click=${() => this._select(opt)}
            >${opt.label}</div>
          `,
        )}
      </div>
      ${this.error ? html`<span class="error-msg">${this.error}</span>` : nothing}
    `;
  }

  private _toggle() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  private _close() {
    this.open = false;
  }

  private _select(opt: SelectOption) {
    if (opt.disabled) return;
    this.value = opt.value;
    this._close();
    dispatchEvent(this, 'change', { value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-select': GdsSelect; }
}