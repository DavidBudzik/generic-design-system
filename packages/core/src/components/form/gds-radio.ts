import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';

@customElement('gds-radio')
export class GdsRadio extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) name = '';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; cursor: pointer; gap: var(--gds-space-2); }
      :host([disabled]) { cursor: not-allowed; opacity: 0.5; }
      .box {
        width: 1.25rem; height: 1.25rem; border: 2px solid var(--gds-color-border-strong);
        border-radius: var(--gds-radius-full); display: inline-flex; align-items: center; justify-content: center;
        background: var(--gds-color-surface); transition: all var(--gds-duration-fast) var(--gds-ease-default); flex-shrink: 0;
      }
      :host([checked]) .box { border-color: var(--gds-color-primary); }
      .dot { width: 0.625rem; height: 0.625rem; border-radius: var(--gds-radius-full); background: var(--gds-color-primary); transform: scale(0); transition: transform var(--gds-duration-fast) var(--gds-ease-default); }
      :host([checked]) .dot { transform: scale(1); }
      .label { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); user-select: none; }
      input { position: absolute; opacity: 0; width: 0; height: 0; }
    `,
  ];

  protected render() {
    return html`
      <input type="radio" .checked=${this.checked} ?disabled=${this.disabled} name=${this.name} @change=${this._select} aria-label=${this.label || 'radio'} />
      <span class="box" @click=${this._select}>
        <span class="dot"></span>
      </span>
      ${this.label ? html`<span class="label">${this.label}</span>` : html`<slot></slot>`}
    `;
  }

  private _select() {
    if (this.disabled) return;
    // deselect siblings with same name
    if (this.name) {
      const root = this.getRootNode() as HTMLElement | ShadowRoot;
      root.querySelectorAll(`gds-radio[name="${this.name}"]`).forEach((r: Element) => {
        if (r !== this) (r as unknown as GdsRadio).checked = false;
      });
    }
    this.checked = true;
    dispatchEvent(this, 'change', { checked: this.checked, value: this.value });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-radio': GdsRadio; }
}