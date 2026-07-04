import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GdsBaseElement } from '../../utils/base-element.js';
import { dispatchEvent } from '../../utils/event.js';
import type { Size } from '../../utils/types.js';

@customElement('gds-switch')
export class GdsSwitch extends GdsBaseElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: String }) size: Size = 'md';

  static styles = [
    ...GdsBaseElement.styles,
    css`
      :host { display: inline-flex; align-items: center; cursor: pointer; gap: var(--gds-space-3); }
      :host([disabled]) { cursor: not-allowed; opacity: 0.5; }
      .track {
        background: var(--gds-color-border-strong); border-radius: var(--gds-radius-full);
        position: relative; transition: background var(--gds-duration-normal) var(--gds-ease-default);
        flex-shrink: 0;
      }
      .track.size-sm { width: 2rem; height: 1.125rem; }
      .track.size-md { width: 2.5rem; height: 1.375rem; }
      .track.size-lg { width: 3rem; height: 1.625rem; }
      .track.size-xl { width: 3.5rem; height: 1.875rem; }
      :host([checked]) .track { background: var(--gds-color-primary); }
      .thumb {
        position: absolute; top: 2px; left: 2px; background: #fff; border-radius: var(--gds-radius-full);
        transition: transform var(--gds-duration-normal) var(--gds-ease-default);
        box-shadow: var(--gds-shadow-sm);
      }
      .thumb.size-sm { width: calc(1.125rem - 4px); height: calc(1.125rem - 4px); }
      .thumb.size-md { width: calc(1.375rem - 4px); height: calc(1.375rem - 4px); }
      .thumb.size-lg { width: calc(1.625rem - 4px); height: calc(1.625rem - 4px); }
      .thumb.size-xl { width: calc(1.875rem - 4px); height: calc(1.875rem - 4px); }
      :host([checked]) .thumb { transform: translateX(calc(100% + 2px)); }
      .label { font-size: var(--gds-font-size-sm); color: var(--gds-color-text); user-select: none; }
      input { position: absolute; opacity: 0; width: 0; height: 0; }
    `,
  ];

  protected render() {
    return html`
      <input type="checkbox" .checked=${this.checked} ?disabled=${this.disabled} @change=${this._toggle} role="switch" aria-checked=${this.checked} aria-label=${this.label || 'switch'} />
      <span class="track size-${this.size}" @click=${this._toggle}>
        <span class="thumb size-${this.size}"></span>
      </span>
      ${this.label ? html`<span class="label">${this.label}</span>` : html`<slot></slot>`}
    `;
  }

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    dispatchEvent(this, 'change', { checked: this.checked });
  }
}

declare global {
  interface HTMLElementTagNameMap { 'gds-switch': GdsSwitch; }
}