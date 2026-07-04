import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-checkbox')
export class GdsCheckbox extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; cursor: pointer; gap: var(--gds-space-2); }
      :host([disabled]) { cursor: not-allowed; opacity: 0.5; }
      .box {
        width: 1.25rem; height: 1.25rem; border: 2px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-sm); display: inline-flex; align-items: center; justify-content: center;
        background: var(--gds-color-surface); transition: all var(--gds-duration-fast) var(--gds-ease-default);
        flex-shrink: 0;
      }
      :host([checked]) .box { background: var(--gds-color-primary); border-color: var(--gds-color-primary); }
      :host([checked]) .box svg { display: block; }
      .box svg { display: none; color: var(--gds-color-on-primary); }
      :host([indeterminate]) .box { background: var(--gds-color-primary); border-color: var(--gds-color-primary); }
      :host([indeterminate]) .box .indeterminate { display: block; }
      .indeterminate { display: none; width: 0.6rem; height: 2px; background: var(--gds-color-on-primary); border-radius: 1px; }
      .label { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); user-select: none; }
      input { position: absolute; opacity: 0; width: 0; height: 0; }
    `,
  ];

  protected render() {
    return html`
      <input type="checkbox" .checked=${this.checked} .indeterminate=${this.indeterminate} ?disabled=${this.disabled} @change=${this._toggle} aria-label=${this.label || 'checkbox'} />
      <span class="box" @click=${this._toggle}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        <span class="indeterminate"></span>
      </span>
      ${this.label ? html`<span class="label">${this.label}</span>` : html`<slot></slot>`}
    `;
  }

  private _toggle() {
    if (this.disabled) return;
    this.indeterminate = false;
    this.checked = !this.checked;
    dispatchEvent(this, 'change', { checked: this.checked, value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-checkbox': GdsCheckbox; }
}